import ReactMarkdown from "react-markdown";
import "./markdown.css";

const Markdown = ({ md }) => {
  return (
    <ReactMarkdown
      components={{
        img({ src, alt }) {
          return (
            <img
              src={src}
              alt={alt}
              className={`markdown_image ${alt.endsWith("{small}") && "small"}`}
            />
          );
        },
      }}
    >
      {md}
    </ReactMarkdown>
  );
};

export default Markdown;
