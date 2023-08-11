import { Link } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import Button from "../components/Button.jsx";
import animation from "../assets/subscription_animation.json";
import PageNotFoundStyles from "../styles/page-not-found.module.css";

const PageNotFound = () => {
  return (
    <main className={PageNotFoundStyles.main}>
      <div className={PageNotFoundStyles.main__content}>
        <h1 className={PageNotFoundStyles.main__title}>
          Errore 4
          <Player
            autoplay
            loop
            src={animation}
            className={PageNotFoundStyles.animation}
          ></Player>
          4
        </h1>
        <p className={PageNotFoundStyles.desc}>
          La pagina che stai cercando non esiste più.
        </p>

        <Link to="/">
          <Button className="light" text="Homepage" />
        </Link>
      </div>
    </main>
  );
};

export default PageNotFound;
