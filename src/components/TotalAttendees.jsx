import calculatetotalAttendees from "../utils/calculateTotalAttendees";
import subscriptionStyles from "../styles/subscription.module.css";

const TotalAttendees = ({ attendees }) => {
  const tickets = calculatetotalAttendees(attendees);

  return (
    <div className={subscriptionStyles.event__box}>
      {tickets === 1 ? "Partecipa" : "Partecipano"}
      <p className={subscriptionStyles.tickets_number}>{tickets}</p>
      <span className={subscriptionStyles.bold}>
        {tickets === 1 ? "persona" : "persone"}
      </span>
    </div>
  );
};

export default TotalAttendees;
