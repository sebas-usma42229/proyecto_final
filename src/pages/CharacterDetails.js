import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMarvelData } from "../ConfigApi";
import Navbar from "../components/Navbar";

const CharacterDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [comics, setComics] = useState([]);
  const [apiInfo, setApiInfo] = useState({});

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await fetchMarvelData(`characters/${id}`);
      setCharacter(response[0]);

      const comicsData = await fetchMarvelData(`characters/${id}/comics`);
      setComics(comicsData);

      setApiInfo({
        status: response.status,
        copyright: response.copyright,
        attributionText: response.attributionText,
        attributionHTML: response.attributionHTML,
      });
    };

    fetchDetails();
  }, [id]);

  const handleComicClick = (comicId) => {
    navigate(`/comic/${comicId}`);
  };

  if (!character) {
    return <p>Cargando detalles del personaje...</p>;
  }

  return (
    <div className="page-background">
      <div className="container">
        {/* Información básica del personaje */}
        <div className="header">
          <div className="image-wrapper">
            <img
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt={character.name}
            />
          </div>
          <div className="character-info">
            <h1>{character.name}</h1>
            <p>
              <strong>Descripción:</strong>{" "}
              {character.description || "No hay descripción disponible."}
            </p>
            <p>
              <strong>Última modificación:</strong>{" "}
              {new Date(character.modified).toLocaleDateString()}
            </p>
            <p>
              <strong>Resource URI:</strong>{" "}
              <a
                href={character.resourceURI}
                target="_blank"
                rel="noopener noreferrer"
              >
                {character.resourceURI}
              </a>
            </p>
          </div>
        </div>

        {/* Información adicional del personaje */}
        <div className="section series">
          <h2>Series</h2>
          <div className="grid">
            {character.series?.items.map((series, index) => (
              <div key={index} className="card">
                {series.name}
              </div>
            ))}
          </div>
        </div>

        <div className="section events">
          <h2>Eventos</h2>
          <div className="grid">
            {character.events?.items.map((event, index) => (
              <div key={index} className="card">
                {event.name}
              </div>
            ))}
          </div>
        </div>

        {/* Cómics del personaje */}
        <div className="section comics">
          <h2>Cómics</h2>
          <div className="comics-grid">
            {comics.map((comic) => (
              <div
                key={comic.id}
                className="comic-card"
                onClick={() => handleComicClick(comic.id)}
              >
                <img
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt={comic.title}
                />
                <p>{comic.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Información de la API */}
        <div className="section api-info">
          <h2>Información de la API</h2>
          <p>
            <strong>Estado:</strong> {apiInfo.status || "Desconocido"}
          </p>
          <p>
            <strong>Copyright:</strong> {apiInfo.copyright || "No disponible"}
          </p>
          <p>
            <strong>Atribución:</strong> {apiInfo.attributionText || "No disponible"}
          </p>
          <div
            dangerouslySetInnerHTML={{ __html: apiInfo.attributionHTML || "" }}
          />
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
