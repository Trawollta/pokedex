<template>
    <div class="pokemon-container">
      <div class="pokemon-grid">
        <PokemonCard
          v-for="pokemon in pokemonList"
          :key="pokemon.id"
          :pokemon="pokemon"
        />
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import PokemonCard from "./PokemonCard.vue";
  
  export default {
    name: "PokemonList",
    components: {
      PokemonCard,
    },
    data() {
      return {
        pokemonList: [],
      };
    },
    async created() {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151");
        const pokemonData = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const details = await axios.get(pokemon.url);
            return {
              id: details.data.id,
              name: details.data.name.charAt(0).toUpperCase() + details.data.name.slice(1),
              weight: details.data.weight,
              height: details.data.height,
              base_experience: details.data.base_experience,
              image: details.data.sprites.other["official-artwork"].front_default,
              types: details.data.types.map((t) => t.type.name),
              abilities: details.data.abilities,
              stats: details.data.stats.map((s) => ({
                name: s.stat.name,
                value: s.base_stat,
              })),
            };
          })
        );
        this.pokemonList = pokemonData;
      } catch (error) {
        console.error("Fehler beim Laden der Pokémon-Daten:", error);
      }
    },
  };
  </script>
  
  <style scoped>
  /* 🌟 Fix für überlappende Karten */
  .pokemon-card-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
  
.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Sorgt für dynamische Anpassung */
  gap: 30px; /* Mehr Abstand zwischen den Karten */
  justify-content: center;
  align-items: start;
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

  /* Sicherstellen, dass die Karten nicht überlappen */
  .pokemon-card {
    flex: 1 1 240px; /* Karten bleiben gleich groß */
    min-width: 240px;
    max-width: 240px;
    height: 340px;
  }
  </style>
  