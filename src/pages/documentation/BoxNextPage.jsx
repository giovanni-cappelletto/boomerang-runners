import ArrowIcon from "../../assets/arrow_icon.svg";
import boxNextPageStyles from "../../styles/box-next-page.module.css";

const BoxNextPage = ({ section, chapter, link }) => {
  return (
    <a
      href={`../documentation/${link}`}
      className={boxNextPageStyles.linkToPage}
    >
      <div className={boxNextPageStyles.box}>
        <div className={boxNextPageStyles.box__content}>
          <p className={boxNextPageStyles.section}>Prossimo - {section}</p>
          <h2 className={boxNextPageStyles.box__title}>{chapter}</h2>
          <img
            src={ArrowIcon}
            alt="Arrow Icon"
            className={boxNextPageStyles.arrow}
          />
        </div>
      </div>
    </a>
  );
};

export default BoxNextPage;
