import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

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

export default function PokemonDetailsPage() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data));
  }, [name]);

  if (!pokemon) {
    return <div className="page-container">Loading...</div>;
  }

  return (
    <div className="page-container">
      {/* Back button */}
      <Link to="/" className="btn btn-outline-secondary btn-sm mb-3">
        ← Back to Pokédex
      </Link>

      {/* Pokémon name */}
      <h3 className="text-center fw-bold text-capitalize mb-4">{pokemon.name}</h3>

      {/* Content Layout */}
      <div className="row align-items-center">
        {/* Left side */}
        <div className="col-12 col-md-5 text-center mb-4 mb-md-0">
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            className="img-fluid"
            style={{ maxWidth: "180px" }}
          />

          {/* Type Badges */}
          <div className="d-flex justify-content-center flex-wrap gap-2 my-2">
            {pokemon.types.map((typeInfo) => (
              <span
                key={typeInfo.type.name}
                className={`badge rounded-pill bg-${getTypeColor(typeInfo.type.name)} px-2 py-1 text-uppercase small`}
              >
                {typeInfo.type.name}
              </span>
            ))}
          </div>

          {/* Height & Weight */}
          <p className="small"><strong>Height:</strong> {(pokemon.height / 10).toFixed(1)} m</p>
          <p className="small"><strong>Weight:</strong> {(pokemon.weight / 10).toFixed(1)} kg</p>

          {/* Abilities */}
          <h6 className="mt-3 mb-2 text-center small">Abilities</h6>
          <div className="d-flex flex-wrap justify-content-center gap-2">
            {pokemon.abilities.map((abilityInfo) => (
              <span
                key={abilityInfo.ability.name}
                className="badge rounded-pill bg-secondary px-2 py-1 text-capitalize small"
              >
                {abilityInfo.ability.name.replace("-", " ")}
              </span>
            ))}
          </div>
        </div>

        {/* Right side (Stats) */}
        <div className="col-12 col-md-7">
          <h5 className="mb-3 small">Stats</h5>
          {pokemon.stats.map((stat) => (
            <div key={stat.stat.name} className="mb-2">
              <div className="d-flex justify-content-between">
                <strong className="text-uppercase small">{stat.stat.name}</strong>
                <span className="small">{stat.base_stat}</span>
              </div>
              <div className="progress" style={{ height: "8px" }}>
                <div
                  className="progress-bar bg-primary"
                  role="progressbar"
                  style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                  aria-valuenow={stat.base_stat}
                  aria-valuemin="0"
                  aria-valuemax="255"
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
