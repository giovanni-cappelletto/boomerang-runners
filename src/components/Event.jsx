import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import eventBg from "../assets/event__bg.png";
import settingsIcon from "../assets/settings_icon.svg";
import Title from "../components/Title";
import Button from "../components/Button";
import Countdown from "../components/Countdown.jsx";
import EventStyles from "../styles/all-events.module.css";

const Event = ({
  eventId,
  title,
  limitSubscriptionDate,
  eventDate,
  desc,
  link,
  createEventView,
}) => {
  const { user } = useAuth0();

  const deltaTime =
    Date.parse(new Date(`${limitSubscriptionDate}, 12:00:00`)) -
    Date.parse(new Date());

  return (
    <div className={EventStyles.event}>
      <img
        src={eventBg}
        alt="Event Background"
        className={EventStyles.event__image}
        draggable="false"
      />

      <div className={EventStyles.event__content}>
        <h1 className={EventStyles.event__title}>
          <Title text={title} />
        </h1>
        <div className={EventStyles.event__infos_wrapper}>
          <span className={EventStyles.event__date}>{eventDate}</span>
          <Countdown date={limitSubscriptionDate} />
        </div>
        <p className={EventStyles.event__desc}>
          {/* Check if the user has clicked Enter while writing event's description */}
          {desc.split("").map((letter, index) => {
            if (letter === "\n") {
              return <br key={`${eventId}-${index}`} />;
            }

            return letter;
          })}
        </p>

        <div className={EventStyles.btn_container}>
          {/* Check if the component is being rendered from 'create-events' */}
          {user.sub === import.meta.env.VITE_ADMIN_SUB && !createEventView ? (
            <Link to={`/settings?event=${eventId}`}>
              <Button className="light settings-btn">
                <img src={settingsIcon} alt="Settings button" />
              </Button>
            </Link>
          ) : (
            <>
              {deltaTime > 0 && (
                <Link to={`/subscription?event=${eventId}`}>
                  <Button className="light" text="Iscriviti" />
                </Link>
              )}
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className={EventStyles.event__link}
              >
                Maggiori info
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Event;
