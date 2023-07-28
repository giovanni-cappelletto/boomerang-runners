import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import supabase from "../Supabase.js";
import Event from "../components/Event.jsx";
import LogoutButton from "../components/LogoutButton.jsx";
import Title from "../components/Title.jsx";
import Button from "../components/Button.jsx";
import allEventsStyles from "../styles/all-events2.module.css";
import blankPage from "../styles/blankPage.module.css";

const Authenticated = ({ eventsArray }) => {
  return (
    <main className={allEventsStyles.main}>
      <h1 className={allEventsStyles.main__title}>Tutti gli eventi</h1>

      <div className={allEventsStyles.events_container}>
        {eventsArray.map((event) => {
          return (
            <Event
              key={event.id}
              eventId={event.id}
              title={event.nome}
              date={event.data}
              desc={event.descrizione}
              link={event.link}
            />
          );
        })}
      </div>

      <LogoutButton />

      <Link to="/create-event">
        <Button text="Crea un evento" className="fixed right light" />
      </Link>
    </main>
  );
};

const BlankPage = () => {
  return (
    <main className={blankPage.main}>
      <h1 className={blankPage.main__title}>
        <Title text="Oooops!" />
      </h1>
      <p>
        Per vedere questa pagina devi registrarti oppure accedere al sito. Vai
        nella home per proseguire
      </p>
      <a href="/">
        <Button className={`${blankPage.btn} light`} text="Homepage" />
      </a>
    </main>
  );
};

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const { isAuthenticated } = useAuth0();

  const fetchData = async () => {
    const { data } = await supabase.from("evento").select("*");

    setEvents(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isAuthenticated && events ? (
    <Authenticated eventsArray={events} />
  ) : (
    <BlankPage />
  );
};

export default AllEvents;
