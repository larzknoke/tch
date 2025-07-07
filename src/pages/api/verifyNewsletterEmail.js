import { sendEmail } from "@/lib/email";
import { render } from "@react-email/render";
import prisma from "@/lib/prisma";
import VerifyNewsletterEmail from "@/email/verifyNewsletterEmail";

export default async function handle(req, res) {
  console.log("email api call");

  try {
    console.log("req.body", req.body);
    const newsletter = req.body;
    if (newsletter) {
      await sendEmail({
        to:
          process.env.NODE_ENV === "development"
            ? "info@larsknoke.com"
            : req.body.email,
        subject: "Newsletter bestätigen - TC Holzminden von 1928 e.V.",
        html: await render(<VerifyNewsletterEmail newsletter={newsletter} />),
        // text: "Hier ist der Link zur Bestätigung deines Newsletters",
      });
    } else {
      throw new Error("No Worker found");
    }

    return res.status(200).json({ success: true, newsletter });
  } catch (error) {
    console.log("api error: ", error);
    return res.status(500).json(error);
  }
}
