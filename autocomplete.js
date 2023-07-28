// Array para almacenar los nombres de los Pokémon
const pokemonNames = [];

// Obtener los nombres de los Pokémon a través de solicitud
fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')
  .then(response => response.json())
  .then(data => {
    pokemonNames.push(...data.results.map(pokemon => pokemon.name));
    initializeAutocomplete();
  })
  .catch(error => {
    console.log(error);
  });

// Función para inicializar el autocompletado
function initializeAutocomplete() {

  // Obtener referencias a los elementos del DOM
  const searchInput = document.getElementById('search');
  const autocompleteList = document.getElementById('autocomplete-list');
 
  // Agregar un evento de escucha al input de búsqueda
  searchInput.addEventListener('input', handleAutocomplete);

  // Función para manejar el autocompletado
  function handleAutocomplete() {
    const input = searchInput.value.toLowerCase().trim();
    const autocompleteResults = getAutocompleteResults(input);

    // Limpiar la lista de autocompletado si el input está vacío
    if (input === '') {
      autocompleteList.innerHTML = '';
      return;
    }
    // Mostrar los resultados de autocompletado si hay coincidencias
    if (autocompleteResults.length > 0) {
      const autocompleteHTML = autocompleteResults
        .map(result => `<div>${result}</div>`)
        .join('');
      autocompleteList.innerHTML = autocompleteHTML;
    } else {
      autocompleteList.innerHTML = '';
    }
  }
  // Función para obtener los resultados de autocompletado
  function getAutocompleteResults(input) {
    return pokemonNames.filter(name => name.startsWith(input));
  }
  // Agregar un evento de escucha al hacer clic en la lista de autocompletado
  autocompleteList.addEventListener('click', event => {
    if (event.target.nodeName === 'DIV') {
      searchInput.value = event.target.textContent;
      autocompleteList.innerHTML = '';
    }
  });
}
