import { sendEmail } from "@/lib/email";
import { render } from "@react-email/render";
import VerifyEmail from "@/email/verifyEmail";

export default async function handle(req, res) {
  console.log("email api call");

  try {
    console.log("req.body", req.body);
    const memberDetails = req.body;
    console.log("memberDetails", memberDetails);
    await sendEmail({
      to:
        process.env.NODE_ENV === "development"
          ? "info@larsknoke.com"
          : "info@larsknoke.com",
      subject: "Mitgliedsantrag - TC Holzminden von 1928 e.V.",
      text: `Mitgliedsantrag - TC Holzminden von 1928 e.V. ${JSON.stringify(
        memberDetails,
        null,
        2
      )}`,
    });

    return res.status(200).json({ success: true, memberDetails });
  } catch (error) {
    console.log("api error: ", error);
    return res.status(500).json(error);
  }
}
