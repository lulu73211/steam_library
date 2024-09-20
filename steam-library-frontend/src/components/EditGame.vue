<template>
    <div class="steam-container">
      <h1 class="steam-header">Modifier un Jeu</h1>
      <form @submit.prevent="updateGame">
        <div class="form-group">
          <label>Titre du Jeu:</label>
          <input class="steam-input" v-model="game.title" required />
        </div>
        <div class="form-group">
          <label>Genre:</label>
          <input class="steam-input" v-model="game.genre" required />
        </div>
        <div class="form-group">
          <label>Description:</label>
          <textarea class="steam-input" v-model="game.description"></textarea>
        </div>
        <div class="form-group">
          <label>Date de Sortie:</label>
          <input class="steam-input" v-model="game.releaseDate" type="date" required />
        </div>
        <button type="submit" class="steam-button">Modifier</button>
        <button type="button" class="steam-button" @click="goBack">Retour</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        game: {
          title: '',
          genre: '',
          description: '',
          releaseDate: ''
        }
      };
    },
    created() {
      this.fetchGame();
    },
    methods: {
      async fetchGame() {
        try {
          const response = await fetch(`http://localhost:3000/games/${this.$route.params.id}`);
          this.game = await response.json();
          this.game.releaseDate = this.game.releaseDate.slice(0, 10);
        } catch (error) {
          console.error('Erreur lors de la récupération du jeu :', error);
        }
      },
      async updateGame() {
        try {
          const response = await fetch(`http://localhost:3000/games/${this.$route.params.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.game)
          });
          if (!response.ok) {
            throw new Error(`Erreur lors de la modification du jeu : ${response.statusText}`);
          }
          this.$router.push('/');
        } catch (error) {
          console.error('Erreur lors de la modification du jeu :', error);
        }
      },
      goBack() {
        this.$router.push('/');
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
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .steam-input {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #c7d5e0;
    border-radius: 4px;
    background-color: #2a475e;
    color: white;
    font-family: 'Roboto', sans-serif;
  }
  
  .steam-button {
    background-color: #5c7e10;
    border: none;
    color: white;
    padding: 10px 15px;
    text-align: center;
    display: inline-block;
    font-size: 16px;
    border-radius: 4px;
    cursor: pointer;
    font-family: 'Roboto', sans-serif;
  }
  
  .steam-button:hover {
    background-color: #74a52f;
  }
  
  button + button {
    margin-left: 10px;
  }
  </style>
  