import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/login.scss";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthContext);
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
          setUser(res.data);
          console.info(res.data);

          navigate("/");
        } else {
          console.error("No user found");
        }
        // navigate("/");
      });
  };
  return (
    <section className="login">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            placeholder="Email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          Mot de passe:
          <input
            type="password"
            placeholder="Mot de passe"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Se connecter</button>
        <Link to="/inscription">Pas encore de compte ?</Link>
      </form>
    </section>
  );
}

export default Login;
