/*
// FUNÇÃO PRA ENCONTRAR UM ÚNICO POKEMON
const fetchPokemon = (paramid) => {
    let id = paramid;
    let getPokemonUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
    fetch(getPokemonUrl)
    .then((response) => response.json())
    .then((pokemon) => console.log(pokemon));
};

fetchPokemon(20);
*/

const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

const fetchPokemon = (start, end) => {
    const pokemonPromises = [];
    for(let i=start; i <= end; i++) {
        pokemonPromises.push(
            fetch(getPokemonUrl(i)).then((response) => response.json())
        )
    };
    Promise.all(pokemonPromises).then((pokemons) => {
        const listPokemons = pokemons.reduce((accumulator, pokemon) => {
            const types = pokemon.types.map((typeInfo) => typeInfo.type.name);
            accumulator += `
                            <li class="card ${types[0]}">
                                <img class="card-image" alt="${pokemon.name}"
                                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png">
                                <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                                <p class="card-subtitle"> ${types.join(" | ")} </p>
                            </li>
                            `;
            return accumulator;
        }, "");

        const ul = document.querySelector('[data="pokedex"]');
        ul.innerHTML = listPokemons;
    });
};

fetchPokemon(1,151);
