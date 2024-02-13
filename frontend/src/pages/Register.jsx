import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
          navigate("/login");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };
  return (
    <section className="register">
      <h1>Inscription</h1>
      <form onSubmit={handleSubmitRegister}>
        <label htmlFor="nickname">
          Pseudo:
          <input
            type="name"
            name="nickname"
            id="nickname"
            placeholder="Pseudo"
            autoComplete="nickname"
            onChange={handleChangeRegister}
            value={registerInfo.nickname}
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={handleChangeRegister}
            value={registerInfo.email}
          />
        </label>
        <label htmlFor="password">
          Mot de passe:
          <input
            type={isShown ? "text" : "password"}
            name="password"
            id="password"
            placeholder="********"
            autoComplete="off"
            value={registerInfo.password}
            onChange={handleChangeRegister}
          />
        </label>
        <label htmlFor="confirmPassword">
          Confirmer le mot de passe:
          <input
            type={isShown ? "text" : "password"}
            name="confirmPassword"
            id="confirmPassword"
            placeholder="********"
            autoComplete="off"
            value={registerInfo.confirmPassword}
            onChange={handleChangeRegister}
          />
        </label>
        <label htmlFor="checkbox">Montrer le mot de passe</label>
        <input type="checkbox" onChange={() => setIsShown(!isShown)} />
        <button type="submit">S'inscrire</button>
      </form>
    </section>
  );
}

export default Register;
