import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import supabase from "../../Supabase.js";
import Title from "../../components/Title.jsx";
import Button from "../../components/Button.jsx";
import Form from "../../components/Input.jsx";
import Input from "../../components/Input.jsx";
import editIcon from "../../assets/edit_icon.svg";
import settingsStyles from "../../styles/settings2.module.css";

const ChangeSettings = () => {
  return <dialog></dialog>;
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
  const handleClick = (e) => {
    const element = e.target.previousSibling;
    const value = element.textContent.split(" ").slice(2).join(" ");

    setChangeSettings(!changeSettings);
    // if (property === "Descrizione") {
    //   return;
    // }

    // if (property === "Data") {
    //   return <Input type="date" value={value} />;
    // }
  };

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
          onClick={handleClick}
        />
      )}
    </div>
  );
};

const Settings = () => {
  const [eventInfo, setEventInfo] = useState({});
  const [changeSettings, setChangeSettings] = useState(false);

  const eventId = Number(window.location.search.slice(7));

  const fetchData = async () => {
    const { data } = await supabase
      .from("evento")
      .select("*")
      .eq("id", eventId);

    setEventInfo(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    eventInfo[0] && (
      <main className={settingsStyles.main}>
        <header className={settingsStyles.header}>
          <h1 className={settingsStyles.main__title}>
            <Title text="Impostazioni" />
          </h1>

          <Link to="/all-events">
            <div className={settingsStyles.close_icon} tabIndex={0}></div>
          </Link>
        </header>

        <div className={settingsStyles.info}>
          <InfoColumn columnTitle="Modifica">
            <Property
              property="Nome"
              value={eventInfo[0].nome}
              icon={true}
              changeSettings={changeSettings}
              setChangeSettings={setChangeSettings}
            />
            <Property
              property="Data"
              value={eventInfo[0].data}
              icon={true}
              changeSettings={changeSettings}
              setChangeSettings={setChangeSettings}
            />
            <Property
              property="Link"
              value={eventInfo[0].link}
              icon={true}
              changeSettings={changeSettings}
              setChangeSettings={setChangeSettings}
            />
            <Property
              property="Descrizione"
              value={eventInfo[0].descrizione}
              icon={true}
              changeSettings={changeSettings}
              setChangeSettings={setChangeSettings}
            />
          </InfoColumn>

          <InfoColumn columnTitle="Informazioni">
            <Property property="Numero biglietti" icon={false} />
            <Button
              className={`${settingsStyles.margin} dark`}
              text="Visualizza prenotazioni"
            />
          </InfoColumn>

          <InfoColumn columnTitle="Danger Zone">
            <Button
              className={`${settingsStyles.margin} light`}
              text="Elimina evento"
            />
          </InfoColumn>

          <Button className="fixed left dark" text="Salva le modifiche" />
        </div>

        {changeSettings && <ChangeSettings />}
      </main>
    )
  );
};

export default Settings;
