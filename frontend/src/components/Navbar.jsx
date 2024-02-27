// import axios from "axios";
import { useContext, useState } from "react";
import { IoMdPower } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logonav.webp";
import profil from "../assets/profile.png";
import { AuthContext } from "../context/AuthContext";
import "../styles/navbar.scss";
import ModalP from "./modals/ModalP";

function Navbar() {
  const { isAuthenticated, user, handleDelog } = useContext(AuthContext);
  const [isShown, setIsShown] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <img
        src={logo}
        alt="un logo qui avec du texte et une patte de chien"
        className="logo_navbar"
      />
      {user?.is_admin === 1 ? (
        <>
          {" "}
          <ul>
            <li>
              <Link to="/en-attente">Annonce en attente</Link>
            </li>
            <li>
              <Link to="/archives">Archives</Link>
            </li>
            <li>
              <Link to="/utilisateurs">Utilisateurs</Link>
            </li>
          </ul>
          <span onClick={() => handleDelog(navigate)} aria-hidden="true">
            Se déconnecter <IoMdPower className="logo_profil" />{" "}
          </span>
        </>
      ) : (
        <>
          {" "}
          <ul>
            <li>
              <Link to="/">Accueil</Link>
            </li>
            <li>
              <Link to="/perdu">Animaux Perdus</Link>
            </li>
            <li>
              <Link to="/trouve">Animaux Trouvés</Link>
            </li>
          </ul>
          {isAuthenticated ? (
            <>
              <div className="wrap">
                <p>{user.nickname}</p>
                <img
                  src={profil}
                  alt="un logo représentant un utilisateur lambda"
                  className="logo_profil"
                  aria-hidden="true"
                  onClick={() => {
                    setIsShown(!isShown);
                  }}
                />
              </div>
              {isShown ? <ModalP setIsShown={setIsShown} /> : null}
            </>
          ) : (
            <Link to="/connexion">
              <img
                src={profil}
                alt="un logo représentant un utilisateur lambda"
                className="logo_profil"
              />
            </Link>
          )}
        </>
      )}
    </nav>
  );
}

export default Navbar;
