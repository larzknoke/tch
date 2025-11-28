import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { render } from "@react-email/render";
import AdminConfirmWorkerEmail from "@/email/adminConfirmWorkerEmail";

export default async function handle(req, res) {
  console.log("api call");
  if (req.method == "GET") {
    try {
      console.log("req.query", req.query);
      const { verifyId } = req.query;
      const result = await prisma.worker.update({
        where: {
          verifyId: verifyId,
        },
        data: {
          verified: true,
          verifyId: null,
        },
        include: {
          effort: true,
        },
      });

      // Send admin confirmation email
      try {
        await sendEmail({
          to:
            process.env.NODE_ENV === "development"
              ? "info@larsknoke.com"
              : ["kilic@kilic-gmbh.de", "info@larsknoke.com"],
          subject:
            "Neuer Teilnehmer für Arbeitseinsatz bestätigt - TC Holzminden von 1928 e.V.",
          html: await render(
            <AdminConfirmWorkerEmail worker={result} effort={result.effort} />
          ),
        });
      } catch (emailError) {
        console.log("Failed to send admin notification email:", emailError);
        // Don't fail the request if email fails
      }

      return res.status(200).json(result);
    } catch (error) {
      console.log("api error: ", error);
      return res.status(404).json(error);
    }
  }
}
