import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Button from "../components/Button";
import CardFind from "../components/CardFind";
import { AuthContext } from "../context/AuthContext";
import "../styles/pet_page.scss";

function PetLost() {
  const { isAuthenticated } = useContext(AuthContext);
  const [announcement, setAnnouncement] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

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

  const filteredAnnouncements = announcement.filter(
    (announce) =>
      announce.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announce.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="main_announcement">
      <p>
        <span>{announcement.length}</span>
        {announcement.length <= 1
          ? " annonce pour les animaux trouvés"
          : " annonces pour les animaux trouvés"}
      </p>
      {isAuthenticated ? (
        <Button link="/creer-annonce" title="Creez votre annonce" />
      ) : null}

      <input
        type="text"
        placeholder="Recherche..."
        onChange={handleSearchChange}
      />

      <section className="announcement">
        {filteredAnnouncements.length > 0 ? (
          <CardFind announcement={filteredAnnouncements} />
        ) : (
          <p>Aucun résultat trouvé</p>
        )}
      </section>
    </main>
  );
}

export default PetLost;
