import { useEffect, useState } from "react";
import Cards from "./Cards";

const Home = () => {
  const [lists, setLists] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLists, setFilteredLists] = useState([]);

  const fetchData = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon');
    const json = await response.json();

    // Fetch details for each Pokémon
    const detailedPokemon = await Promise.all(
      json.results.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        const details = await res.json();
        return {
          name: pokemon.name,
          image: details.sprites.front_default,
          id: details.id,
          types: details.types.map(typeInfo => typeInfo.type.name).join(', '),
          abilities: details.abilities.map(abilityInfo => abilityInfo.ability.name).join(', '),
          height: details.height,
          weight: details.weight,
          baseExperience: details.base_experience,
        };
      })
    );

    setLists(detailedPokemon);
    setFilteredLists(detailedPokemon); // Initialize filtered lists
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    const filtered = lists.filter(pokemon =>
      pokemon.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredLists(filtered);
  };

  return (
    <>
       <div className="flex justify-center mt-4">
        <input 
          className="w-1/3 h-10 border-black border-2 rounded-md p-2"
          type="text"
          placeholder="Search Pokemon..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="flex flex-wrap justify-evenly">
        {filteredLists.map((list) => (
          <Cards key={list.id} info={list} />
        ))}
      </div>
    </>
  );
};

export default Home;
