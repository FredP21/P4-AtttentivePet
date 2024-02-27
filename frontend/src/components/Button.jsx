import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../styles/button.scss";

function Button({ link, title }) {
  return (
    <Link to={link} className="button">
      <button type="button">
        <p>{title}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </button>
    </Link>
  );
}

Button.propTypes = {
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
export default Button;
