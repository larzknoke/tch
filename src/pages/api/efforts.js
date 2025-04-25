import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method == "GET") {
    try {
      const result = await prisma.effort.findMany();
      console.log("result: ", result);
      return res.status(200).json(result);
    } catch (error) {
      console.log("api error: ", error);
      return res.status(500).json(error);
    }
  }
}
