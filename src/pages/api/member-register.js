import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { render } from "@react-email/render";
import VerifyMemberRegistrationEmail from "@/email/verifyMemberRegistrationEmail";

export default async function handle(req, res) {
  console.log("member-register api call");

  if (req.method === "POST") {
    try {
      const {
        vorname,
        name,
        strasse,
        plz,
        ort,
        email,
        telefon,
        geburtsdatum,
        mitgliedsart,
        status,
        sepa_vorname,
        sepa_name,
        sepa_strasse,
        sepa_plz,
        sepa_ort,
        sepa_kreditinstitut,
        sepa_iban,
        sepa_einzug,
        sepa_lastschriftmandat,
        datenschutz,
      } = req.body;

      // Create member registration with verified = false
      const memberRegistration = await prisma.memberRegistration.create({
        data: {
          vorname,
          name,
          strasse,
          plz,
          ort,
          email,
          telefon,
          geburtsdatum,
          mitgliedsart,
          status,
          sepaVorname: sepa_vorname,
          sepaName: sepa_name,
          sepaStrasse: sepa_strasse,
          sepaPlz: sepa_plz,
          sepaOrt: sepa_ort,
          sepaKreditinstitut: sepa_kreditinstitut,
          sepaIban: sepa_iban,
          sepaEinzug: sepa_einzug,
          sepaLastschriftmandat: sepa_lastschriftmandat,
          datenschutz,
          verified: false,
        },
      });

      // Send verification email
      try {
        await sendEmail({
          to:
            process.env.NODE_ENV === "development"
              ? "info@larsknoke.com"
              : email,
          subject: "Mitgliedsantrag bestätigen - TC Holzminden von 1928 e.V.",
          html: await render(
            <VerifyMemberRegistrationEmail registration={memberRegistration} />
          ),
        });
      } catch (emailError) {
        console.log("Failed to send verification email:", emailError);
        // Rollback the registration if email fails
        await prisma.memberRegistration.delete({
          where: { id: memberRegistration.id },
        });
        return res.status(500).json({
          error: "Failed to send verification email. Please try again.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Bitte überprüfen Sie Ihre E-Mails zur Bestätigung.",
      });
    } catch (error) {
      console.log("member-register api error:", error);
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
