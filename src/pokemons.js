const getPokemons = (pokemons) => {
  return pokemons.reduce((acc, pokemon) => ({ ...acc, [pokemon.id]: { ...pokemon } }), {});
};

export default getPokemons;
