import "./button.css";

const Button = ({ className, onClick, text, children, ref }) => {
  return (
    <button className={`btn ${className}`} onClick={onClick} ref={ref}>
      {text || children}
    </button>
  );
};

export default Button;
