<script>
import axios from "axios";
import PokemonCard from "./PokemonCard.vue";

export default {
  name: "PokemonList",
  components: { PokemonCard },
  props: ["searchQuery", "selectedType"], // Props aus App.vue entgegennehmen
  data() {
    return {
      pokemonList: [],
      filteredPokemon: [],
      nextUrl: "https://pokeapi.co/api/v2/pokemon?limit=20",
      loading: false,
      observer: null,
    };
  },
  watch: {
    // Beobachtet Änderungen an der Suche & Filter
    searchQuery: "filterPokemon",
    selectedType: "filterPokemon",
  },
  mounted() {
    this.fetchPokemon();
    this.createObserver();
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
  },
  methods: {
    async fetchPokemon() {
      if (this.loading) return;
      this.loading = true;
      try {
        const response = await axios.get(this.nextUrl);
        this.nextUrl = response.data.next;
        const newPokemon = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const details = await axios.get(pokemon.url);
            return {
              id: details.data.id,
              name:
                details.data.name.charAt(0).toUpperCase() +
                details.data.name.slice(1),
              weight: details.data.weight,
              height: details.data.height,
              base_experience: details.data.base_experience,
              image:
                details.data.sprites.other["official-artwork"].front_default ||
                "",
              types: details.data.types?.map((t) => t.type.name) || [],
              abilities: details.data.abilities || [],
              stats:
                details.data.stats?.map((s) => ({
                  name: s.stat.name,
                  value: s.base_stat,
                })) || [],
            };
          })
        );
        this.pokemonList.push(...newPokemon);
        this.filterPokemon(); // Nach jedem neuen Laden filtern
      } catch (error) {
        console.error("Fehler beim Laden der Pokémon-Daten:", error);
      } finally {
        this.loading = false;
      }
    },
    filterPokemon() {
      this.filteredPokemon = this.pokemonList.filter((pokemon) => {
        const matchesSearch =
          !this.searchQuery ||
          pokemon.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesType =
          !this.selectedType || pokemon.types.includes(this.selectedType);
        return matchesSearch && matchesType;
      });
    },
    createObserver() {
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      };
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && this.nextUrl && !this.loading) {
            this.fetchPokemon();
          }
        });
      }, options);
      if (this.$refs.sentinel) {
        this.observer.observe(this.$refs.sentinel);
      }
    },
  },
};
</script>

<template>
  <div class="pokemon-container">
    <div class="pokemon-grid">
      <PokemonCard
        v-for="pokemon in filteredPokemon"
        :key="pokemon.id"
        :pokemon="pokemon"
      />
    </div>
    <div ref="sentinel" class="sentinel"></div>
  </div>
</template>

<style scoped>
.pokemon-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  justify-content: center;
  padding: 40px;
  max-width: 1200px;
  width: 100%;
}

.sentinel {
  width: 100%;
  height: 1px;
}
</style>
