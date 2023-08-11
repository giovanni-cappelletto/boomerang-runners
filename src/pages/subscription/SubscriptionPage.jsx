import { useState } from "react";
import supabase from "../../Supabase.js";
import { Link } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import toast, { Toaster } from "react-hot-toast";
import Title from "../../components/Title.jsx";
import Input from "../../components/Input.jsx";
import Button from "../../components/Button.jsx";
import TotalAttendees from "../../components/TotalAttendees.jsx";
import SubscriptionAnimation from "../../assets/subscription_animation.json";
import subscriptionStyles from "../../styles/subscription.module.css";

const SubscriptionPage = ({
  attendees,
  attendeeInfos,
  setAttendeeInfos,
  eventInfos,
}) => {
  const [clicked, setClicked] = useState(false);

  const formatFields = (field) => {
    // Removes spaces, numbers, special characters and returns a name with the first letter uppercase
    // Maybe you could do it with just using replace() string method
    const formattedField = field
      .trim()
      .split("")
      .map((element, index) => {
        if (isNaN(Number(element))) {
          if (index === 0) return element.toUpperCase();

          return element;
        }
      })
      .join("")
      .replace(/[_&/#, +()$~%.'":@^*?<>{}[\]=\-|£$!]/g, "");

    return formattedField;
  };

  const handleChange = (e) => {
    const property = e.target.id;
    const value = e.target.value;
    const isTicketInput = property === "numerobiglietti" ? true : false;

    if (isTicketInput && Number(value) > 0) {
      setAttendeeInfos({ ...attendeeInfos, [property]: Number(value) });
      return;
    }

    setAttendeeInfos({ ...attendeeInfos, [property]: formatFields(value) });
  };

  const pushData = async () => {
    const { error } = await supabase.from("partecipante").insert(attendeeInfos);

    if (error) {
      toast.error("Qualcosa è andato storto!");
      console.error(error);
    } else {
      toast.success(`Ti sei iscritto a ${eventInfos[0]?.nome}!`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (attendeeInfos.nome && attendeeInfos.cognome && !clicked) {
      setClicked(true);
      pushData();
    }
  };

  return (
    <main className={subscriptionStyles.main}>
      <div>
        <h1 className={subscriptionStyles.main__title}>
          <Title text="Iscrizione" />
        </h1>

        <p className={subscriptionStyles.main__paragraph}>
          Ti stai iscrivendo all'evento "{eventInfos[0]?.nome}"
        </p>

        <form className={subscriptionStyles.form}>
          <Input
            placeholder="Nome"
            handleChange={handleChange}
            property="nome"
          />
          <Input
            placeholder="Cognome"
            handleChange={handleChange}
            property="cognome"
          />
          <Input
            type="number"
            placeholder="Numero di biglietti"
            handleChange={handleChange}
            property="numerobiglietti"
          />
        </form>

        <Button
          className={`${subscriptionStyles.send_btn} light`}
          text="Iscriviti!"
          onClick={handleSubmit}
        />

        {attendees && <TotalAttendees attendees={attendees} />}
      </div>

      <Player
        autoplay
        loop
        src={SubscriptionAnimation}
        className={subscriptionStyles.animation}
      ></Player>

      <Link to="/all-events">
        <Button text="Tutti gli eventi" className="fixed left dark" />
      </Link>

      <Toaster />
    </main>
  );
};

export default SubscriptionPage;
