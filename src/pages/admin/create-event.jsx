import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import supabase from "../../Supabase.js";
import toast, { Toaster } from "react-hot-toast";
import Button from "../../components/Button";
import Form from "../../components/Form";
import Event from "../../components/Event";
import BlankPage from "../../components/BlankPage.jsx";
import createEventStyles from "../../styles/create-event.module.css";

const Section = ({
  className,
  sectionTitle,
  sectionTitleClassName,
  children,
}) => {
  return (
    <section className={className}>
      <div className={createEventStyles.wrapper}>
        <h1 className={`${sectionTitleClassName} ${createEventStyles.title}`}>
          {sectionTitle}
        </h1>

        {children}
      </div>
    </section>
  );
};

const CreateEvent = () => {
  const { user } = useAuth0();

  const [eventInfos, setEventInfos] = useState({
    nome: "Evento",
    data: "2023-01-01",
    limiteiscrizione: "",
    descrizione:
      "Lorem ipsum dolor sit amet... \n Lorem ipsum dolor sit amet... \n Lorem ipsum dolor sit amet... \n Lorem ipsum dolor sit amet... \n Lorem ipsum dolor sit amet...",
    link: "https://boomerang-runners.vercel.app/",
  });
  const [buttonTheme, setButtonTheme] = useState("dark");

  // Sort of intersectionObserver
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });

  const handleScroll = () => {
    const position = window.pageYOffset;

    if (position > 75) {
      setButtonTheme("light");
      return;
    }

    setButtonTheme("dark");
  };

  const pushData = async () => {
    const { error } = await supabase.from("evento").insert(eventInfos);

    if (error) {
      toast.error("Qualcosa è andato storto!");
      console.error(error);
    } else {
      toast.success("Evento creato con successo!");
    }
  };

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

  if (!user) return <BlankPage />;

  return (
    <main className={createEventStyles.main}>
      <Section
        className={createEventStyles.create_container}
        sectionTitle="Crea un evento"
        sectionTitleClassName={createEventStyles.create__title}
      >
        <Form
          fetchData={pushData}
          handleChange={handleChange}
          eventInfos={eventInfos}
          renderCreateBtn={true}
        />
      </Section>

      <Section
        className={createEventStyles.preview_container}
        sectionTitle="Preview"
        sectionTitleClassName={createEventStyles.preview__title}
      >
        <Event
          title={eventInfos.nome}
          limitSubscriptionDate={eventInfos.limiteiscrizione}
          eventDate={eventInfos.data}
          desc={eventInfos.descrizione}
          link={eventInfos.link}
          createEventView={true}
        />
      </Section>

      <Link to="/all-events">
        <Button
          className={`fixed left ${buttonTheme}`}
          text="Tutti gli eventi"
        />
      </Link>

      <Toaster />
    </main>
  );
};

export default CreateEvent;
