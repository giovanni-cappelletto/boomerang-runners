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
  const [attendeeAlreadySigned, setAttendeeAlreadySigned] = useState({});

  useEffect(() => {
    fetchData("evento", "id", eventId, setEventInfos);
    fetchData("partecipante", "idevento", eventId, setAttendees);
  }, []);

  const checkParticipation = () => {
    let person = null;

    for (const attendee of attendees) {
      if (attendee.email === user.email) {
        person = attendee;
      }
    }

    if (person) setAttendeeAlreadySigned(person);
  };

  if (attendees.length && Object.values(attendeeAlreadySigned).length === 0) {
    checkParticipation();
  }

  return Object.values(attendeeAlreadySigned).length ? (
    <Subscribed
      eventInfos={eventInfos}
      attendee={attendeeAlreadySigned}
      attendees={attendees}
      eventId={eventId}
    />
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
