const Cards = ({ info }) => {
    const { name, image, types, abilities, height, weight, baseExperience } = info;
  
    return (
      <div className="w-64 border-2 border-black rounded-lg flex flex-col items-center justify-center m-4 p-4">
        <img src={image} alt={name} className="border-b-2 mb-2" />
        <p className="font-bold text-center">{name}</p>
        <p className="text-sm text-center"><span className="font-semibold">Type: </span> {types}</p>
        <p className="text-sm text-center"><span className="font-semibold">Abilities: </span> {abilities}</p>
        <p className="text-sm text-center"><span className="font-semibold">Height: </span> {height}</p>
        <p className="text-sm text-center"><span className="font-semibold">Weight: </span> {weight}</p>
        <p className="text-sm text-center"><span className="font-semibold">Base XP: </span> {baseExperience}</p>
      </div>
    );
  };
  
  export default Cards;
  