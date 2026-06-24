import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "@/components/ui/layouts/layout";
import Link from "next/link";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function Success() {
  const router = useRouter();
  const { orderId } = router.query;

  return (
    <>
      <Head>
        <title>Anfrage erfolgreich | Tennis Club Holzminden von 1928 e.V</title>
        <meta name="description" content="Anfrage erfolgreich" />
      </Head>

      <Layout>
        <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
          <CheckCircleIcon className="h-20 w-20 text-tch-blue mx-auto mb-6" />

          <h1 className="text-4xl font-bold text-tch-blue mb-4">
            Vielen Dank fuer Ihre Anfrage!
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            Ihre Anfrage wurde erfolgreich aufgenommen.
          </p>

          {orderId && (
            <div className="bg-gray-100 rounded-lg p-6 mb-8">
              <p className="text-sm text-gray-600 mb-2">Anfrage-Nr.:</p>
              <p className="text-2xl font-bold text-tch-blue">#{orderId}</p>
            </div>
          )}

          <div className="space-y-4 text-gray-600 mb-8">
            <p>
              Sie erhalten in Kürze eine Bestätigungs-E-Mail mit allen Details
              zu Ihrer Anfrage.
            </p>
            <p>Bei Fragen können Sie sich gerne an uns wenden.</p>
          </div>

          <div className="flex gap-4 justify-center">
            <Link
              href="/vereinsausstattung"
              className="px-6 py-3 bg-tch-blue text-white rounded-lg hover:bg-tch-blue/90 font-semibold"
            >
              Weitere Artikel auswaehlen
            </Link>
            <Link
              href="/"
              className="px-6 py-3 border border-tch-blue text-tch-blue rounded-lg hover:bg-gray-50 font-semibold"
            >
              Zur Startseite
            </Link>
          </div>
        </div>
      </Layout>
    </>
  );
}
