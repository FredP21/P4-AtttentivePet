import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/create_ad.scss";

function CreateAd() {
  const [ad, setAd] = useState({});
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
      image: e.target.files[0],
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
    const formData = new FormData();
    Object.keys(ad).forEach((key) => {
      if (key === "image") {
        formData.append(key, ad[key], ad[key].name);
      } else {
        formData.append(key, ad[key]);
      }
    });
    formData.append("validationId", 1);
    formData.append("userId", user.id);

    axios
      .post(`http://localhost:3310/api/announcements`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        console.info("Votre annonce a bien été publiée");
      })
      .catch(() => {
        console.error("Erreur lors de la publication de votre annonce");
      });
  };

  return (
    <main className="create_ad">
      <h1>Créez votre annonce</h1>
      <form onSubmit={handleSubmit}>
        <span>
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept=".jpeg, .jpg, .png, .webp "
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
            minLength={10}
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
