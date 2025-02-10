// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import PokemonList from '../components/PokemonList.vue';
import PokemonCard from '../components/PokemonCard.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: PokemonList,
  },
  {
    path: '/pokemon/:id',
    name: 'PokemonCard',
    component: PokemonCard,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
