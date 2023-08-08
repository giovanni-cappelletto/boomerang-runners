import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchData } from "../../Supabase.js";
import SubscriptionPage from "./SubscriptionPage.jsx";
import Subscribed from "./Subscribed.jsx";

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
  const [isParticipating, setIsParticipating] = useState(false);

  useEffect(() => {
    fetchData("evento", "id", eventId, setEventInfos);
    fetchData("partecipante", "idevento", eventId, setAttendees);
  }, []);

  const checkParticipation = () => {
    let userIsParticipating = false;

    for (const { email } of attendees) {
      userIsParticipating = email === user.email ? true : false;
    }

    // Avoiding too many re-renders
    if (userIsParticipating === isParticipating) return;

    setIsParticipating(userIsParticipating);
  };

  if (attendees.length) checkParticipation();

  return isParticipating ? (
    <Subscribed />
  ) : (
    <SubscriptionPage
      attendees={attendees}
      attendeeInfos={attendeeInfos}
      setAttendeeInfos={setAttendeeInfos}
      eventInfos={eventInfos}
    />
  );
};

export default Subscription;
