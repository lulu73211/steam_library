import { createRouter, createWebHistory } from 'vue-router';
import GameList from '../components/GameList.vue';
import AddGame from '../components/AddGame.vue';
import EditGame from '../components/EditGame.vue';


const routes = [
  {
    path: '/',  
    name: 'GameList',
    component: GameList
  },
  {
    path: '/add',     
    name: 'AddGame',
    component: AddGame
  },
  {
    path: '/edit/:id', 
    name: 'EditGame',
    component: EditGame
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
