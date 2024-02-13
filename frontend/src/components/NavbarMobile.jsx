import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import animperdu from "../assets/animperdu.png";
import animperduA from "../assets/animperduA.png";
import animtrouv from "../assets/animtrouv.png";
import animtrouvA from "../assets/animtrouvA.png";
import home from "../assets/home.png";
import homeA from "../assets/homeA.png";
import profileA from "../assets/info.png";
import profile from "../assets/profile.png";
import { AuthContext } from "../context/AuthContext";
import "../styles/navbar_mobile.scss";

function NavbarMobile() {
  const { user } = useContext(AuthContext);
  const [activeLink, setActiveLink] = useState(0);
  console.info(user);

  const handleActive = (e) => {
    setActiveLink(e);
  };

  const navbar = [
    {
      id: 1,
      link: `/`,
      iconA: `${home}`,
      iconB: `${homeA}`,
      alt: "un logo qui represente une maison",
    },
    {
      id: 2,
      link: `/perdu`,
      iconA: `${animperdu}`,
      iconB: `${animperduA}`,
      alt: "un logo qui represente un chien avec un point d'interrogation",
    },
    {
      id: 3,
      link: `/trouve`,
      iconA: `${animtrouv}`,
      iconB: `${animtrouvA}`,
      alt: "un logo qui represente un chien avec un point d'exclamation",
    },
    {
      id: 4,
      link: `/profil`,
      iconA: `${profile}`,
      iconB: `${profileA}`,
      alt: "un logo qui represente un utilisateur",
    },
  ];

  return (
    <nav className="navbar_mobile">
      {navbar.map((icons) => (
        <ul key={icons.id}>
          <li>
            <Link to={icons.link} onClick={() => handleActive(icons.id)}>
              <img
                src={`${
                  icons.id === activeLink ? `${icons.iconB}` : `${icons.iconA}`
                }`}
                alt="logo for redirect to home"
              />
            </Link>
          </li>
        </ul>
      ))}
    </nav>
  );
}

export default NavbarMobile;
