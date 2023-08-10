import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import createEventStyles from "../styles/create-event.module.css";

const Form = ({ fetchData, handleChange, renderCreateBtn }) => {
  const [clicked, setClicked] = useState(false);

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
        type="date"
        placeholder="Limite iscrizione"
        property="limiteiscrizione"
        handleChange={handleChange}
      />
      <Input
        placeholder="Link per maggiori info"
        property="link"
        handleChange={handleChange}
      />
      <div className={createEventStyles.input_wrapper}>
        <label htmlFor="descrizione" className={createEventStyles.label}>
          Descrizione
        </label>
        <textarea
          className={`${createEventStyles.input} ${createEventStyles.desc_field}`}
          id="descrizione"
          onChange={handleChange}
        ></textarea>
      </div>

      {renderCreateBtn && (
        <Button
          onClick={(e) => {
            e.preventDefault();

            if (!clicked) {
              setClicked(true);
              fetchData();
            }
          }}
          className={`${createEventStyles.submit_btn} light`}
          text="Crea"
        />
      )}
    </form>
  );
};

export default Form;
