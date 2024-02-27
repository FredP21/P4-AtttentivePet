import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import notshow from "../assets/notshow.png";
import show from "../assets/show.png";
import "../styles/login.scss";

function Register() {
  const [isShown, setIsShown] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    nickname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const handleChangeRegister = (e) => {
    setRegisterInfo({ ...registerInfo, [e.target.name]: e.target.value });
  };
  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    const { nickname, email, password, confirmPassword } = registerInfo;
    if (registerInfo.password !== registerInfo.confirmPassword) {
      return;
    }
    if (nickname && email && password && confirmPassword) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/register`,
          { nickname, email, password }
        );
        if (response.status === 201) {
          navigate("/connexion");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };
  return (
    <main className="register">
      <h1>Inscription</h1>
      <form onSubmit={handleSubmitRegister}>
        <label htmlFor="nickname">Pseudo :</label>
        <input
          type="name"
          name="nickname"
          id="nickname"
          placeholder="Pseudo"
          autoComplete="nickname"
          onChange={handleChangeRegister}
          value={registerInfo.nickname}
          required
        />
        <label htmlFor="email">Email :</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={handleChangeRegister}
          value={registerInfo.email}
          required
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
          name="password"
          id="password"
          placeholder="********"
          autoComplete="off"
          value={registerInfo.password}
          onChange={handleChangeRegister}
          required
        />
        <label htmlFor="confirmPassword">
          Confirmer le mot de passe :{" "}
          <img
            src={isShown ? show : notshow}
            alt="un logo d'un oeil ouvert ou fermé selon si vous voulez affichez le mot de passe."
            onClick={() => setIsShown(!isShown)}
            aria-hidden="true"
          />
        </label>
        <input
          type={isShown ? "text" : "password"}
          name="confirmPassword"
          id="confirmPassword"
          placeholder="********"
          autoComplete="off"
          value={registerInfo.confirmPassword}
          onChange={handleChangeRegister}
          required
        />
        <button type="submit">S'inscrire</button>
      </form>
      <Link to="/connexion">Vous avez déjà un compte ?</Link>
    </main>
  );
}

export default Register;
