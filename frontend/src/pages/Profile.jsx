import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import anim from "../assets/anim.png";
import info from "../assets/info.png";
import logout from "../assets/logout.png";
import { AuthContext } from "../context/AuthContext";
import "../styles/profile.scss";

function Profile() {
  const { user, handleDelog } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <main className="profile">
      <h1>Bonjour {user.nickname} !</h1>
      <ul>
        <li>
          <Link to="/mes-annonces">
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
    </main>
  );
}

export default Profile;
