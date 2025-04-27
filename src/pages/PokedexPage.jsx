import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function getTypeColor(type) {
  const colors = {
    fire: "danger",
    water: "primary",
    grass: "success",
    electric: "warning",
    bug: "success",
    poison: "pink",
    flying: "info",
    normal: "secondary",
    ground: "warning",
    psychic: "danger",
    rock: "secondary",
    ice: "info",
    dragon: "dark",
    dark: "dark",
    ghost: "secondary",
    fairy: "pink",
    fighting: "danger",
  };
  return colors[type] || "secondary";
}

export default function PokedexPage() {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 20;

  useEffect(() => {
    async function fetchPokemons() {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
      const data = await response.json();

      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          const detail = await res.json();
          return {
            name: pokemon.name,
            id: detail.id,
            type: detail.types[0].type.name,
          };
        })
      );

      setPokemons(detailedPokemons);
    }

    fetchPokemons();
  }, [offset]);

  function handleNext() {
    setOffset(prev => prev + limit);
  }

  function handlePrevious() {
    if (offset > 0) {
      setOffset(prev => prev - limit);
    }
  }

  return (
    <div className="page-container">
      <h3 className="text-center fw-bold mb-4">Welcome to Pokédex!</h3>

      <div className="row g-3">
        {pokemons.map((pokemon) => {
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;

          return (
            <div className="col-6 col-md-4 col-lg-2-4" key={pokemon.id}>
              <Link to={`/pokemon/${pokemon.name}`} className="text-decoration-none text-dark">
              <div 
                className={`card h-100 text-center bg-${getTypeColor(pokemon.type)} text-white hover-effect`}
                style={{ transition: "0.2s", padding: "8px" }}
              >
                  <img 
                    src={imageUrl} 
                    className="card-img-top mx-auto"
                    alt={pokemon.name}
                    style={{ width: "85px", height: "85px" }}
                  />
                  <div className="card-body py-1">
                    <h6 className="text-muted small mb-1">#{pokemon.id}</h6>
                    <h6 className="card-title text-capitalize small">{pokemon.name}</h6>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Pagination Buttons */}
      <div className="d-flex justify-content-center gap-2 mt-3">
        <button onClick={handlePrevious} className="btn btn-outline-primary btn-sm" disabled={offset === 0}>
          Previous
        </button>
        <button onClick={handleNext} className="btn btn-primary btn-sm">
          Next
        </button>
      </div>
    </div>
  );
}
