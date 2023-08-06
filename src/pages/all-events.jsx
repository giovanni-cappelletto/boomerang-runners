import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchData } from "../Supabase.js";
import Event from "../components/Event.jsx";
import LogoutButton from "../components/LogoutButton.jsx";
import Button from "../components/Button.jsx";
import BlankPage from "../components/BlankPage.jsx";
import allEventsStyles from "../styles/all-events.module.css";

const Authenticated = ({ user, eventsArray }) => {
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

      {user.sub === import.meta.env.VITE_ADMIN_SUB && (
        <Link to="/create-event">
          <Button text="Crea un evento" className="fixed right light" />
        </Link>
      )}
    </main>
  );
};

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    fetchData("evento", "", "", setEvents);
  }, []);

  return isAuthenticated && events ? (
    <Authenticated user={user} eventsArray={events} />
  ) : (
    <BlankPage />
  );
};

export default AllEvents;
