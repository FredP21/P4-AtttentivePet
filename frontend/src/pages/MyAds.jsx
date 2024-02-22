import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Button from "../components/Button";
import CardAds from "../components/CardAds";
import { AuthContext } from "../context/AuthContext";
import "../styles/my_ads.scss";

function MyAds() {
  const { user } = useContext(AuthContext);
  const [ads, setAds] = useState([]);
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3310/api/announcements/${id}`).then(() => {
      console.info("Annonce supprimé");
      setAds(ads.filter((ad) => ad.id !== id));
    });
  };
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/api/announcements/user/${user.id}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setAds(res.data);
      });
  }, [user.id]);
  return (
    <main className="my_ads">
      <h2>Mes annonces</h2>
      <Button link="/creer-annonce" title="Creez votre annonce" />
      <section className="card_container">
        {ads.map((ad) => (
          <CardAds
            key={ad.id}
            id={ad.id}
            image={ad.image_pet}
            validation={ad.validation_id}
            status={ad.status_id}
            city={ad.city}
            phone={ad.phone_number}
            handleDelete={handleDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default MyAds;
