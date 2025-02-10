<template>
    <div class="pokemon-card-container" @click="toggleFlip">
        <div 
  class="pokemon-card"
  :class="{ flipped: isFlipped }"
  :style="{ '--type-color': getTypeColor(pokemon.types[0]) }"
>
        <!-- Vorderseite -->
        <div class="card-front">
          <div class="card-header">
            <span>#{{ formatId(pokemon.id) }}</span>
            <span class="type-dot" :style="{ backgroundColor: getTypeColor(pokemon.types[0]) }"></span>
          </div>
  
          <div class="card-image">
            <img :src="pokemon.image" :alt="pokemon.name" />
          </div>
  
          <h2 class="pokemon-name">{{ pokemon.name }}</h2>
  
          <div class="pokemon-stats">
            <p><span>Weight:</span> {{ pokemon.weight / 10 }} kg</p>
            <p><span>Height:</span> {{ pokemon.height / 10 }} m</p>
            <p><span>Type:</span> {{ formatTypes(pokemon.types) }}</p>
          </div>
        </div>
  
        <!-- Rückseite -->
        <div class="card-back">
          <h2>{{ pokemon.name }} Details</h2>
          <p><strong>Base Experience:</strong> {{ pokemon.base_experience }}</p>
          <p><strong>Abilities:</strong> {{ formatAbilities(pokemon.abilities) }}</p>
          <p><strong>Stats:</strong></p>
          <ul>
            <li v-for="stat in pokemon.stats" :key="stat.name">
              {{ capitalize(stat.name) }}: {{ stat.value }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  export default {
    name: "PokemonCard",
    props: {
      pokemon: Object,
    },
    data() {
      return {
        isFlipped: false,
      };
    },
    methods: {
      toggleFlip() {
        this.isFlipped = !this.isFlipped;
      },
      formatId(id) {
        return id.toString().padStart(3, "0");
      },
      formatTypes(types) {
        return types.map((t) => t.charAt(0).toUpperCase() + t.slice(1)).join(" / ");
      },
      formatAbilities(abilities) {
        return abilities.map((a) => a.ability.name.charAt(0).toUpperCase() + a.ability.name.slice(1)).join(", ");
      },
      capitalize(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      },
      getTypeColor(type) {
        const colors = {
          fire: "#FD7D24",
          water: "#4592C4",
          grass: "#9BCC50",
          electric: "#EED535",
          ice: "#51C4E7",
          fighting: "#D56723",
          poison: "#B97FC9",
          ground: "#AB9842",
          flying: "#3DC7EF",
          psychic: "#F366B9",
          bug: "#729F3F",
          rock: "#A38C21",
          ghost: "#7B62A3",
          dragon: "#F16E57",
          dark: "#707070",
          steel: "#9EB7B8",
          fairy: "#FDB9E9",
          normal: "#A8A878",
        };
        return colors[type] || "#ccc";
      },
    },
  };
  </script>
  
  <style scoped>
  /* Sicherstellen, dass jede Karte die gleiche Größe hat */
  .pokemon-card-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  /* Karten-Design */
  .pokemon-card {
    width: 250px;
    height: 360px; /* Feste Höhe für alle Karten */
    background: linear-gradient(135deg, #1e1e1e, #292929);
    border-radius: 16px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    border: 2px solid transparent;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    padding: 20px;
    transition: transform 0.3s ease-in-out;
  }
  
  /* Border-Farbe je nach Pokémon-Typ */
  .pokemon-card {
    border: 2px solid var(--type-color);
  }
  
  /* Hover-Effekt */
  .pokemon-card:hover {
    transform: scale(1.05);
  }
  
  /* Pokémon Bild */
  .card-image {
    width: 120px;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .card-image img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
  
  /* Pokémon Name */
  .pokemon-name {
    font-size: 20px;
    font-weight: bold;
    color: white;
    margin: 10px 0;
  }
  
  /* ID & Typen Punkt */
  .card-header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 14px;
    color: #fff;
  }
  
  /* Farbpunkt für Pokémon-Typ */
  .type-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: var(--type-color);
  }
  
  /* Statistiken */
  .pokemon-stats {
    font-size: 14px;
    color: white;
  }
  
  .pokemon-stats p {
    margin: 4px 0;
  }
  
  .pokemon-stats span {
    font-weight: bold;
    color: #ccc;
  }
  </style>
  


  