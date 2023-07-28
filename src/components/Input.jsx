import createEventStyles from "../styles/create-event2.module.css";

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
