import prisma from "@/lib/prisma";
import { act } from "react";

export default async function handler(req, res) {
  if (req.method == "GET") {
    try {
      const result = await prisma.effort.findMany({
        where: {
          active: true,
        },
        include: {
          workers: true,
        },
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

  return res.status(405).json({ message: "Method not allowed" });
}
