import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CardFind from "../components/CardFind";
import "../styles/waiting_ads.scss";

function WaitingAds() {
  const [waitingAds, setWaitingAds] = useState([]);
  const status = 1;
  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/announcements/statement/${status}`
      )
      .then((res) => {
        setWaitingAds(res.data);
      });
  }, []);
  const handleUpdateGood = (id) => {
    axios
      .put(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/announcements/validation/${id}`,
        {
          validationId: 2,
        }
      )
      .then(() => {
        setWaitingAds(waitingAds.filter((ad) => ad.id !== id));
        toast.info("Annonce validée");
      });
  };
  const handleUpdateWrong = (id) => {
    axios
      .put(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/announcements/validation/${id}`,
        {
          validationId: 3,
        }
      )
      .then(() => {
        setWaitingAds(waitingAds.filter((ad) => ad.id !== id));
        toast.info("Annonce refusée");
      });
  };

  return (
    <main className="waitingAds">
      <h1>Annonces en attente</h1>
      <section>
        <CardFind
          announcement={waitingAds}
          handleUpdateGood={handleUpdateGood}
          handleUpdateWrong={handleUpdateWrong}
        />
      </section>
    </main>
  );
}

export default WaitingAds;
