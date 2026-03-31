const pkmnContainer = document.querySelector(".js-pkmn-render-container");
const pkmnSearchBtn = document.querySelector(".js-pkmn-search-btn");

const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

const getPokemon = async function (requestedPkmn) {
  if (!requestedPkmn) {
    let limit = "?limit=1025";
    let response = await fetch(BASE_URL + limit);
    let pkmnData = await response.json();
    return pkmnData.results;
  } else {
    let response = await fetch(BASE_URL + requestedPkmn);
    let result = await response.json();
    return renderRequest(result);
  }
};

const renderRequest = async function (pkmnData) {
  let html = "";
  console.log(pkmnData);

  html += getPkmnTemplate(pkmnData);
  pkmnContainer.innerHTML = html;
};

const renderPkmn = async function () {
  let data = await getPokemon();
  let html = "";

  for (let i = 0; i <= 20; i++) {
    let pkmnURL = data[i].url;
    let response = await fetch(pkmnURL);
    let result = await response.json();
    html += getPkmnTemplate(result);
  }
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

const init = function () {
  renderPkmn();
};

init();
