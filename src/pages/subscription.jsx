import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Player } from "@lottiefiles/react-lottie-player";
import supabase, { fetchData } from "../Supabase.js";
import SubscriptionAnimation from "../assets/subscription_animation.json";
import toast, { Toaster } from "react-hot-toast";
import Title from "../components/Title";
import Input from "../components/Input";
import Button from "../components/Button";
import subscriptionStyles from "../styles/subscription.module.css";

const TotalAttendees = ({ attendees }) => {
  let tickets = 0;

  if (attendees.length === undefined) {
    tickets = 0;
  } else if (attendees.length === 1) {
    tickets = attendees[0].numerobiglietti;
  } else {
    for (const { numerobiglietti } of attendees) {
      tickets += numerobiglietti;
    }
  }

  return (
    <div className={subscriptionStyles.event__box}>
      {tickets === 1 ? "Partecipa" : "Partecipano"}
      <br />
      <p className={subscriptionStyles.tickets_number}>{tickets}</p>
      {tickets === 1 ? "Persona" : "Persone"}
      <br />
    </div>
  );
};

const Subscription = () => {
  const { user } = useAuth0();
  const eventId = Number(window.location.search.slice(7));

  const [attendeeInfos, setAttendeeInfos] = useState({
    nome: "",
    cognome: "",
    idevento: eventId,
    email: user.email,
    numerobiglietti: 1,
  });
  const [attendees, setAttendees] = useState({});
  const [eventInfos, setEventInfos] = useState({});

  useEffect(() => {
    fetchData("evento", "id", eventId, setEventInfos);
    fetchData("partecipante", "idevento", eventId, setAttendees);
  }, []);

  const formatFields = (field) => {
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

    if (attendeeInfos.nome && attendeeInfos.cognome) {
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
        style={{ height: "500px", width: "500px" }}
      ></Player>

      <Link to="/all-events">
        <Button text="Tutti gli eventi" className="fixed left dark" />
      </Link>

      <Toaster />
    </main>
  );
};

export default Subscription;
