import axios from "axios";
import { useEffect, useState } from "react";
import CardAdmin from "../components/CardAdmin";
import "../styles/archives.scss";

function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/users`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.info(err);
      });
  }, []);
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3310/api/users/${id}`).then(() => {
      console.info("Utilisateur supprimé");
      setUsers(users.filter((ad) => ad.id !== id));
    });
  };
  return (
    <main className="archives">
      <h1>Utilisateurs</h1>
      {users.map((ads) => (
        <CardAdmin
          key={ads.id}
          string="cet utilisateur"
          id={ads.id}
          a={ads.nickname}
          b={ads.email}
          c={ads.is_admin === 1 ? "Admin" : "Utilisateur"}
          handleDelete={handleDelete}
        />
      ))}
    </main>
  );
}

export default Users;
