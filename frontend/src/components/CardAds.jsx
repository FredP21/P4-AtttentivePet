import PropTypes from "prop-types";
import { useState } from "react";
import { MdDeleteForever, MdEditCalendar } from "react-icons/md";
import { Link } from "react-router-dom";
import "../styles/card_ads.scss";
import ModalD from "./modals/ModalD";

function CardAds({ id, image, status, validation, city, phone, handleDelete }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  let validationText;
  switch (validation) {
    case 1:
      validationText = "En attente";
      break;
    case 2:
      validationText = "Accepté";
      break;
    default:
      validationText = "Refusé";
  }

  return (
    <article className="card_ads">
      <img
        src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${image}`}
        alt="represente un animal"
      />
      <h3>{status === 1 ? "Trouvé" : "Perdu"}</h3>
      <p className="city">{city}</p>
      <span className="validation">{validationText}</span>
      <span className="phone">{phone}</span>
      <span className="icons">
        <Link to={`/mes-annonces/${id}`}>
          <MdEditCalendar className="edit_icons" />
        </Link>
        <MdDeleteForever className="delete_icons" onClick={handleOpen} />
      </span>
      {open && (
        <ModalD handleOpen={handleOpen} handleDelete={handleDelete} id={id} />
      )}
    </article>
  );
}
CardAds.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired,
  validation: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default CardAds;
