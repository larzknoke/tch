import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method == "GET") {
    try {
      const result = await prisma.worker.findMany({
        include: {
          effort: true,
        },
        orderBy: [
          {
            name: "asc",
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
      const result = await prisma.worker.create({ data: data });
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
      const result = await prisma.worker.delete({
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
      const result = await prisma.worker.update({
        where: { id: parseInt(data.id) },
        data: { ...data, effortId: parseInt(data.effortId) },
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
