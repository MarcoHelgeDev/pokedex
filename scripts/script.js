const pkmnContainer = document.querySelector(".js-pkmn-render-container");
const pkmnSearchBtn = document.querySelector(".js-pkmn-search-btn");
const pkmnResetBtn = document.querySelector(".js-pkmn-reset-btn");
const pkmnLoadBtn = document.querySelector(".js-pkmn-load-btn");
const pkmnInput = document.querySelector(".js-inputField");

const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
let pkmnData = [];
let pkmnCache = {};
let startIndex = 0;
let endIndex = 20;
pkmnResetBtn.disabled = true;

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
    let pokemonData = await getPokemonDetails(pkmnURL);
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

const renderRequest = function (pkmnData) {
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

const updateSearchButtonState = function () {
  if (pkmnInput.value.trim().length >= 3) {
    pkmnSearchBtn.disabled = false;
  } else {
    pkmnSearchBtn.disabled = true;
  }
};

pkmnInput.addEventListener("input", function () {
  updateSearchButtonState();
});

const getPokemonDetails = async function (pkmnURL) {
  if (pkmnCache[pkmnURL] !== undefined) {
    return pkmnCache[pkmnURL];
  } else {
    let response = await fetch(pkmnURL);
    let result = await response.json();
    pkmnCache[pkmnURL] = result;
    return result;
  }
};

const searchPokemon = async function () {
  let pkmnSearchValue = pkmnInput.value.trim().toLowerCase();
  let foundPokemon = [];

  for (let i = 0; i < pkmnData.length; i++) {
    if (pkmnData[i].name.includes(pkmnSearchValue)) {
      foundPokemon.push(pkmnData[i]);
    }
  }

  pkmnLoadBtn.disabled = true;

  if (foundPokemon.length === 0) {
    pkmnContainer.innerHTML = getNoPokemonFoundTemplate();
  } else {
    let html = "";

    for (let i = 0; i < foundPokemon.length; i++) {
      let pkmnURL = foundPokemon[i].url;
      let pokemonData = await getPokemonDetails(pkmnURL);
      html += getPkmnTemplate(pokemonData);
    }

    pkmnContainer.innerHTML = html;
  }
};

pkmnSearchBtn.addEventListener("click", async function () {
  startLoadingScreen();
  pkmnSearchBtn.disabled = true;
  pkmnResetBtn.disabled = false;

  await searchPokemon();

  endLoadingScreen();

  updateSearchButtonState();
});

const resetPkmnList = async function () {
  startIndex = 0;
  endIndex = 20;
  pkmnLoadBtn.disabled = false;
  pkmnContainer.innerHTML = "";
  pkmnInput.value = "";
  pkmnResetBtn.disabled = true;

  updateSearchButtonState();
  await renderPkmn();
};

pkmnResetBtn.addEventListener("click", resetPkmnList);

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
  console.log(pkmnData);
  await renderPkmn();
};

init();
