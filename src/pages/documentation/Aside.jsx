import ArrowIcon from "../../assets/arrow_icon.svg";
import asideStyles from "../../styles/aside.module.css";

const PageLink = ({ link, name }) => {
  return (
    <a
      href={`/documentation/${link}`}
      className={`${asideStyles.link_container} ${
        window.location.pathname.slice(15) === link && asideStyles.active
      }`}
    >
      <p>{name}</p>
      <img src={ArrowIcon} alt="Arrow Icon" className={asideStyles.arrow} />
    </a>
  );
};

const Chapter = ({ chapterName, chapters }) => {
  return (
    <div className={asideStyles.chapter_container}>
      <h3 className={asideStyles.chapter__title}>{chapterName}</h3>
      {chapters.map(({ link, name, key }) => {
        return <PageLink link={link} name={name} key={key} />;
      })}
    </div>
  );
};

const Aside = ({ isAsideActive, userPages, adminPages }) => {
  return (
    <aside
      className={`${asideStyles.aside} ${isAsideActive && asideStyles.active}`}
    >
      <div className={asideStyles.aside__content}>
        <h1 className={asideStyles.aside__title}>Docs</h1>

        <PageLink name="Introduzione" link="introduction" key="link-0" />

        <div className={asideStyles.chapters}>
          <Chapter key="utente" chapterName="Utente" chapters={userPages} />
          <Chapter key="admin" chapterName="Admin" chapters={adminPages} />
        </div>
      </div>
    </aside>
  );
};

export default Aside;
