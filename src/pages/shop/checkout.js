import { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "@/components/ui/layouts/layout";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Checkout() {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    shippingAddress: "",
    billingAddress: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    } else {
      router.push("/shop");
    }
  }, [router]);

  const total = cart.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0,
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein";
    }
    if (!formData.shippingAddress.trim()) {
      newErrors.shippingAddress = "Bitte geben Sie eine Lieferadresse ein";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          shippingAddress: formData.shippingAddress,
          billingAddress: formData.billingAddress || formData.shippingAddress,
          items: cart.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Order creation failed");
      }

      const order = await response.json();

      // Clear cart
      localStorage.removeItem("cart");

      // Redirect to success page
      router.push(`/shop/success?orderId=${order.id}`);
    } catch (error) {
      console.error("Order error:", error);
      alert("Bestellung fehlgeschlagen. Bitte versuchen Sie es erneut.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Kasse | Tennis Club Holzminden von 1928 e.V</title>
        <meta name="description" content="Checkout" />
      </Head>

      <Layout>
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <h1 className="text-4xl font-bold text-tch-blue mb-8">Kasse</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Bestellübersicht</h2>
              <div className="border rounded-lg p-4 space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 pb-4 border-b last:border-b-0"
                  >
                    {item.image && (
                      <div className="relative h-20 w-20 flex-shrink-0 bg-gray-100 rounded">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        Menge: {item.quantity}
                      </p>
                      <p className="text-sm font-semibold mt-1">
                        {(parseFloat(item.price) * item.quantity).toFixed(2)} €
                      </p>
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Gesamtsumme:</span>
                    <span className="text-tch-blue">{total.toFixed(2)} €</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkout Form */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Lieferinformationen
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1"
                  >
                    E-Mail-Adresse *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-tch-blue ${
                      errors.email ? "border-red-500" : ""
                    }`}
                    required
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="shippingAddress"
                    className="block text-sm font-medium mb-1"
                  >
                    Lieferadresse *
                  </label>
                  <textarea
                    id="shippingAddress"
                    name="shippingAddress"
                    value={formData.shippingAddress}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-tch-blue ${
                      errors.shippingAddress ? "border-red-500" : ""
                    }`}
                    placeholder="Name&#10;Straße, Hausnummer&#10;PLZ Stadt&#10;Land"
                    required
                  />
                  {errors.shippingAddress && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.shippingAddress}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="billingAddress"
                    className="block text-sm font-medium mb-1"
                  >
                    Rechnungsadresse (optional)
                  </label>
                  <textarea
                    id="billingAddress"
                    name="billingAddress"
                    value={formData.billingAddress}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-tch-blue"
                    placeholder="Leer lassen, wenn identisch mit Lieferadresse"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Falls leer, wird die Lieferadresse verwendet
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-tch-blue text-white py-3 rounded-lg hover:bg-tch-blue/90 font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading
                    ? "Bestellung wird erstellt..."
                    : "Kostenpflichtig bestellen"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
