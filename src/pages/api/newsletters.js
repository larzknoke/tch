import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method == "GET") {
    try {
      const result = await prisma.newsletter.findMany({
        orderBy: [
          {
            email: "asc",
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
      const verified = req.query.verified;
      let result;

      if (typeof id !== "undefined") {
        console.log("id: ", id);
        result = await prisma.newsletter.delete({
          where: { id: parseInt(id) },
        });
      } else if (typeof verified !== "undefined") {
        console.log("verified: ", verified);
        result = await prisma.newsletter.deleteMany({
          where: { verified: verified === "true" },
        });
      } else {
        return res.status(400).json({ message: "Missing delete filter" });
      }

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
