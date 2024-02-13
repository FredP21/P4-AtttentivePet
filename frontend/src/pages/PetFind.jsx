import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardFind from "../components/CardFind";
import { AuthContext } from "../context/AuthContext";
import "../styles/pet_page.scss";

function PetFind() {
  const { isAuthenticated } = useContext(AuthContext);
  const [announcement, setAnnouncement] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3310/api/announcements/statusandvalidation/1")
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
          ? `${announcement.length} annonce pour les animaux trouvés`
          : `${announcement.length} annonces pour les animaux trouvés`}
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

export default PetFind;
