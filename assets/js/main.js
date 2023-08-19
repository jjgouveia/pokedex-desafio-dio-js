const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')


const maxRecords = 151
const limit = 12
let offset = 0;

function convertPokemonToLi (pokemon) {
    return `
        <li id="${pokemon.name}" class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}"
                     title="Click to see details">
            </div>

        </li>
    `
}

function loadPokemonItens (offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function getPokemonDetails (pokemon) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    const pokemonDetail = fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody)
    return `

    `

}

async function exibirDetalhesDoPokemon (pokemonName) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    try {
        const response = await fetch(url);
        const pokemon = await response.json();

        const modal = document.getElementById('modal');
        const detalhesPokemon = document.getElementById('detalhes-pokemon');

        detalhesPokemon.innerHTML = `
            <h2>${pokemon.name}</h2>
            <img style="width: 100px" src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
            <p><strong>Número:</strong> ${pokemon.id}</p>
            <p><strong>Tipo:</strong> ${pokemon.types[0].type.name}</p>
            <p><strong>Experiência base:</strong> ${pokemon.base_experience}</p>
            <p><strong>Altura:</strong> ${pokemon.height}</p>
            <p><strong>Peso:</strong> ${pokemon.weight}</p>
            <p><strong>Habilidades:</strong> ${pokemon.abilities[0].ability.name}</p>
        `;

        modal.style.display = 'block';

        modal.addEventListener('click', fecharModal);

        function fecharModal (event) {
            if (event.target === modal) {
                modal.style.display = 'none';
                modal.removeEventListener('click', fecharModal);
            }
        }
    } catch (error) {
        console.error('Ocorreu um erro:', error);
    }
}

pokemonList.addEventListener('click', (event) => {
    exibirDetalhesDoPokemon(event.target.alt);
});




