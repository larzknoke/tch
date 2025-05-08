// import { sendEmail } from "@/lib/email";
// import { render } from "@react-email/render";
// import ConfirmEmail from "@/email/ConfirmEmail";
// import ConfirmStiftungEmail from "@/email/ConfirmStiftungEmail";
// import { LetterPDF } from "@/email/pdf";
// import { renderToBuffer } from "@react-pdf/renderer";
import { sendEmail } from "@/lib/email";

export default async function handle(req, res) {
  console.log("email api call");

  try {
    console.log("req.body", req.body);
    const worker = req.body;
    if (worker) {
      await sendEmail({
        to:
          process.env.NODE_ENV === "development"
            ? "info@larsknoke.com"
            : "info@larsknoke.com",
        subject: "Arbeitseinsatz bestätigen - TC Holzminden von 1928 e.V.",
        // html: render(<ConfirmEmail letter={letter} />),
        html: `<b>Hello world?</b><pre>${JSON.stringify(worker)}</pre>`, // HTML body
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
