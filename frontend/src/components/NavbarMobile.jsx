import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import animperdu from "../assets/animperdu.png";
import animperduA from "../assets/animperduA.png";
import animtrouv from "../assets/animtrouv.png";
import animtrouvA from "../assets/animtrouvA.png";
import archives from "../assets/archives.png";
import archivesA from "../assets/archivesA.png";
import home from "../assets/home.png";
import homeA from "../assets/homeA.png";
import logout from "../assets/logoutAd.png";
import profile from "../assets/profile.png";
import profileA from "../assets/profileA.png";
import users from "../assets/users.png";
import usersA from "../assets/usersA.png";
import waiting from "../assets/waiting.png";
import waitingA from "../assets/waitingA.png";
import { AuthContext } from "../context/AuthContext";
import "../styles/navbar_mobile.scss";

function NavbarMobile() {
  const { user, handleDelog } = useContext(AuthContext);
  const [activeLink, setActiveLink] = useState(0);
  const navigate = useNavigate();
  console.info(user);

  const handleActive = (e) => {
    setActiveLink(e);
  };

  const navbarAdmin = [
    {
      id: 1,
      link: `/en-attente`,
      iconA: `${waiting}`,
      iconB: `${waitingA}`,
      alt: "un logo qui represente un sablier",
    },
    {
      id: 2,
      link: `/archives`,
      iconA: `${archives}`,
      iconB: `${archivesA}`,
      alt: "un logo qui represente un dossier",
    },
    {
      id: 3,
      link: `/utilisateurs`,
      iconA: `${users}`,
      iconB: `${usersA}`,
      alt: "un logo qui represente des utilisateurs",
    },
    {
      id: 4,
      link: "#",
      iconA: `${logout}`,
      iconB: `${logout}`,
      alt: "un logo qui represente une maison",
      element: true,
    },
  ];

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
      {user?.is_admin === 1
        ? navbarAdmin.map((icons) => (
            <ul key={icons.id}>
              <li>
                <Link
                  to={icons.link}
                  onClick={
                    icons.element
                      ? () => handleDelog(navigate)
                      : () => handleActive(icons.id)
                  }
                >
                  <img
                    src={icons.id === activeLink ? icons.iconB : icons.iconA}
                    alt="logo for redirect to home"
                  />
                </Link>
              </li>
            </ul>
          ))
        : navbar.map((icons) => (
            <ul className="user_nav" key={icons.id}>
              <li>
                <Link to={icons.link} onClick={() => handleActive(icons.id)}>
                  <img
                    src={icons.id === activeLink ? icons.iconB : icons.iconA}
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
