import { createRouter, createWebHistory } from 'vue-router';
import GameList from '../components/GameList.vue';
import AddGame from '../components/AddGame.vue';

const routes = [
  {
    path: '/',               // Route racine, affiche la liste des jeux
    name: 'GameList',
    component: GameList
  },
  {
    path: '/add',            // Route pour ajouter un jeu
    name: 'AddGame',
    component: AddGame
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
