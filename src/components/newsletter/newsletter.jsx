import Button from "../ui/button2";
import { useForm, Controller } from "react-hook-form";
import { toaster } from "../ui/toaster";
import BallLoader from "../ui/loading-ball";
import { useState } from "react";

function NewsLetter() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({});

  async function onSubmit(values) {
    try {
      console.log("values", values);
      setLoading(true);
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const resData = await res.json();
      console.log("resData", resData);

      if (resData.email) {
        const resMail = await fetch("/api/verifyNewsletterEmail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(resData),
        });
      }

      if (res.status != 200) {
        toaster.create({
          description: "Ein Fehler ist aufgetreten",
          type: "error",
        });
        setLoading(false);
      } else {
        console.log("resData", resData);
        toaster.create({
          description: `Email zur Bestätigung wurde versendet`,
          type: "success",
        });
        setLoading(false);
      }
    } catch (error) {
      console.log("api fetch error");
      console.error("Err", error);
      toaster.create({
        description: JSON.stringify(error),
        type: "error",
      });
      setLoading(false);
    }
  }

  return (
    <div className="bg-tch-blue p-8 md:p-10 relative text-white flex flex-col md:flex-row gap-12 md:gap-4 rounded-md mx-5 md:mx-0">
      <div className="flex flex-col gap-5 w-full md:w-1/2">
        <h1 className="text-white">
          TENNIS IN HOLZMINDEN SEIT 1928. <br /> TRADITION. ENGAGEMENT. ERFOLG.
        </h1>
        <ul className="list-square md:list-inside	">
          <li>über 500 Mitglieder</li>
          <li>6 Freiplätze</li>
          <li>4 moderne Hallenplätze (online buchbar)</li>
          <li>2 Squashplätze</li>
          <li>Mannschaften in vielen Alterklassen</li>
          <li>Spielertreff für Hobbyspieler</li>
          <li>Professionelle Tennisschule für alle Leistungsstärken</li>
          <li>Fast Learning Kurse für Anfänger und Wiedereinsteiger</li>
          <li>Gruppen- und Individualtraining</li>
        </ul>
      </div>
      <div className="flex w-full md:w-1/2 items-center justify-center flex-col gap-4">
        <h3 className="text-white">TC HOLZMINDEN NEWSLETTER</h3>
        <form
          className="w-full justify-center items-center flex flex-col gap-4"
          id="newsletter-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            {...register("email", {
              required: "Bitte Email eintragen",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Bitte eine gültige Email-Adresse eintragen",
              },
            })}
            type="text"
            placeholder="Email eintragen"
            className="text-center px-3 py-2 m-3 text-tch-blue rounded-md w-full md:w-3/4 placeholder:text-center"
          />
          <p> {errors.email?.message && errors.email?.message}</p>
          {loading ? (
            <BallLoader color={"white"} />
          ) : (
            <Button type={"submit"} className={"w-1/2"}>
              Newsletter abbonieren
            </Button>
          )}
        </form>
        <p className="text-sm text-center">
          Wir senden keinen Spam! <br /> Erfahre mehr in unserer
          Datenschutzerklärung.
        </p>
      </div>
    </div>
  );
}

export default NewsLetter;
