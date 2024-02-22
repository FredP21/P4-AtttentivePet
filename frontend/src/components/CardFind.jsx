import PropTypes from "prop-types";
import { IoMdCheckmarkCircle, IoMdCloseCircle } from "react-icons/io";
import "../styles/card.scss";

function CardFind({ announcement, handleUpdateGood, handleUpdateWrong }) {
  return (
    <>
      {announcement.map((ads) => (
        <article className="card" key={ads.id}>
          <img src={ads.image_pet} alt="represente un animal" />
          <h3>{ads.status_id === 1 ? "Trouvé" : "Perdu"}</h3>
          <p className="city">{ads.city}</p>
          <p className="description">{ads.description}</p>
          <span className="phone">{ads.phone_number}</span>
          {ads.validation_id === 1 ? (
            <span className="wrap_icon">
              <IoMdCheckmarkCircle
                className="icon_card good"
                onClick={() => handleUpdateGood(ads.id)}
              />
              <IoMdCloseCircle
                className="icon_card wrong"
                onClick={() => handleUpdateWrong(ads.id)}
              />
            </span>
          ) : null}
        </article>
      ))}
    </>
  );
}

CardFind.propTypes = {
  announcement: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image_pet: PropTypes.string.isRequired,
      status_id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      phone_number: PropTypes.string.isRequired,
      validation_id: PropTypes.number.isRequired,
    })
  ).isRequired,
  handleUpdateGood: PropTypes.func,
  handleUpdateWrong: PropTypes.func,
};

CardFind.defaultProps = {
  handleUpdateGood: () => {},
  handleUpdateWrong: () => {},
};

export default CardFind;
