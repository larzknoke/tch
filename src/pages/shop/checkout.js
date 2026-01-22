import { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "@/components/ui/layouts/layout";
import { useRouter } from "next/router";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { HStack, RadioCard, Checkbox } from "@chakra-ui/react";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Bitte geben Sie eine gültige E-Mail-Adresse ein")
      .required("E-Mail ist erforderlich"),
    payment: yup
      .string()
      .oneOf(
        ["Barzahlung", "Überweisung", "PayPal"],
        "Bitte wählen Sie eine Zahlungsmethode",
      )
      .required("Zahlungsmethode ist erforderlich"),
    shippingName: yup.string().required("Name ist erforderlich"),
    shippingStreet: yup.string().required("Straße ist erforderlich"),
    shippingPlz: yup.string().required("PLZ ist erforderlich"),
    shippingCity: yup.string().required("Stadt ist erforderlich"),
    useSameAddress: yup.boolean().default(true),
    billingName: yup.string().when("useSameAddress", {
      is: false,
      then: (schema) => schema.required("Name ist erforderlich"),
      otherwise: (schema) => schema.notRequired(),
    }),
    billingStreet: yup.string().when("useSameAddress", {
      is: false,
      then: (schema) => schema.required("Straße ist erforderlich"),
      otherwise: (schema) => schema.notRequired(),
    }),
    billingPlz: yup.string().when("useSameAddress", {
      is: false,
      then: (schema) => schema.required("PLZ ist erforderlich"),
      otherwise: (schema) => schema.notRequired(),
    }),
    billingCity: yup.string().when("useSameAddress", {
      is: false,
      then: (schema) => schema.required("Stadt ist erforderlich"),
      otherwise: (schema) => schema.notRequired(),
    }),
  })
  .required();

