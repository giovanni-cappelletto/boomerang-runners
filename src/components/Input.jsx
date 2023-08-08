import createEventStyles from "../styles/create-event.module.css";

const Input = ({ type = "text", placeholder, property, handleChange }) => {
  return (
    <div className={createEventStyles.input_wrapper}>
      <label htmlFor={property} className={createEventStyles.label}>
        {placeholder}
      </label>
      <input
        type={type}
        className={createEventStyles.input}
        id={property}
        onChange={handleChange}
      />
    </div>
  );
};

export default Input;
