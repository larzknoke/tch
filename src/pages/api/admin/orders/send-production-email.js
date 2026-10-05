import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { render } from "@react-email/render";
import OrderInProductionEmail from "@/email/orderInProductionEmail";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "Order ID is required" });
    }

    const order = await prisma.order.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
        user: true,
      },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    await sendEmail({
      to: order.email,
      subject: `Ihre Bestellung #${order.id} befindet sich in Produktion - TC Holzminden`,
      html: await render(<OrderInProductionEmail order={order} />),
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error sending production email:", error);
    return res.status(500).json({ error: "Fehler beim Versenden der Produktions-E-Mail" });
  }
}
