import PropTypes from "prop-types";
import "../styles/card.scss";

function CardFind({ announcement }) {
  return (
    <>
      {announcement.map((item) => (
        <article className="card" key={item.id}>
          <img src={item.image_pet} alt="represente un animal" />
          <h3>{item.status_id === 1 ? "Trouvé" : "Perdu"}</h3>
          <p className="city">{item.city}</p>
          <p className="description">{item.description}</p>
          <span className="phone">{item.phone_number}</span>
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
    })
  ).isRequired,
};

export default CardFind;
