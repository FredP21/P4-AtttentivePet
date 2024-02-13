import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/edit_ad.scss";

function EditAd() {
  const { id } = useParams();
  const [ad, setAd] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:3310/api/announcements/${id}`)
      .then((res) => {
        setAd(res.data);
      })
      .catch((err) => {
        console.info(err);
      });
  }, [id]);
  console.info(ad);

  const handleDescriptionChange = (e) => {
    setAd((prevAd) => ({
      ...prevAd,
      description: e.target.value,
    }));
  };
  const handleStatusChange = (e) => {
    setAd((prevAd) => ({
      ...prevAd,
      status_id: e.target.value,
    }));
  };
  const handlePicChange = (e) => {
    setAd((prevAd) => ({
      ...prevAd,
      image_pet: e.target.value,
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
      phone_number: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .put(`http://localhost:3310/api/announcements/${id}`, {
          imagePet: ad.image_pet,
          description: ad.description,
          city: ad.city,
          phoneNumber: ad.phone_number,
          statusId: ad.status_id,
        })
        .then((res) => {
          console.info(res);
          navigate("/mes-annonces");
        });
    } catch (err) {
      console.info(err);
    }
  };

  return (
    <main className="edit_ad">
      <h1>Modifier votre annonce</h1>
      <form onSubmit={handleSubmit}>
        <span>
          <label htmlFor="image">Image:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={ad.image_pet}
            onChange={handlePicChange}
            required
          />
        </span>
        <span>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={ad.description}
            onChange={handleDescriptionChange}
            required
          />
        </span>
        <span className="label_status">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={ad.status_id}
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
            value={ad.phone_number}
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
        <button type="submit">Modifier</button>
      </form>
    </main>
  );
}

export default EditAd;
