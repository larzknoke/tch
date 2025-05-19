import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      const data = req.body;
      console.log("data: ", data);
      const result = await prisma.newsletter.create({ data: data });
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
      const result = await prisma.newsletter.delete({
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
      const result = await prisma.newsletter.update({
        where: { id: parseInt(data.id) },
        data: { ...data },
      });
      console.log("result: ", result);
      return res.status(200).json(result);
    } catch (error) {
      console.log("api error: ", error);
      return res.status(500).json(error);
    }
  }
  if (req.method == "GET") {
    try {
      const result = await prisma.newsletter.findMany({
        orderBy: [
          {
            createdAt: "desc",
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
  return res.status(405).json({ message: "Method not allowed" });
}
