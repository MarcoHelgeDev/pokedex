const getPkmnTemplate = function (pkmn) {
  return /*html*/ `
    <div  data-id="${pkmn.id}" class="pkmn-card" style="background:${pkmnTypeBackground(pkmn)}">
            <img src="${pkmn.sprites.front_default}" alt="${pkmn.name}">
            <div class="pkmn-card-info">
  <p>N°${pkmn.id}</p>
    <h2>${pkmn.name}</h2>
    <div class="pkmn-type">
      <span class="type-badge ${pkmn.types[0].type.name}">${pkmn.types[0].type.name}</span>
      ${pkmnHasTwoTypes(pkmn)}
    </div>
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

const getPkmnDetailTemplate = function (pkmn) {
  return /*html*/ `
  <div class="pkmn-detail-card">
    <div  data-id="${pkmn.id}" class="pkmn-card" style="background:${pkmnTypeBackground(pkmn)}">
            <img src="${pkmn.sprites.front_default}" alt="${pkmn.name}">
            <div class="pkmn-card-info">
     <p>N°${pkmn.id}</p>
    <h2>${pkmn.name}</h2>
    <div class="pkmn-type">
      <span class="type-badge ${pkmn.types[0].type.name}">${pkmn.types[0].type.name}</span>
      ${pkmnHasTwoTypes(pkmn)}
    </div>
          <h3>Pokedex Entry</h3>

</div>
  `;
};
