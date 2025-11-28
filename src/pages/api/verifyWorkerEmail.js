import { sendEmail } from "@/lib/email";
import { render } from "@react-email/render";
import VerifyEmail from "@/email/verifyEmail";
import prisma from "@/lib/prisma";

export default async function handle(req, res) {
  console.log("email api call");

  try {
    console.log("req.body", req.body);
    const worker = req.body;
    const effort = await prisma.effort.findUnique({
      where: {
        id: parseInt(worker.effortId),
      },
    });
    if (worker) {
      await sendEmail({
        to:
          process.env.NODE_ENV === "development"
            ? "info@larsknoke.com"
            : worker.email,
        bcc: process.env.NODE_ENV === "development" ? [] : "info@larsknoke.com",
        subject: "Arbeitseinsatz bestätigen - TC Holzminden von 1928 e.V.",
        html: await render(<VerifyEmail worker={worker} effort={effort} />),
      });
    } else {
      throw new Error("No Worker found");
    }

    return res.status(200).json({ success: true, worker });
  } catch (error) {
    console.log("api error: ", error);
    return res.status(500).json(error);
  }
}
