import { useContext } from "react";
import home from "../assets/altHome.jpg";
import logo from "../assets/logoAP.webp";
import { AuthContext } from "../context/AuthContext";
import "../styles/home.scss";

function Home() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <main className="home">
      <h1>Bienvenue sur AttentivePet</h1>
      <img
        src={logo}
        alt="logo qui représente l'embleme du siteweb"
        className="logo"
      />
      <h2>Retrouvons nos compagnons à quatre pattes !</h2>
      <p>
        Perdre son animal de compagnie est une expérience déchirante, mais
        ensemble, nous pouvons faire la différence. AttentivePet est votre
        plateforme dédiée pour partager des annonces d'animaux perdus ou
        trouvés, reliant les propriétaires aimants et les âmes généreuses qui
        croisent le chemin de nos amis à poils.
      </p>

      <h3>Comment ça marche?</h3>
      <h4>Recherchez des animaux perdus ou trouvés</h4>
      {/* <p>
        <span>Filtrez vos résultats:</span> Utilisez nos filtres pour trouver
        des annonces spécifiques à votre région.
      </p> */}
      <p>
        <span>Contactez:</span> Si vous pensez avoir trouvé l'animal recherché,
        contactez le propriétaire via son numéro de téléphone.
      </p>
      <p>
        <span>Aidez:</span> Si vous avez perdu votre animal, soyez attentif aux
        annonces et contactez les personnes qui ont peut-être trouvé votre
        compagnon.
      </p>
      <h4>Annoncez un animal perdu ou trouvé</h4>
      <p>
        <span>Créez un compte:</span> Inscrivez-vous gratuitement pour
        commencer.
      </p>
      <p>
        <span>Annoncez:</span> Remplissez notre formulaire simple et rapide pour
        partager les détails importants.
      </p>
      <p>
        <span>Photo:</span> Ajoutez une photo pour rendre votre annonce plus
        percutante.
      </p>
      <h3>Pourquoi choisir AttentivePet?</h3>
      <p>
        <span>Gratuit:</span> Notre plateforme est entièrement gratuite pour
        encourager la solidarité et l'entraide.
      </p>
      <p>
        <span>Étendue nationale:</span> Que vous soyez à Paris, Lyon, Marseille
        ou n'importe où en France, notre plateforme vous connecte avec des
        personnes près de chez vous.
      </p>
      <h3>
        Rejoignez-nous dès maintenant et faisons en sorte que nos amis
        retrouvent leur chemin ensemble.
      </h3>
      <picture>
        <img
          src={home}
          alt="deux chiens et deux chats ensemble sur un fond rose"
          className="home_img"
        />
      </picture>
      {isAuthenticated ? null : <button type="button">s'inscrire</button>}
    </main>
  );
}

export default Home;
