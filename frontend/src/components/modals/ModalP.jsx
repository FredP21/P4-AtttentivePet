import { useContext } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import anim from "../../assets/animdesk.png";
import info from "../../assets/infodesk.png";
import logout from "../../assets/logoutdesc.png";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/modal_profile.scss";

function ModalP({ setIsShown }) {
  const { handleDelog } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="modal_profile">
      <IoMdCloseCircle className="icon_modal" onClick={(e) => setIsShown(!e)} />
      <ul>
        <li>
          <Link to="/mes-annonces" onClick={(e) => setIsShown(!e)}>
            <img src={anim} alt="logo qui represente un animal" /> Mes annonces
            <span> &gt;</span>
          </Link>
        </li>
        <li>
          <Link to="/mes-informations">
            <img src={info} alt="logo qui represente un utilisateur" /> Mes
            informations <span> &gt;</span>
          </Link>
        </li>
        <li>
          <Link to="/" onClick={() => handleDelog(navigate)}>
            <img src={logout} alt="logo qui represente une porte de sortie" />{" "}
            Déconnexion <span> &lt;</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default ModalP;
