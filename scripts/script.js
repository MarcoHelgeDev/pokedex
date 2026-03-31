const pkmnContainer = document.querySelector(".js-pkmn-render-container");
const pkmnSearchBtn = document.querySelector(".js-pkmn-search-btn");
const pkmnLoadBtn = document.querySelector(".js-pkmn-load-btn");

const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
let pkmnData = [];
let pkmnCache = {};
let startIndex = 0;
let endIndex = 20;

const getPokemon = async function () {
  let limit = "?limit=1025";
  let response = await fetch(BASE_URL + limit);
  let result = await response.json();
  return result.results;
};

const renderPkmn = async function () {
  startLoadingScreen();
  pkmnLoadBtn.disabled = true;
  let currentEnd = Math.min(pkmnData.length, endIndex);
  let html = "";

  if (startIndex >= pkmnData.length) {
    endLoadingScreen();
    return;
  }

  for (startIndex; startIndex < currentEnd; startIndex++) {
    let pkmnURL = pkmnData[startIndex].url;
    let pokemonData;

    if (pkmnCache[pkmnURL] !== undefined) {
      pokemonData = pkmnCache[pkmnURL];
    } else {
      let response = await fetch(pkmnURL);
      let result = await response.json();
      pkmnCache[pkmnURL] = result;
      pokemonData = result;
    }

    html += getPkmnTemplate(pokemonData);
  }
  pkmnContainer.innerHTML += html;
  endIndex += 20;
  endLoadingScreen();
  if (startIndex >= pkmnData.length) {
    pkmnLoadBtn.disabled = true;
  } else {
    pkmnLoadBtn.disabled = false;
  }
};

const renderRequest = async function (pkmnData) {
  let html = "";
  html += getPkmnTemplate(pkmnData);
  pkmnContainer.innerHTML = html;
};

const pkmnHasTwoTypes = function (pkmn) {
  if (pkmn.types[1]) {
    const pkmnSecondType = pkmn.types[1].type.name;
    return renderPkmnSecondType(pkmnSecondType);
  } else {
    return "";
  }
};

pkmnSearchBtn.addEventListener("click", function () {
  const inputField = document.querySelector(".js-inputField").value;
  if (inputField.trim().length < 3) {
    return;
  }

  if (!inputField) {
    renderPkmn();
  }
  getPokemon(inputField);
});

pkmnLoadBtn.addEventListener("click", renderPkmn);

const startLoadingScreen = function () {
  const spinner = document.querySelector(".js-spinner-container");
  spinner.classList.remove("hidden");
};

const endLoadingScreen = function () {
  const spinner = document.querySelector(".js-spinner-container");
  spinner.classList.add("hidden");
};

const init = async function () {
  pkmnData = await getPokemon();
  await renderPkmn();
};

init();
