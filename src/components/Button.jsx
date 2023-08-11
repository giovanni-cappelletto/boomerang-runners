import "./button.css";

/*
  In className, Button accepts: 
    - theme: dark / light
    - type: settings-btn
    - position: fixed, bottom, right / left
*/

const Button = ({ className, onClick, text, children, ref }) => {
  return (
    <button className={`btn ${className}`} onClick={onClick} ref={ref}>
      {text || children}
    </button>
  );
};

export default Button;
