import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchData } from "../../Supabase.js";
import IsParticipating from "./isParticipating.jsx";
import SubscriptionPage from "./SubscriptionPage.jsx";

const modifyParticipation = () => {
  return;
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
  const [isParticipating, setIsParticipating] = useState(false);

  useEffect(() => {
    fetchData("evento", "id", eventId, setEventInfos);
    fetchData("partecipante", "idevento", eventId, setAttendees);
  }, []);

  // const checkParticipation = () => {
  //   if (!attendees) return;

  //   for (const { email } of attendees) {
  //     if (email !== user.email) return;

  //     setIsParticipating(true);
  //   }
  // };
  // checkParticipation();

  return isParticipating ? (
    <IsParticipating />
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
