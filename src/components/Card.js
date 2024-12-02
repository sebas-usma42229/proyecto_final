import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"; // Los estilos avanzados están aquí

const Card = ({ id, name, image }) => {
  const navigate = useNavigate();

  const handleInvestigateClick = () => {
    navigate(`/character/${id}`);
  };

  return (
    <div className="card">
      <img src={image} alt={name} className="card-image" />
      <p className="heading">{name}</p>
      <button className="investigate-button" onClick={handleInvestigateClick}>
        Investigar
      </button>
    </div>
  );
};

export default Card;
