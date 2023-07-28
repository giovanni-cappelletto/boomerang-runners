import Input from "../../components/Input";
import Button from "../../components/Button";
import createEventStyles from "../styles/create-event2.module.css";

const Form = ({ fetchData, handleChange }) => {
  return (
    <form className={createEventStyles.create__form}>
      <Input placeholder="Nome" property="title" handleChange={handleChange} />
      <Input
        type="date"
        placeholder="Data"
        property="data"
        handleChange={handleChange}
      />
      <Input
        placeholder="Link per maggiori info"
        property="link"
        handleChange={handleChange}
      />
      <textarea
        placeholder="Descrizione"
        className={`${createEventStyles.input} ${createEventStyles.desc_field}`}
        id="descrizione"
        onChange={handleChange}
      ></textarea>
      <Button
        onClick={(e) => {
          e.preventDefault();
          fetchData();
        }}
        className={`${createEventStyles.submit_btn} light`}
        text="Crea"
      />
    </form>
  );
};

export default Form;
