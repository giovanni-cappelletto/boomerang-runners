import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import supabase, { fetchData } from "../../Supabase.js";
import toast, { Toaster } from "react-hot-toast";
import Title from "../../components/Title.jsx";
import Button from "../../components/Button.jsx";
import Form from "../../components/Form.jsx";
import InfoColumn from "../../components/InfoColumn.jsx";
import Property from "../../components/Property.jsx";
import checkChangedProperties from "../../utils/checkChangedProperties.jsx";
import calculateTotalAttendees from "../../utils/calculateTotalAttendees.jsx";
import settingsStyles from "../../styles/settings.module.css";

const ChangeSettings = ({
  setChangeSettings,
  eventInfos,
  setEventInfos,
  eventId,
}) => {
  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.code === "Escape") setChangeSettings(false);
    });
  }, []);

  const handleChange = (e) => {
    const property = e.target.id;
    const value = e.target.value;

    if (property === "link") {
      if (!value.startsWith("https://")) {
        const link = `https://${value}`;
        setEventInfos({ ...eventInfos, [property]: link });
        return;
      }
    }

    setEventInfos({ ...eventInfos, [property]: value });
  };

  const handleClick = async () => {
    const { error } = await supabase
      .from("evento")
      .update(checkChangedProperties(eventInfos))
      .eq("id", eventId);

    if (error) {
      toast.error("Impossibile modificare l'evento.");
      console.error(error);
    } else {
      toast.success("L'evento è stato modificato con successo!");
    }
  };

  return (
    <dialog className={settingsStyles.settings_panel} open>
      <header className={settingsStyles.settings_panel__header}>
        <h1 className={settingsStyles.settings_panel__title}>Modifica</h1>
        <div
          className={settingsStyles.settings_panel__close_icon}
          onClick={() => {
            setChangeSettings(false);
          }}
        ></div>
      </header>

      <div>
        <Form handleChange={handleChange} renderCreateBtn={false} />

        <Button
          className={`${settingsStyles.save_btn} dark`}
          text="Salva le modifiche"
          onClick={handleClick}
        />
      </div>
    </dialog>
  );
};

const Settings = () => {
  const [eventInfos, setEventInfos] = useState({});
  const [changeSettings, setChangeSettings] = useState(false);
  const [attendees, setAttendees] = useState(0);

  const eventId = Number(window.location.search.slice(7));

  useEffect(() => {
    fetchData("evento", "id", eventId, setEventInfos);
    fetchData("partecipante", "idevento", eventId, setAttendees);
  }, []);

  const viewAttendees = async () => {
    const { data } = await supabase
      .from("partecipante")
      .select("nome, cognome, numerobiglietti, email")
      .eq("idevento", eventId)
      .csv();

    // JavaScript logic for handling the download of a generated csv file
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${eventInfos[0].nome}.csv`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  const deleteEvent = async () => {
    const { error } = await supabase.from("evento").delete().eq("id", eventId);

    if (error) {
      toast.error("Impossibile eliminare l'evento");
      console.error(error);
    }
  };

  return (
    eventInfos[0] && (
      <main
        className={`${settingsStyles.main} ${
          changeSettings ? settingsStyles.active : ""
        }`}
      >
        <header className={settingsStyles.header}>
          <h1 className={settingsStyles.main__title}>
            <Title text="Impostazioni" />
          </h1>

          <Link to="/all-events">
            <div className={settingsStyles.close_icon} tabIndex={0}></div>
          </Link>
        </header>

        <div className={settingsStyles.info}>
          <InfoColumn columnTitle="Informazioni">
            <Property
              property="Nome"
              value={eventInfos?.nome || eventInfos[0].nome}
              icon={true}
              changeSettings={changeSettings}
              setChangeSettings={setChangeSettings}
            />
            <Property
              property="Data"
              value={eventInfos?.data || eventInfos[0].data}
              icon={true}
              changeSettings={changeSettings}
              setChangeSettings={setChangeSettings}
            />
            <Property
              property="Limite iscrizione"
              value={
                eventInfos?.limiteiscrizione || eventInfos[0].limiteiscrizione
              }
              icon={true}
              changeSettings={changeSettings}
              setChangeSettings={setChangeSettings}
            />
            <Property
              property="Link"
              value={eventInfos?.link || eventInfos[0].link}
              icon={true}
              changeSettings={changeSettings}
              setChangeSettings={setChangeSettings}
            />
            <Property
              property="Descrizione"
              value={eventInfos?.descrizione || eventInfos[0].descrizione}
              icon={true}
              changeSettings={changeSettings}
              setChangeSettings={setChangeSettings}
            />
          </InfoColumn>

          <InfoColumn columnTitle="Partecipanti">
            <Property
              property="Numero biglietti"
              value={attendees && calculateTotalAttendees(attendees)}
              icon={false}
            />
            <Button
              className={`${settingsStyles.margin} dark`}
              text="Visualizza prenotazioni"
              onClick={viewAttendees}
            />
          </InfoColumn>

          <InfoColumn columnTitle="Danger Zone">
            <Link to="/all-events">
              <Button
                className={`${settingsStyles.margin} light`}
                text="Elimina evento"
                onClick={deleteEvent}
              />
            </Link>
          </InfoColumn>
        </div>

        {changeSettings && (
          <ChangeSettings
            setChangeSettings={setChangeSettings}
            eventInfos={eventInfos}
            setEventInfos={setEventInfos}
            eventId={eventId}
          />
        )}

        <Toaster />
      </main>
    )
  );
};

export default Settings;
