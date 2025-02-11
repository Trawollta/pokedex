<script setup>
import { defineProps } from "vue";

const props = defineProps(["onSearch", "onFilter"]);
</script>

<template>
  <header class="header">
    <h1>Pokédex</h1>

    <!-- Suchfeld -->
    <input 
      type="text" 
      v-model="searchQuery" 
      placeholder="🔍 Suche nach Pokémon..." 
      @input="props.onSearch(searchQuery)" 
    />

    <!-- Dropdown für Typen-Filter -->
    <select v-model="selectedType" @change="props.onFilter(selectedType)">
      <option value="">Alle Typen</option>
      <option v-for="type in pokemonTypes" :key="type" :value="type">
        {{ capitalize(type) }}
      </option>
    </select>
  </header>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      selectedType: "",
      pokemonTypes: [
        "fire", "water", "grass", "electric", "ice", "fighting",
        "poison", "ground", "flying", "psychic", "bug", "rock",
        "ghost", "dragon", "dark", "steel", "fairy", "normal"
      ],
    };
  },
  methods: {
    capitalize(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    },
  },
};
</script>

<style scoped>
/* Header bleibt immer oben fixiert */
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px; /* Feste Höhe */
  background: #222;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000; /* Stellt sicher, dass der Header über allem liegt */
}

/* Platzhalter für den Header, damit der Inhalt nicht hochrutscht */
.spacer {
  height: 80px;
  width: 100%;
}

/* Suchfeld */
input {
  width: 200px;
  height: 40px;
  padding: 8px;
  border-radius: 8px;
  border: none;
  outline: none;
  font-size: 16px;
}

/* Dropdown */
select {
  width: 150px;
  height: 40px;
  padding: 8px;
  border-radius: 8px;
  border: none;
  background: white;
  cursor: pointer;
  font-size: 16px;
}
</style>
