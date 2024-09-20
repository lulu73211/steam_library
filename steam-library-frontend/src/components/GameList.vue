<template>
  <div class="steam-container">
    <h1 class="steam-header">Ma Bibliothèque de Jeux</h1>
    <ul class="game-list">
      <li class="game-item" v-for="game in games" :key="game._id">
        <div class="game-details">
          <strong class="game-title">{{ game.title }}</strong> - <span class="game-genre">{{ game.genre }}</span>
        </div>
        <div class="game-actions">
          <router-link :to="'/edit/' + game._id">
            <button class="steam-button">Modifier</button>
          </router-link>
          <button class="steam-button delete-button" @click="deleteGame(game._id)">Supprimer</button>
        </div>
      </li>
    </ul>

    <router-link to="/add">
      <button class="steam-button add-button">Ajouter un Jeu</button>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      games: []
    };
  },
  created() {
    this.fetchGames();
  },
  methods: {
    async fetchGames() {
      try {
        const response = await fetch('http://localhost:3000/games');
        this.games = await response.json();
      } catch (error) {
        console.error('Erreur lors de la récupération des jeux :', error);
      }
    },
    async deleteGame(id) {
      if (!confirm("Voulez-vous vraiment supprimer ce jeu ?")) {
        return;
      }
      try {
        const response = await fetch(`http://localhost:3000/games/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          this.fetchGames();
        } else {
          console.error('Erreur lors de la suppression du jeu');
        }
      } catch (error) {
        console.error('Erreur lors de la suppression du jeu :', error);
      }
    }
  }
};
</script>

<style scoped>
.steam-container {
  background-color: #1b2838; 
  color: #c7d5e0;
  padding: 20px;
  border-radius: 8px;
  max-width: 800px;
  margin: auto;
}

.steam-header {
  color: #FFFFFF;
  font-size: 2em;
  font-family: 'Roboto', sans-serif;
  margin-bottom: 20px;
}

.game-list {
  list-style-type: none;
  padding: 0;
}

.game-item {
  background-color: #2a475e;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.game-details {
  color: #c7d5e0;
  font-size: 1.2em;
  font-family: 'Roboto', sans-serif;
}

.game-title {
  font-weight: bold;
}

.steam-button {
  background-color: #5c7e10; 
  border: none;
  color: white;
  padding: 10px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
}

.steam-button:hover {
  background-color: #74a52f; 
}

.delete-button {
  background-color: #a83232; 
}

.delete-button:hover {
  background-color: #d9534f; 
}

.add-button {
  display: block;
  width: 100%;
  margin-top: 20px;
  text-align: center;
}
</style>
