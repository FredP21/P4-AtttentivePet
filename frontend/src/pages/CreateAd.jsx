import axios from "axios";
import { useContext, useState } from "react";
import ModalC from "../components/modals/ModalC";
import { AuthContext } from "../context/AuthContext";
import "../styles/create_ad.scss";

function CreateAd() {
  const [ad, setAd] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const handleDescriptionChange = (e) => {
    setAd((prevAd) => ({
      ...prevAd,
      desc: e.target.value,
    }));
  };
  const handleStatusChange = (e) => {
    setAd((prevAd) => ({
      ...prevAd,
      statusId: e.target.value,
    }));
  };
  const handlePicChange = (e) => {
    setAd((prevAd) => ({
      ...prevAd,
      image: e.target.value,
    }));
  };
  const handleCityChange = (e) => {
    setAd((prevAd) => ({
      ...prevAd,
      city: e.target.value,
    }));
  };
  const handlePhoneChange = (e) => {
    setAd((prevAd) => ({
      ...prevAd,
      phoneNumber: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.info(ad);
    try {
      axios
        .post(`http://localhost:3310/api/announcements`, {
          ...ad,
          validationId: 1,
          userId: user.id,
        })
        .then(() => {
          console.info("Annonce publié");
          setIsOpen(true);
        });
    } catch (error) {
      console.error("Erreur lors de la publication de l'annonce", error);
    }
  };

  return (
    <main className="create_ad">
      {isOpen ? <ModalC /> : null}
      <h1>Créez votre annonce</h1>
      <form onSubmit={handleSubmit}>
        <span>
          <label htmlFor="image">Image:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={ad.image}
            onChange={handlePicChange}
            required
          />
        </span>
        <span>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={ad.desc}
            onChange={handleDescriptionChange}
            maxLength={250}
            required
          />
        </span>
        <span className="label_status">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={ad.statusId}
            onChange={handleStatusChange}
            required
          >
            <option value="">...</option>
            <option value="2">Perdu</option>
            <option value="1">Trouvé</option>
          </select>
        </span>
        <span className="label_phone">
          <label htmlFor="phone">Contact</label>
          <input
            className="phone_input"
            type="number"
            id="phone"
            name="phone"
            value={ad.phoneNumber}
            onChange={handlePhoneChange}
            required
          />
        </span>
        <span>
          <label htmlFor="city">Ville:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={ad.city}
            onChange={handleCityChange}
            required
          />
        </span>
        <button type="submit">Publier Votre Annonce</button>
      </form>
    </main>
  );
}

export default CreateAd;
