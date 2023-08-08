import { useState, useEffect } from "react";
import supabase from "../../Supabase.js";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Button from "../../components/Button.jsx";
import InfoColumn from "../../components/InfoColumn.jsx";
import Property from "../../components/Property.jsx";
import Title from "../../components/Title.jsx";
import Input from "../../components/Input";
import TotalAttendees from "../../components/TotalAttendees.jsx";
import checkChangedProperties from "../../utils/checkChangedProperties.jsx";
import settingsStyles from "../../styles/settings.module.css";
import subscriptionStyles from "../../styles/subscription.module.css";
import subscribedStyles from "../../styles/subscribed.module.css";

const ChangeInfos = ({
  setChangeInfos,
  setAttendeeInfos,
  attendeeInfos,
  eventId,
}) => {
  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.code === "Escape") setChangeInfos(false);
    });
  }, []);

  const handleChange = (e) => {
    const property = e.target.id;
    const value = e.target.value;

    setAttendeeInfos({ ...attendeeInfos, [property]: value });
  };

  const handleClick = async () => {
    const { error } = await supabase
      .from("partecipante")
      .update(checkChangedProperties(attendeeInfos))
      .eq("idevento", eventId);

    if (error) {
      toast.error("Qualcosa è andato storto!");
      console.error(error);
    } else {
      toast.success("Informazioni modificate!");
    }
  };

  return (
    <dialog className={settingsStyles.settings_panel} open>
      <header className={settingsStyles.settings_panel__header}>
        <h1 className={settingsStyles.settings_panel__title}>Modifica</h1>
        <div
          className={settingsStyles.settings_panel__close_icon}
          onClick={() => {
            setChangeInfos(false);
          }}
        ></div>
      </header>

      <div>
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
          className={`${settingsStyles.save_btn} dark`}
          text="Salva le modifiche"
          onClick={handleClick}
        />
      </div>
    </dialog>
  );
};

const Subscribed = ({ eventInfos, attendee, attendees, eventId }) => {
  const [changeInfos, setChangeInfos] = useState(false);
  const [attendeeInfos, setAttendeeInfos] = useState(attendee);

  const deleteSubscription = async () => {
    const { error } = await supabase
      .from("partecipante")
      .delete()
      .match({ idevento: eventId, id: attendee.id });

    if (error) {
      toast.error("Impossibile eliminare la prenotazione");
      console.error(error);
    }
  };

  return (
    <main
      className={`${settingsStyles.main} ${
        changeInfos ? settingsStyles.active : ""
      }`}
    >
      <header className={subscribedStyles.header}>
        <h1 className={subscriptionStyles.main__title}>
          <Title text="Modifica partecipazione" />
        </h1>
        <p className={subscriptionStyles.main__paragraph}>
          Stai modificando i dati relativi a "{eventInfos[0]?.nome}"
        </p>
      </header>

      <div className={settingsStyles.info}>
        <InfoColumn columnTitle="Modifica">
          <Property
            property="Nome"
            value={attendee?.nome}
            icon={true}
            changeSettings={changeInfos}
            setChangeSettings={setChangeInfos}
          />
          <Property
            property="Cognome"
            value={attendee?.cognome}
            icon={true}
            changeSettings={changeInfos}
            setChangeSettings={setChangeInfos}
          />
          <Property
            property="Numero biglietti"
            value={attendee?.numerobiglietti}
            icon={true}
            changeSettings={changeInfos}
            setChangeSettings={setChangeInfos}
          />
        </InfoColumn>

        <InfoColumn columnTitle="Danger Zone">
          <Link to="../all-events/">
            <Button
              className="light"
              text="Cancella prenotazione"
              onClick={deleteSubscription}
            />
          </Link>
        </InfoColumn>

        {attendees && (
          <TotalAttendees
            attendees={attendees}
            className={subscribedStyles.box}
          />
        )}
      </div>

      <Link to="../all-events/">
        <Button className="fixed left dark" text="Tutti gli eventi" />
      </Link>

      {changeInfos && (
        <ChangeInfos
          setChangeInfos={setChangeInfos}
          setAttendeeInfos={setAttendeeInfos}
          attendeeInfos={attendeeInfos}
          eventId={eventId}
        />
      )}

      <Toaster />
    </main>
  );
};

export default Subscribed;
