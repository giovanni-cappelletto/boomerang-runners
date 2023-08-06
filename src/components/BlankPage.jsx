import Button from "./Button";
import Title from "./Title.jsx";
import blankPage from "../styles/blankPage.module.css";

const BlankPage = () => {
  return (
    <main className={blankPage.main}>
      <h1 className={blankPage.main__title}>
        <Title text="Oooops!" />
      </h1>
      <p>
        Per vedere questa pagina devi registrarti oppure accedere al sito. Vai
        nella home per proseguire
      </p>
      <a href="/">
        <Button className={`${blankPage.btn} light`} text="Homepage" />
      </a>
    </main>
  );
};

export default BlankPage;
