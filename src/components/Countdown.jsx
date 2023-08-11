import { useState, useEffect, useRef } from "react";
import "./countdown.css";

const Countdown = ({ date }) => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // It will reference the intervalID which will be used to delete previous intervals
  const intervalRef = useRef(0);

  useEffect(() => {
    if (date) {
      intervalRef.current = setInterval(getDate, 1000);

      if (countdownDate - Date.parse(new Date()) <= 0) {
        clearInterval(intervalRef.current);
      }
    }
  });

  let countdownDate = null;

  // Check if the new date input is equal to the previous one
  // in order to know if it has to clear the last interval
  if (countdownDate !== Date.parse(new Date(`${date}`))) {
    clearInterval(intervalRef.current);
  }

  countdownDate = Date.parse(new Date(`${date} 12:00:00`));

  const getDate = () => {
    const today = Date.parse(new Date());
    const deltaTime = countdownDate - today;

    const seconds = Math.floor((deltaTime / 1000) % 60);
    const minutes = Math.floor((deltaTime / (1000 * 60)) % 60);
    const hours = Math.floor((deltaTime / (1000 * 60 * 60)) % 24);
    const days = Math.floor(deltaTime / (1000 * 60 * 60 * 24));

    setCountdown({ seconds, minutes, hours, days });
  };

  const formatDate = (number) => {
    return number < 10 ? `0${number}` : number;
  };

  return (
    <div className="countdown">
      {formatDate(countdown.days)}d : {formatDate(countdown.hours)}h :{" "}
      {formatDate(countdown.minutes)}m : {formatDate(countdown.seconds)}s
    </div>
  );
};

export default Countdown;
