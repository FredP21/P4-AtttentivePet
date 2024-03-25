import PropTypes from "prop-types";
import { useState } from "react";
import { IoMdTrash } from "react-icons/io";
import "../styles/card_admin.scss";
import ModalAdmin from "./modals/ModalAdmin";

function CardAdmin({ id, a, b, c, handleDelete, string }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <article className="card_admin">
      <span className="id_card">{id}</span>
      <span className="nickname_user">{a}</span>
      <span className="statutOrMail">{b}</span>
      <span className="validationOrRole">{c}</span>
      {c === "Admin" ? null : (
        <IoMdTrash className="icon_admin_card" onClick={() => handleOpen()} />
      )}
      {open && (
        <ModalAdmin
          string={string}
          handleOpen={handleOpen}
          handleDelete={handleDelete}
          id={id}
        />
      )}
    </article>
  );
}

CardAdmin.propTypes = {
  id: PropTypes.number.isRequired,
  a: PropTypes.string.isRequired,
  b: PropTypes.string.isRequired,
  c: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
  string: PropTypes.string.isRequired,
};
export default CardAdmin;
