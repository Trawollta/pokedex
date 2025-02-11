<template>
    <div>
      <div v-if="isExpanded" class="overlay" @click="toggleExpand"></div>
  
      <div 
        class="pokemon-card-container"
        :class="{ expanded: isExpanded }"
        @click="toggleExpand"
      >
        <div 
          class="pokemon-card"
          :class="{ flipped: isFlipped, expanded: isExpanded, rotating: isRotating }"
          :style="{ '--type-color': getTypeColor(pokemon.types[0]) }"
          @click.stop="toggleFlip"
        >
          <!-- Vorderseite -->
          <div class="card-front" v-if="!isFlipped">
            <div class="card-header">
              <span class="pokemon-id">#{{ formatId(pokemon.id) }}</span>
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
          <div class="card-back" v-if="isFlipped">
            <h2 class="pokemon-name">{{ pokemon.name }}</h2>
  
            <div class="stats-section">
              <div v-for="stat in pokemon.stats" :key="stat.name" class="stat-bar">
                <span class="stat-name">{{ capitalize(stat.name) }}</span>
                <div class="progress-bar">
                  <div class="progress-fill" :style="{ width: stat.value + '%', backgroundColor: getTypeColor(pokemon.types[0]) }"></div>
                </div>
                <span class="stat-value">{{ stat.value }}</span>
              </div>
            </div>
  
            <p class="description">
              Based on this Pokémon's stats, we consider the best nature for 
              <strong>{{ pokemon.name }}</strong> to have is 
              <span class="nature">Sassy</span>, which increases its 
              <strong>Sp. Def</strong> and decreases its <strong>Speed</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  

  <script>
  export default {
    name: "PokemonCard",
    props: {
      pokemon: Object
    },
    data() {
      return {
        isFlipped: false,
        isExpanded: false
      };
    },
    methods: {
      toggleFlip(event) {
        this.isFlipped = !this.isFlipped;
        event.stopPropagation();
      },
      toggleExpand() {
        this.isExpanded = !this.isExpanded;
        if (!this.isExpanded) this.isFlipped = false;
      },
      formatId(id) {
        return id.toString().padStart(3, "0");
      },
      formatTypes(types) {
        return types.map((t) => t.charAt(0).toUpperCase() + t.slice(1)).join(" / ");
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
          normal: "#A8A878"
        };
        return colors[type] || "#ccc";
      }
    }
  };
  </script>
  
  <style scoped>
  /* Hintergrund-Overlay für Blur-Effekt */
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(8px);
    z-index: 9;
  }
  
  /* Container */
  .pokemon-card-container {
    perspective: 1000px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  /* Standard-Karten-Design */
  .pokemon-card {
    width: 270px;
    height: 400px;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.6s ease-in-out, box-shadow 0.3s ease;
    border-radius: 20px;
    border: 3px solid var(--type-color);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
  
  /* Dreh-Animation (einmalige 360°-Rotation) */
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  /* Wenn die Klasse rotating aktiv ist, wird die Animation abgespielt
     (Hinweis: Falls du bereits transformierende Klassen wie .flipped oder .expanded nutzt,
      kann es nötig sein, den transform-Wert in der Animation anzupassen oder die Animation in einen Wrapper zu packen.) */
  .pokemon-card.rotating {
    animation: spin 0.6s ease-in-out;
    /* Zusätzlich: Hervorhebung via Box-Shadow */
    box-shadow: 0 0 20px 5px var(--type-color);
  }
  
  /* Flip-Effekt */
  .pokemon-card.flipped {
    transform: rotateY(180deg);
  }
  
  /* Vergrößerte Karte */
  .pokemon-card.expanded {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 320px;
  height: 460px;
  transform: translate(-50%, -50%) scale(1.2);
  z-index: 1000; /* Erhöht den z-Index */
}
  
  /* Vorder- und Rückseite */
  .card-front,
  .card-back {
    width: 100%;
    height: 100%;
    position: absolute;
    backface-visibility: hidden;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  
  /* Vorderseite */
  .card-front {
    background: linear-gradient(135deg, #1e1e1e, #292929);
    color: white;
  }
  
  /* Rückseite */
  .card-back {
    background: #141414;
    color: white;
    transform: rotateY(180deg);
    box-shadow: inset 0px 0px 10px rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  
  /* Pokémon-ID */
  .pokemon-id {
    font-weight: bold;
    color: white;
    font-size: 14px;
  }
  
  /* Typ-Punkt */
  .type-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: var(--type-color);
  }
  
  /* Pokémon Bild */
  .card-image img {
    width: 140px;
    height: auto;
  }
  
  /* Pokémon Name */
  .pokemon-name {
    font-size: 22px;
    font-weight: bold;
    margin: 10px 0;
  }
  
  /* Stats-Bereich */
  .stats-section {
    width: 100%;
    margin-top: 10px;
  }
  
  /* Einzelne Stat-Bar */
  .stat-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    margin-bottom: 6px;
  }
  
  /* Progress Bar */
  .progress-bar {
    flex-grow: 1;
    height: 8px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    margin: 0 8px;
  }
  
  /* Fortschritt in der Progress Bar */
  .progress-fill {
    height: 100%;
    border-radius: 4px;
    transition: width 0.4s ease-in-out;
  }
  
  /* Beschreibung */
  .description {
    font-size: 12px;
    margin-top: 15px;
    color: rgba(255, 255, 255, 0.7);
  }
  </style>
  
  