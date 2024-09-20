<template>
  <div>
    <ul>
      <h2>Mes jeux</h2>
      <li v-for="game in games" :key="game._id">
        <strong>{{ game.title }}</strong> - {{ game.genre }}
        <button @click="deleteGame(game._id)">Supprimer</button>
      </li>
    </ul>
  </div>
  <router-link to="/add">Ajouter un Jeu</router-link>
</template>

<script>
export default {
  data() {
    return {
      games: [],
    };
  },
  methods: {
    async fetchGames() {
      try {
        const response = await fetch('http://localhost:3000/games');
        if (!response.ok) {
          throw new Error(`Erreur HTTP ! statut : ${response.status}`);
        }
        const data = await response.json();
        this.games = data;
      } catch (error) {
        console.error('Erreur lors de la récupération des jeux :', error);
      }
    },
    async deleteGame(id) {
      try {
        const response = await fetch(`http://localhost:3000/games/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error(`Erreur HTTP ! statut : ${response.status}`);
        }
        this.fetchGames(); // Asynchrone fetch après la suppression
      } catch (error) {
        console.error('Erreur lors de la suppression du jeu :', error);
      }
    },
  },
  created() {
    this.fetchGames();
  },
};
</script>
