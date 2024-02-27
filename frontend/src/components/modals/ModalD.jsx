import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../../styles/modal_destroy.scss";

function ModalD({ handleOpen, handleDelete, id }) {
  return (
    <div className="modal_destroy">
      <h1>Êtes-vous sûr de vouloir supprimer cette annonce?</h1>
      <p>Cette action est irréversible</p>
      <span>
        <button type="button" onClick={handleOpen}>
          Non
        </button>

        <Link to="/mes-annonces" onClick={() => handleDelete(id)}>
          <button type="button">Oui</button>
        </Link>
      </span>
    </div>
  );
}
ModalD.propTypes = {
  id: PropTypes.number.isRequired,
  handleOpen: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
export default ModalD;
