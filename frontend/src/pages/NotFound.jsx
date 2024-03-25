import Button from "../components/Button";
import "../styles/notFound.scss";

function NotFound() {
  return (
    <main className="not_found">
      <h1>404</h1>
      <p>
        Désolé, il semble qu'une erreur s'est produite ou alors cette page
        n'éxiste plus
      </p>
      <Button link="/" title="Retour à l'acceuil" />
    </main>
  );
}

export default NotFound;
