import { useMediaQuery } from "@uidotdev/usehooks";
import PropTypes from "prop-types";
import "../../styles/modal_admin.scss";

function ModalAdmin({ string, handleOpen, handleDelete, id }) {
  const isMobileScreen = useMediaQuery("only screen and (min-width: 850px)");
  return (
    <div className="modal_admin">
      <p>Voulez-vous supprimer definitivement {string} ?</p>
      <span>Cette action est irréversible !</span>
      <button type="button" onClick={() => handleDelete(id)}>
        {isMobileScreen ? "Supprimer" : "Oui"}
      </button>{" "}
      <button type="button" className="return" onClick={() => handleOpen()}>
        {isMobileScreen ? "Retour" : "Non"}
      </button>
    </div>
  );
}
ModalAdmin.propTypes = {
  id: PropTypes.number.isRequired,
  string: PropTypes.string.isRequired,
  handleOpen: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
export default ModalAdmin;
