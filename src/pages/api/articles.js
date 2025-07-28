import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method == "GET") {
    if (req.query.id) {
      try {
        const result = await prisma.article.findUnique({
          where: { id: parseInt(req.query.id) },
        });
        console.log("result: ", result);
        return res.status(200).json(result);
      } catch (error) {
        console.log("api error: ", error);
        return res.status(500).json(error);
      }
    }
    try {
      const result = await prisma.article.findMany({
        orderBy: [
          {
            date: "asc",
          },
        ],
      });
      console.log("result: ", result);
      return res.status(200).json(result);
    } catch (error) {
      console.log("api error: ", error);
      return res.status(500).json(error);
    }
  }

  if (req.method == "POST") {
    try {
      const data = req.body;
      console.log("data: ", data);
      const result = await prisma.article.create({ data: data });
      console.log("result: ", result);
      return res.status(200).json(result);
    } catch (error) {
      console.log("api error: ", error);
      return res.status(500).json(error);
    }
  }

  if (req.method == "DELETE") {
    try {
      const id = req.query.id;
      console.log("id: ", id);
      const result = await prisma.article.delete({
        where: { id: parseInt(id) },
      });
      console.log("result: ", result);
      return res.status(200).json(result);
    } catch (error) {
      console.log("api error: ", error);
      return res.status(500).json(error);
    }
  }
  if (req.method == "PUT") {
    try {
      const data = req.body;
      console.log("data: ", data);
      const result = await prisma.article.update({
        where: { id: parseInt(data.id) },
        data: data,
      });
      console.log("result: ", result);
      return res.status(200).json(result);
    } catch (error) {
      console.log("api error: ", error);
      return res.status(500).json(error);
    }
  }
  return res.status(405).json({ message: "Method not allowed" });
}
