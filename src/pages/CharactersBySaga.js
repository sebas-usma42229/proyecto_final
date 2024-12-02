import React, { useEffect, useState } from "react";
import { fetchMarvelData } from "../ConfigApi";
import { useNavigate } from "react-router-dom";
import "../App.css";


// Sagas seleccionadas y sus personajes destacados
const sagas = {
  Avengers: ["Iron Man", "Captain America", "Thor", "Hulk", "Black Widow"],
  "X-Men": ["Wolverine", "Cyclops", "Jean Grey", "Storm", "Magneto"],
  "Fantastic Four": ["Mr. Fantastic", "Invisible Woman", "Human Torch", "The Thing"],
  "Guardians of the Galaxy": ["Star-Lord", "Gamora", "Rocket Raccoon", "Groot"],
  "Defenders": ["Daredevil", "Jessica Jones", "Luke Cage", "Iron Fist"],
  "Inhumans": ["Black Bolt", "Medusa", "Crystal", "Karnak"],
  Eternals: ["Ikaris", "Thena", "Sersi", "Kingo"],
  "Young Avengers": ["Wiccan", "Hulkling", "Kate Bishop", "Speed"],
  "Dark Avengers": ["Norman Osborn", "Bullseye", "Venom"],
  "Thunderbolts": ["Red Hulk", "Ghost", "Taskmaster"],
  "Runaways": ["Nico Minoru", "Karolina Dean", "Chase Stein"],
  "Midnight Sons": ["Blade", "Moon Knight", "Ghost Rider"],
  "Alpha Flight": ["Guardian", "Northstar", "Snowbird"],
  "X-Force": ["Cable", "Domino", "Deadpool"],
};

const CharactersBySaga = () => {
  const [charactersBySaga, setCharactersBySaga] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSelectedCharacters = async () => {
      const sagaResults = {};
      const totalLimit = 30; // Limitar a 30 personajes
      let totalCount = 0;

      for (const saga in sagas) {
        if (totalCount >= totalLimit) break; // Detener si ya alcanzamos el límite

        const promises = sagas[saga].map((name) =>
          fetchMarvelData("characters", { name })
        );
        const results = await Promise.all(promises);

        const filteredResults = results.flat().slice(0, totalLimit - totalCount);
        sagaResults[saga] = filteredResults;
        totalCount += filteredResults.length;
      }

      setCharactersBySaga(sagaResults);
      setLoading(false);
    };

    fetchSelectedCharacters();
  }, []);

  const handleInvestigateClick = (id) => {
    navigate(`/character/${id}`);
  };

  if (loading) {
    return (
      <>
        
        <p className="loading-message">Cargando personajes...</p>
      </>
    );
  }

  return (
    <>
      
      <div className="page-background">
        <div className="banner">
          <img src="/banner.jpg" alt="Marvel Banner" className="banner-image" />
        </div>
        <div className="container">
          <h1 className="page-title">SUPER HEROES DE MARVEL</h1>
          {Object.entries(charactersBySaga).map(([saga, characters]) => (
            <div key={saga}>
              <h2 className="saga-title">{saga}</h2>
              <div className="cards-container">
                {characters.map((character) => (
                  <div key={character.id} className="saga-card">
                    <img
                      src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                      alt={character.name}
                      className="saga-card-image"
                    />
                    <p className="saga-card-title">{character.name}</p>
                    <button
                      className="saga-card-button"
                      onClick={() => handleInvestigateClick(character.id)}
                    >
                      Investigar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CharactersBySaga;
