import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import anim from "../assets/anim.png";
import info from "../assets/info.png";
import logout from "../assets/logout.png";
import { AuthContext } from "../context/AuthContext";
import "../styles/profile.scss";

function Profile() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleDelog = () => {
    axios
      .post("http://localhost:3310/api/logout", { withCredentials: true })
      .then(() => {
        setUser(null);
      })
      .then(() => navigate("/"))
      .catch((err) => {
        console.error(err);
      });
  };
  const [profile, setProfile] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3310/api/users/${user.id}`)
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        console.info(err);
      });
  }, []);
  return (
    <main className="profile">
      <h1>Bonjour {profile.nickname} !</h1>
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
          <Link to="/" onClick={handleDelog}>
            <img src={logout} alt="logo qui represente une porte de sortie" />{" "}
            Déconnexion <span> &lt;</span>
          </Link>
        </li>
      </ul>
    </main>
  );
}

export default Profile;
