import prisma from "@/lib/prisma";

export default async function handle(req, res) {
  if (req.method === "GET") {
    try {
      const registrations = await prisma.memberRegistration.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
      return res.status(200).json(registrations);
    } catch (error) {
      console.log("api error:", error);
      return res.status(500).json({ error: error.message });
    }
  } else if (req.method === "PUT") {
    try {
      const { id } = req.query;
      const { processed, notes } = req.body;

      const registration = await prisma.memberRegistration.update({
        where: { id: parseInt(id) },
        data: {
          processed,
          notes,
        },
      });

      return res.status(200).json(registration);
    } catch (error) {
      console.log("api error:", error);
      return res.status(500).json({ error: error.message });
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.query;

      await prisma.memberRegistration.delete({
        where: { id: parseInt(id) },
      });

      return res.status(200).json({ success: true });
    } catch (error) {
      console.log("api error:", error);
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
