<script setup>
import { ref } from "vue";
import Header from "./components/header.vue";
import PokemonList from "./components/PokemonList.vue";

const searchQuery = ref("");
const selectedType = ref("");

// Methode zur Aktualisierung der Suchanfrage
const handleSearch = (query) => {
  searchQuery.value = query.toLowerCase();
};

// Methode zur Aktualisierung des Filter-Typs
const handleFilter = (type) => {
  selectedType.value = type;
};
</script>

<template>
  <div id="app">
    <!-- ✅ Übergabe der Funktionen an Header -->
    <Header :onSearch="handleSearch" :onFilter="handleFilter" />
    <div class="spacer"></div> <!-- Platzhalter, damit der Inhalt nicht unter den Header rutscht -->
    <PokemonList :searchQuery="searchQuery" :selectedType="selectedType" />
  </div>
</template>



<style scoped>
/* Header Styling */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #222;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  min-height: 80px; /* Feste Mindesthöhe setzen */
  height: 80px; /* Feste Höhe */
}

/* Sicherstellen, dass alle Elemente die gleiche Höhe haben */
input,
select {
  height: 40px; /* Feste Höhe für die Input-Elemente */
  font-size: 16px; /* Einheitliche Schriftgröße */
}

/* Optional: Falls flex für die Größenanpassung verantwortlich ist */
.header > * {
  flex-shrink: 0; /* Verhindert, dass Elemente kleiner werden */
}
</style>


