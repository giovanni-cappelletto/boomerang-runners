import "./title.css";

const Title = ({ text }) => {
  return text.split(" ").map((word, index) => {
    return (
      <span key={index} className="word">
        {word}
      </span>
    );
  });
};

export default Title;
