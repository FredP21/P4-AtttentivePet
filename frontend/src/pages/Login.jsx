import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import connexion from "../assets/login.png";
import notshow from "../assets/notshow.png";
import show from "../assets/show.png";
import { AuthContext } from "../context/AuthContext";
import "../styles/login.scss";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShown, setIsShown] = useState(false);
  const { setUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth`,
        { email, password },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data) {
          setUser(res.data.user);
          console.info(user);
          if (res.data.user.is_admin === 1) {
            navigate("/en-attente");
            toast.info("Vous êtes connecté en tant qu'admin");
          } else {
            navigate("/");
            toast.success(
              `Bonjour ${res.data.user.nickname}, Vous êtes connecté`
            );
          }
        } else {
          console.error("No user found");
        }
        // navigate("/");
      })
      .catch((err) => {
        if (err.response.status === 403) {
          toast.error("Email ou mot de passe incorrect");
        } else {
          toast.error("Une erreur est survenue");
        }
      });
  };
  return (
    <main className="login">
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email :</label>
        <input
          type="email"
          placeholder="Email"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">
          Mot de passe :{" "}
          <img
            src={isShown ? show : notshow}
            alt="un logo d'un oeil ouvert ou fermé selon si vous voulez affichez le mot de passe."
            onClick={() => setIsShown(!isShown)}
            aria-hidden="true"
          />
        </label>
        <input
          type={isShown ? "text" : "password"}
          placeholder="Mot de passe"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">
          Se connecter{" "}
          <img src={connexion} alt="logo qui represente une connexion" />
        </button>
      </form>
      <Link to="/inscription">Pas encore de compte ?</Link>
    </main>
  );
}

export default Login;