export default function Checkout() {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      payment: "Barzahlung",
      shippingName: "",
      shippingStreet: "",
      shippingPlz: "",
      shippingCity: "",
      billingName: "",
      billingStreet: "",
      billingPlz: "",
      billingCity: "",
      useSameAddress: true,
    },
  });

  const useSameAddress = watch("useSameAddress");

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

  const onSubmit = async (values) => {
    setLoading(true);
    console.log("Submitting order with values:", values, "and cart:", cart);
    return;

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          payment: values.payment,
          shippingName: values.shippingName,
          shippingStreet: values.shippingStreet,
          shippingPlz: values.shippingPlz,
          shippingCity: values.shippingCity,
          billingName: values.useSameAddress
            ? values.shippingName
            : values.billingName,
          billingStreet: values.useSameAddress
            ? values.shippingStreet
            : values.billingStreet,
          billingPlz: values.useSameAddress
            ? values.shippingPlz
            : values.billingPlz,
          billingCity: values.useSameAddress
            ? values.shippingCity
            : values.billingCity,
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
              <div className="border border-gray-300 rounded p-4 space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 pb-4 border-b last:border-b-0"
                  >
                    {item.image && (
                      <div className="relative h-20 w-20 flex-shrink-0 bg-gray-100 rounded">
                        <Image
                          src={`/shop/${item.image}`}
                          alt={item.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-tch-blue">
                        {item.name}
                      </h3>
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
                  <div className="flex justify-between text-xl font-bold text-tch-blue">
                    <span>Gesamtsumme:</span>
                    <span>{total.toFixed(2)} €</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkout Form */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Bestell- & Zahlungsinformationen
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                    {...register("email")}
                    className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-tch-blue ${
                      errors.email ? "border-red-500" : ""
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="mb-8">
                  <Controller
                    name="payment"
                    control={control}
                    render={({ field }) => (
                      <RadioCard.Root
                        {...field}
                        onValueChange={field.onChange}
                        colorPalette="blue"
                      >
                        <RadioCard.Label>Zahlungsmethode *</RadioCard.Label>
                        <HStack align="stretch">
                          <RadioCard.Item value="Barzahlung">
                            <RadioCard.ItemHiddenInput />
                            <RadioCard.ItemControl className="hover:cursor-pointer">
                              <RadioCard.ItemContent>
                                <RadioCard.ItemText fontWeight="medium">
                                  Barzahlung
                                </RadioCard.ItemText>
                                <RadioCard.ItemDescription>
                                  Bezahlung bei Abholung
                                </RadioCard.ItemDescription>
                              </RadioCard.ItemContent>
                              <RadioCard.ItemIndicator />
                            </RadioCard.ItemControl>
                          </RadioCard.Item>
                          <RadioCard.Item value="Überweisung">
                            <RadioCard.ItemHiddenInput />
                            <RadioCard.ItemControl className="hover:cursor-pointer">
                              <RadioCard.ItemContent>
                                <RadioCard.ItemText fontWeight="medium">
                                  Überweisung
                                </RadioCard.ItemText>
                                <RadioCard.ItemDescription>
                                  Banküberweisung nach Bestellung
                                </RadioCard.ItemDescription>
                              </RadioCard.ItemContent>
                              <RadioCard.ItemIndicator />
                            </RadioCard.ItemControl>
                          </RadioCard.Item>
                          <RadioCard.Item value="PayPal">
                            <RadioCard.ItemHiddenInput />
                            <RadioCard.ItemControl className="hover:cursor-pointer">
                              <RadioCard.ItemContent>
                                <RadioCard.ItemText fontWeight="medium">
                                  PayPal
                                </RadioCard.ItemText>
                                <RadioCard.ItemDescription>
                                  Schnelle und sichere Online-Zahlung
                                </RadioCard.ItemDescription>
                              </RadioCard.ItemContent>
                              <RadioCard.ItemIndicator />
                            </RadioCard.ItemControl>
                          </RadioCard.Item>
                        </HStack>
                      </RadioCard.Root>
                    )}
                  />
                  {errors.payment && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.payment.message}
                    </p>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Besteller Informationen
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label
                        htmlFor="shippingName"
                        className="block text-sm font-medium mb-1"
                      >
                        Name *
                      </label>
                      <input
                        type="text"
                        id="shippingName"
                        {...register("shippingName")}
                        className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-tch-blue ${
                          errors.shippingName ? "border-red-500" : ""
                        }`}
                      />
                      {errors.shippingName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.shippingName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="shippingStreet"
                        className="block text-sm font-medium mb-1"
                      >
                        Straße, Hausnummer *
                      </label>
                      <input
                        type="text"
                        id="shippingStreet"
                        {...register("shippingStreet")}
                        className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-tch-blue ${
                          errors.shippingStreet ? "border-red-500" : ""
                        }`}
                      />
                      {errors.shippingStreet && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.shippingStreet.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label
                          htmlFor="shippingPlz"
                          className="block text-sm font-medium mb-1"
                        >
                          PLZ *
                        </label>
                        <input
                          type="text"
                          id="shippingPlz"
                          {...register("shippingPlz")}
                          className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-tch-blue ${
                            errors.shippingPlz ? "border-red-500" : ""
                          }`}
                        />
                        {errors.shippingPlz && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.shippingPlz.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="shippingCity"
                          className="block text-sm font-medium mb-1"
                        >
                          Stadt *
                        </label>
                        <input
                          type="text"
                          id="shippingCity"
                          {...register("shippingCity")}
                          className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-tch-blue ${
                            errors.shippingCity ? "border-red-500" : ""
                          }`}
                        />
                        {errors.shippingCity && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.shippingCity.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Controller
                    name="useSameAddress"
                    control={control}
                    render={({ field }) => (
                      <Checkbox.Root
                        checked={field.value}
                        onCheckedChange={(e) => field.onChange(e.checked)}
                        className="mb-3"
                      >
                        <Checkbox.HiddenInput />
                        <Checkbox.Control />
                        <Checkbox.Label className="text-sm font-medium">
                          Rechnungsadresse ist gleich wie Lieferadresse
                        </Checkbox.Label>
                      </Checkbox.Root>
                    )}
                  />

                  {!useSameAddress && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold mb-3">
                        Rechnungsadresse
                      </h3>
                      <div>
                        <label
                          htmlFor="billingName"
                          className="block text-sm font-medium mb-1"
                        >
                          Name *
                        </label>
                        <input
                          type="text"
                          id="billingName"
                          {...register("billingName")}
                          className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-tch-blue ${
                            errors.billingName ? "border-red-500" : ""
                          }`}
                        />
                        {errors.billingName && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.billingName.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="billingStreet"
                          className="block text-sm font-medium mb-1"
                        >
                          Straße, Hausnummer *
                        </label>
                        <input
                          type="text"
                          id="billingStreet"
                          {...register("billingStreet")}
                          className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-tch-blue ${
                            errors.billingStreet ? "border-red-500" : ""
                          }`}
                        />
                        {errors.billingStreet && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.billingStreet.message}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label
                            htmlFor="billingPlz"
                            className="block text-sm font-medium mb-1"
                          >
                            PLZ *
                          </label>
                          <input
                            type="text"
                            id="billingPlz"
                            {...register("billingPlz")}
                            className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-tch-blue ${
                              errors.billingPlz ? "border-red-500" : ""
                            }`}
                          />
                          {errors.billingPlz && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.billingPlz.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="billingCity"
                            className="block text-sm font-medium mb-1"
                          >
                            Stadt *
                          </label>
                          <input
                            type="text"
                            id="billingCity"
                            {...register("billingCity")}
                            className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-tch-blue ${
                              errors.billingCity ? "border-red-500" : ""
                            }`}
                          />
                          {errors.billingCity && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.billingCity.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="text-xl w-full bg-tch-blue text-white py-3 rounded hover:bg-tch-blue/90 font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed hover:cursor-pointer"
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
