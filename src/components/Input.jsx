import createEventStyles from "../styles/create-event.module.css";

const Input = ({ type = "text", placeholder, property, handleChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={createEventStyles.input}
      id={property}
      onChange={handleChange}
    />
  );
};

export default Input;
