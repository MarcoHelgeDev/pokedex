const getPkmnTemplate = function (pkmn) {
  return /*html*/ `
    <div class="pkmn-card">
            <img src="${pkmn.sprites.front_default}" alt="${pkmn.name}">
  <p>N°${pkmn.id}</p>
    <h2>${pkmn.name}</h2>
    <div class="pkmn-type">
      <span class="type-badge ${pkmn.types[0].type.name}">${pkmn.types[0].type.name}</span>
      ${pkmnHasTwoTypes(pkmn)}
    </div>
      
    </div>
  `;
};

const renderPkmnSecondType = function (pkmnSecondType) {
  return /*html*/ `
    <span class="type-badge ${pkmnSecondType}">${pkmnSecondType}</span>
  `;
};

const getNoPokemonFoundTemplate = function () {
  return /*html*/ `
    <p>Kein Pokémon gefunden.</p>
  `;
};
