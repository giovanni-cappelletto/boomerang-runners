import Title from "../components/Title";
import LoginButton from "../components/LoginButton";
import homeStyles from "../styles/home.module.css";

const Home = () => {
  return (
    <main className={homeStyles.main}>
      <h1 className={homeStyles.main__title}>
        <Title text="Mens insana in corpore sano" />
      </h1>

      <div className={homeStyles.main__content}>
        <p className={homeStyles.main__subtitle}>
          Vieni a camminare con noi ogni settimana, divertendoti e passando una
          parte della giornata in serenità!
        </p>
        <p className={homeStyles.main__desc}>
          Clicca il bottone qui sotto per entrare e, successivamente, iscriverti
          ad un evento.
        </p>
      </div>

      <div className={homeStyles.button_container}>
        <LoginButton />
        <a
          href="/documentation/introduction"
          target="_blank"
          className={homeStyles.help}
        >
          Aiuto
        </a>
      </div>
    </main>
  );
};

export default Home;
