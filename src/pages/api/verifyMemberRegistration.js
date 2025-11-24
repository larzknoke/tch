import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { render } from "@react-email/render";
import AdminNotifyMemberRegistrationEmail from "@/email/adminNotifyMemberRegistrationEmail";
import ConfirmMemberRegistrationEmail from "@/email/confirmMemberRegistrationEmail";

export default async function handle(req, res) {
  console.log("verifyMemberRegistration api call");

  if (req.method === "GET") {
    try {
      const { verifyId } = req.query;

      if (!verifyId) {
        return res.status(400).json({ error: "Verification ID is required" });
      }

      // Update member registration to verified
      const registration = await prisma.memberRegistration.update({
        where: {
          verifyId: verifyId,
        },
        data: {
          verified: true,
          verifyId: null,
        },
      });

      // Send confirmation email to member
      try {
        await sendEmail({
          to:
            process.env.NODE_ENV === "development"
              ? "info@larsknoke.com"
              : registration.email,
          subject:
            "Bestätigung Ihres Mitgliedsantrags - TC Holzminden von 1928 e.V.",
          html: await render(
            <ConfirmMemberRegistrationEmail registration={registration} />
          ),
        });
      } catch (emailError) {
        console.log("Failed to send member confirmation email:", emailError);
        // Don't fail the request if member email fails
      }

      // Send admin notification email
      try {
        await sendEmail({
          to:
            process.env.NODE_ENV === "development"
              ? "info@larsknoke.com"
              : "info@larsknoke.com",
          subject:
            "Neuer Mitgliedsantrag bestätigt - TC Holzminden von 1928 e.V.",
          html: await render(
            <AdminNotifyMemberRegistrationEmail registration={registration} />
          ),
        });
      } catch (emailError) {
        console.log("Failed to send admin notification email:", emailError);
        // Don't fail the request if admin email fails
      }

      return res.status(200).json({ success: true, registration });
    } catch (error) {
      console.log("verifyMemberRegistration api error:", error);
      return res.status(404).json({ error: "Verification failed" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
