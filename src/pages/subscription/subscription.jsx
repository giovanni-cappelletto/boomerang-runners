import { useState, useEffect } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { fetchData } from "../../Supabase.js";
import BlankPage from "../../components/BlankPage.jsx";
import SubscriptionPage from "./SubscriptionPage.jsx";
import Subscribed from "./Subscribed.jsx";

const AuthenticationGuard = ({ component, link }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => {
      return <BlankPage />;
    },
    returnTo: link,
  });

  return <Component />;
};

const Subscription = () => {
  const { user } = useAuth0();
  const eventId = Number(window.location.search.slice(7));
  const [attendeeInfos, setAttendeeInfos] = useState({
    nome: "",
    cognome: "",
    idevento: eventId,
    email: "",
    numerobiglietti: 1,
  });
  const [attendees, setAttendees] = useState({});
  const [eventInfos, setEventInfos] = useState({});
  const [attendeeAlreadySigned, setAttendeeAlreadySigned] = useState({});

  useEffect(() => {
    fetchData("evento", "id", eventId, setEventInfos);
    fetchData("partecipante", "idevento", eventId, setAttendees);

    if (user) setAttendeeInfos({ ...attendeeInfos, email: user.email });
  }, []);

  if (!user)
    return (
      <AuthenticationGuard
        component={<h1>hey</h1>}
        link={`/subscription?event=${eventId}`}
      />
    );

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

  let deltaTime = null;

  if (eventInfos[0]?.limiteiscrizione) {
    deltaTime =
      Date.parse(new Date(`${eventInfos[0]?.limiteiscrizione}, 12:00:00`)) -
      Date.parse(new Date());
  }

  return deltaTime > 0 &&
    Object.values(attendeeAlreadySigned).length &&
    attendeeInfos.email ? (
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
