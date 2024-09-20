<template>
  <div class="steam-container">
    <h1 class="steam-header">Ajouter un Nouveau Jeu</h1>
    <form @submit.prevent="addGame">
      <div class="form-group">
        <label>Titre du Jeu:</label>
        <input class="steam-input" v-model="title" required />
      </div>
      <div class="form-group">
        <label>Genre:</label>
        <input class="steam-input" v-model="genre" required />
      </div>
      <div class="form-group">
        <label>Description:</label>
        <textarea class="steam-input" v-model="description"></textarea>
      </div>
      <div class="form-group">
        <label>Date de Sortie:</label>
        <input class="steam-input" v-model="releaseDate" type="date" required />
      </div>
      <button type="submit" class="steam-button">Ajouter</button>
      <button type="button" class="steam-button" @click="goBack">Retour</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      genre: '',
      description: '',
      releaseDate: ''
    };
  },
  methods: {
    async addGame() {
      try {
        const newGame = {
          title: this.title,
          genre: this.genre,
          description: this.description,
          releaseDate: this.releaseDate
        };

        const response = await fetch('http://localhost:3000/games', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newGame)
        });

        if (!response.ok) {
          throw new Error(`Erreur lors de l'ajout du jeu : ${response.statusText}`);
        }

        // Redirection vers la liste des jeux après l'ajout
        this.$router.push('/');
      } catch (error) {
        console.error('Erreur lors de l\'ajout du jeu :', error);
      }
    },
    goBack() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
/* Applique le style Steam au formulaire */
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
