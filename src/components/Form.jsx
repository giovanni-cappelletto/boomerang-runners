import Input from "./Input";
import Button from "./Button";
import createEventStyles from "../styles/create-event.module.css";

const Form = ({ fetchData, handleChange, renderCreateBtn }) => {
  return (
    <form className={createEventStyles.create__form}>
      <Input placeholder="Nome" property="nome" handleChange={handleChange} />
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

      {renderCreateBtn && (
        <Button
          onClick={(e) => {
            e.preventDefault();
            fetchData();
          }}
          className={`${createEventStyles.submit_btn} light`}
          text="Crea"
        />
      )}
    </form>
  );
};

export default Form;
