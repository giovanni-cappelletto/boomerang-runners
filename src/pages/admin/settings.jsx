import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import supabase from "../../Supabase.js";
import toast, { Toaster } from "react-hot-toast";
import Title from "../../components/Title.jsx";
import Button from "../../components/Button.jsx";
import Form from "../../components/Form.jsx";
import editIcon from "../../assets/edit_icon.svg";
import settingsStyles from "../../styles/settings2.module.css";

const ChangeSettings = ({
  setChangeSettings,
  eventInfos,
  setEventInfos,
  eventId,
}) => {
  const handleChange = (e) => {
    const property = e.target.id;
    const value = e.target.value;

    setEventInfos({ ...eventInfos, [property]: value });
  };

  const handleClick = async () => {
    const changedProperties = {};

    for (const property of Object.entries(eventInfos).slice(1)) {
      changedProperties[property[0]] = property[1];
    }

    const { error } = await supabase
      .from("evento")
      .update(changedProperties)
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

const InfoColumn = ({ columnTitle, children }) => {
  return (
    <div className={settingsStyles.info__column}>
      <h2 className={settingsStyles.info__title}>{columnTitle}</h2>
      {children}
    </div>
  );
};

const Property = ({
  property,
  value,
  icon,
  changeSettings,
  setChangeSettings,
}) => {
  return (
    <div className={settingsStyles.info__container}>
      <p className={settingsStyles.info__property}>
        <span className={settingsStyles.bold}>{property}: </span> {value}
      </p>
      {icon && (
        <img
          src={editIcon}
          alt="Edit Icon"
          className={settingsStyles.edit_btn}
          onClick={() => {
            setChangeSettings(!changeSettings);
          }}
        />
      )}
    </div>
  );
};

const Settings = () => {
  const [eventInfos, setEventInfos] = useState({});
  const [changeSettings, setChangeSettings] = useState(false);
  const [attendees, setAttendees] = useState(0);

  const eventId = Number(window.location.search.slice(7));

  const fetchData = async (table, column, value, setState) => {
    const { data } = await supabase.from(table).select("*").eq(column, value);
    setState(data);
  };

  useEffect(() => {
    fetchData("evento", "id", eventId, setEventInfos);
    fetchData("partecipante", "idevento", eventId, setAttendees);
  }, []);

  const totalAttendees = () => {
    let tickets = 0;

    for (const { numerobiglietti } of attendees) {
      tickets += numerobiglietti;
    }

    return tickets;
  };

  const viewAttendees = async () => {
    const { data } = await supabase
      .from("partecipante")
      .select("nome, cognome, numerobiglietti")
      .eq("idevento", eventId)
      .csv();

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
              value={attendees && totalAttendees()}
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
