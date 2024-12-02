import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMarvelData } from "../ConfigApi";
import styled from "styled-components";

const ComicDetails = () => {
  const { comicId } = useParams();
  const [comic, setComic] = useState(null);

  useEffect(() => {
    const fetchComicDetails = async () => {
      const [data] = await fetchMarvelData(`comics/${comicId}`);
      setComic(data);
    };

    fetchComicDetails();
  }, [comicId]);

  if (!comic) {
    return <p>Cargando detalles del cómic...</p>;
  }

  return (
    <ComicContainer>
      <h1>{comic.title}</h1>
      <ComicImage
        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
        alt={comic.title}
      />
      <ComicInfo>
        <p>
          <strong>Descripción:</strong>{" "}
          {comic.description || "No hay descripción disponible."}
        </p>
        <p>
          <strong>Formato:</strong> {comic.format || "No especificado"}
        </p>
        <p>
          <strong>Páginas:</strong> {comic.pageCount || "No disponible"}
        </p>
        <p>
          <strong>Precio:</strong> ${comic.prices[0]?.price || "N/A"}
        </p>
        <p>
          <strong>Fecha de publicación:</strong>{" "}
          {comic.dates[0]?.date.split("T")[0] || "No disponible"}
        </p>
      </ComicInfo>

      <Section>
        <h2>Imágenes Adicionales</h2>
        {comic.images.length > 0 ? (
          <ImagesGrid>
            {comic.images.map((image, index) => (
              <img
                key={index}
                src={`${image.path}.${image.extension}`}
                alt={`Imagen ${index + 1}`}
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  marginBottom: "10px",
                }}
              />
            ))}
          </ImagesGrid>
        ) : (
          <p>No hay imágenes adicionales disponibles para este cómic.</p>
        )}
      </Section>
    </ComicContainer>
  );
};

const ComicContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const ComicImage = styled.img`
  width: 100%;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const ComicInfo = styled.div`
  margin-bottom: 30px;
  p {
    margin: 10px 0;
    line-height: 1.6;
  }
`;

const Section = styled.div`
  margin-bottom: 30px;
  h2 {
    font-size: 24px;
    margin-bottom: 10px;
  }
`;

const ImagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

export default ComicDetails;
