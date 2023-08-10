import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Markdown from "../../components/Markdown.jsx";
import Button from "../../components/Button.jsx";
import Aside from "./Aside.jsx";
import BoxNextPage from "./BoxNextPage.jsx";
import documentationStyles from "../../styles/documentation.module.css";

// Markdown files
import introduction from "../../assets/documentationFiles/introduction.md";
import events from "../../assets/documentationFiles/events/events.md";
import subscription from "../../assets/documentationFiles/subscription/subscription.md";
import user_settings from "../../assets/documentationFiles/user_settings/user_settings.md";
import errors from "../../assets/documentationFiles/errors/errors.md";
import create_events from "../../assets/documentationFiles/create_events/create_events.md";
import event_settings from "../../assets/documentationFiles/event_settings/event_settings.md";

const Documentation = () => {
  const [markdownFile, setMarkdownFile] = useState({ markdown: null });
  const [asideActive, setAsideActive] = useState(false);
  const [boxInfos, setBoxInfos] = useState({
    section: "Utente",
    chapter: "Eventi",
    link: "events",
  });
  let boxInfosObj = { ...boxInfos };

  const files = {
    introduction,
    events,
    subscription,
    user_settings,
    errors,
    create_events,
    event_settings,
  };

  const fileName = window.location.pathname.slice(15);

  const userPages = [
    {
      name: "Eventi",
      link: "events",
      key: "link-1",
      next: {
        section: "Utente",
        chapter: "Come iscriversi",
        link: "subscription",
      },
    },
    {
      name: "Come iscriversi",
      link: "subscription",
      key: "link-2",
      next: {
        section: "Utente",
        chapter: "Modificare | Cancellare una prenotazione",
        link: "user_settings",
      },
    },
    {
      name: "Modificare | Cancellare una prenotazione",
      link: "user_settings",
      key: "link-3",
      next: { section: "Utente", chapter: "Errori", link: "errors" },
    },
    {
      name: "Errori",
      link: "errors",
      key: "link-4",
      next: {
        section: "Admin",
        chapter: "Creare un evento",
        link: "create_events",
      },
    },
  ];

  const adminPages = [
    {
      name: "Creare un evento",
      link: "create_events",
      key: "link-5",
      next: {
        section: "Admin",
        chapter: "Impostazioni di un evento",
        link: "event_settings",
      },
    },
    {
      name: "Impostazioni di un evento",
      link: "event_settings",
      key: "link-6",
    },
  ];

  const findNextPage = (array) => {
    if (fileName === "introduction") return;

    for (let i = 0; i < array.length; i++) {
      if (fileName === array[i].link) {
        boxInfosObj = array[i].next;
        break;
      }

      if (i === array.length - 1) {
        findNextPage(adminPages);
      }
    }
  };
  findNextPage(userPages);

  const fetchData = async () => {
    const file = await fetch(files[fileName]);
    const md = await file.text();

    if (md) {
      setMarkdownFile({ markdown: md });
    }
  };

  useEffect(() => {
    fetchData();
    setBoxInfos({ ...boxInfosObj });
  }, []);

  return (
    <main className={documentationStyles.main}>
      <div className={documentationStyles.main__content}>
        <Markdown md={markdownFile.markdown} />
        {fileName !== adminPages[adminPages.length - 1].link && (
          <BoxNextPage
            section={boxInfos.section}
            chapter={boxInfos.chapter}
            link={boxInfos.link}
          />
        )}
      </div>

      <div
        className={documentationStyles.hamburger_icon}
        onClick={() => setAsideActive(!asideActive)}
      ></div>

      <Aside
        isAsideActive={asideActive}
        userPages={userPages}
        adminPages={adminPages}
      />

      <Link to="../">
        <Button className="fixed right dark" text="Homepage" />
      </Link>
    </main>
  );
};

export default Documentation;
