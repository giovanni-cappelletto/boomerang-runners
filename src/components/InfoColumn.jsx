import settingsStyles from "../styles/settings.module.css";

const InfoColumn = ({ columnTitle, children }) => {
  return (
    <div className={settingsStyles.info__column}>
      <h2 className={settingsStyles.info__title}>{columnTitle}</h2>
      {children}
    </div>
  );
};

export default InfoColumn;
