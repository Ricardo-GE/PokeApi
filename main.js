const URL = 'https://pokeapi.co/api/v2/pokemon/';

//Obtener las variables para cada uno de los elementos utilizados
const searchInput = document.getElementById('search');
const pokedexContainer = document.getElementById('pokedex');
const weightCell = document.getElementById('weight');
const typeCell = document.getElementById('type');
const movesCell = document.getElementById('moves');

// Función para mostrar un mensaje de error
function showError(message) {
    pokedexContainer.innerHTML = `<p class="error">${message}</p>`;
}
// Función para restablecer la aplicación
function resetPokedex() {
    pokedexContainer.innerHTML = '';
    searchInput.value = '';
    weightCell.textContent = '';
    typeCell.textContent = '';
    movesCell.textContent = '';
}

// Función para buscar un Pokémon
async function searchPokemon() {
    const searchedPokemon = searchInput.value.toLowerCase(); // Obtener el nombre del Pokémon buscado en minúsculas

    // Verificar si el nombre contiene solo caracteres alfabéticos
    if (!/^[a-zA-Z]+$/.test(searchedPokemon)) 
    {
        showError('Ingresa solo el nombre de un Pokémon, sin números ni caracteres especiales.');
        return;
    }

    try {
        const response = await fetch(URL + searchedPokemon); // Hacer una solicitud a la API para obtener los datos del Pokémon
        if (!response.ok) {
            showError(`No se encontró ningún Pokémon llamado "${searchedPokemon}"`);
            return;
        }

        const data = await response.json(); // Obtener los datos del Pokémon en formato JSON
        const firstType = data.types[0].type.name; // Obtener el primer tipo del Pokémon
        const weight = `${data.weight / 10} Kg`; // Obtener el peso del Pokémon y convertirlo a kilogramos
        const movesCount = data.moves.length; // Obtener la cantidad de movimientos del Pokémon

        // Actualizar las celdas de la tabla con la información del Pokémon
        weightCell.innerText = weight;
        typeCell.innerText = firstType;
        movesCell.innerText = movesCount;

        // Mostrar las imágenes del Pokémon en el contenedor de la Pokédex
        pokedexContainer.innerHTML =
        `    
        <img src="${data.sprites.versions["generation-v"]["black-white"].animated.front_default || pokemon.sprites.front_default}" alt="${data.name}">
        <img src="${data.sprites.versions["generation-v"]["black-white"].animated.front_shiny || pokemon.sprites.front_shiny}" alt="${data.name}">
        `;

    } catch (error) {
        showError('Ha ocurrido un error al buscar el Pokémon');
        console.error(error);
    }
    

}
// Evento para restablecer la Pokédex al hacer clic en el botón de borrar
document.getElementById('reset-button').addEventListener('click', resetPokedex);
// Evento para buscar un Pokémon al hacer clic en el botón de buscar
document.querySelector('button').addEventListener('click', searchPokemon);

// Evento para buscar un Pokémon al presionar la tecla Enter en el campo de búsqueda
searchInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        document.querySelector('button').click();
    }
});