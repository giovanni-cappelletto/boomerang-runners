import editIcon from "../assets/edit_icon.svg";
import settingsStyles from "../styles/settings.module.css";

const Property = ({
  property,
  value,
  icon,
  changeSettings,
  setChangeSettings,
}) => {
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
          onClick={() => {
            setChangeSettings(!changeSettings);
          }}
        />
      )}
    </div>
  );
};

export default Property;
