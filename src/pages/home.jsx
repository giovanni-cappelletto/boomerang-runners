import Title from "../components/Title";
import LoginButton from "../components/LoginButton";
import homeStyles from "../styles/home2.module.css";

const Home = () => {
  return (
    <main className={homeStyles.main}>
      <h1 className={homeStyles.main__title}>
        <Title text="Mens sana in corpore sano" />
      </h1>

      <div className={homeStyles.main__content}>
        <p className={homeStyles.main__subtitle}>
          Vieni a camminare con noi ogni settimana, divertendoti e passandouna
          parte della giornata in serenità!
        </p>
        <p className={homeStyles.main__desc}>
          Clicca il bottone qui sotto per entrare e, successivamente, iscriverti
          ad un evento.
        </p>
      </div>

      <LoginButton />
    </main>
  );
};

export default Home;
