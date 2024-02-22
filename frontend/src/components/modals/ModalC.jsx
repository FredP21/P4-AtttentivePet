import { Link } from "react-router-dom";
import "../../styles/modal.scss";

function ModalC() {
  return (
    <div className="modal">
      <h1>Votre annonce est en cours d'analyse</h1>
      <Link to="/mes-annonces">
        <button type="button">Suivant</button>
      </Link>
    </div>
  );
}

export default ModalC;
