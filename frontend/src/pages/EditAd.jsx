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
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/announcements/${id}`)
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
      image_pet: e.target.files[0],
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
    const formData = new FormData();
    formData.append("image", ad.image_pet);
    formData.append("description", ad.description);
    formData.append("statusId", ad.status_id);
    formData.append("city", ad.city);
    formData.append("phoneNumber", ad.phone_number);
    formData.append("validationId", 1);
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/announcements/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.info(res);
        navigate("/mes-annonces");
      })
      .catch((err) => {
        console.info(err);
      });
  };

  return (
    <main className="edit_ad">
      <h1>Modifier votre annonce</h1>
      <form onSubmit={handleSubmit}>
        <span>
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept=".jpeg, .jpg, .png, .webp"
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
            maxLength={250}
            minLength={10}
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
