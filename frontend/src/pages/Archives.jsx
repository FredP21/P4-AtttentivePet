import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CardAdmin from "../components/CardAdmin";
import "../styles/archives.scss";

function Archives() {
  const [archives, setArchives] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/announcements`)
      .then((res) => {
        setArchives(res.data);
      })
      .catch((err) => {
        console.info(err);
      });
  }, []);
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3310/api/announcements/${id}`).then(() => {
      toast.info("Annonce supprimé");
      setArchives(archives.filter((ad) => ad.id !== id));
    });
  };
  return (
    <main className="archives">
      <h1>Archives</h1>
      {archives.map((ads) => (
        <CardAdmin
          key={ads.id}
          string="cette annonce"
          id={ads.id}
          a={ads.nickname}
          b={ads.statutAd}
          c={ads.validationAd}
          handleDelete={handleDelete}
        />
      ))}
    </main>
  );
}

export default Archives;
