import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardFind from "../components/CardFind";
import { AuthContext } from "../context/AuthContext";
import "../styles/pet_page.scss";

function PetLost() {
  const [announcement, setAnnouncement] = useState([]);
  const { isAuthenticated } = useContext(AuthContext);
  useEffect(() => {
    axios
      .get("http://localhost:3310/api/announcements/statusandvalidation/2")
      .then((res) => {
        setAnnouncement(res.data);
      })
      .catch((err) => {
        console.info(err);
      });
  }, []);
  return (
    <main className="main_announcement">
      <h2 className="head_pet">
        {announcement.length <= 1
          ? `${announcement.length} annonce pour les animaux perdus`
          : `${announcement.length} annonces pour les animaux perdus`}
      </h2>
      <Link to="/creer-annonce">
        {isAuthenticated ? (
          <button type="button"> Créez votre annonce</button>
        ) : null}
      </Link>
      <section className="announcement">
        <CardFind announcement={announcement} />
      </section>
    </main>
  );
}

export default PetLost;
