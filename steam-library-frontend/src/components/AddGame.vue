<template>
    <div>
      <h1>Ajouter un Nouveau Jeu</h1>
      <form @submit.prevent="addGame">
        <div>
          <label>Titre du Jeu:</label>
          <input v-model="title" required />
        </div>
        <div>
          <label>Genre:</label>
          <input v-model="genre" required />
        </div>
        <div>
          <label>Description:</label>
          <textarea v-model="description"></textarea>
        </div>
        <div>
          <label>Date de Sortie:</label>
          <input v-model="releaseDate" type="date" required />
        </div>
        <button type="submit">Ajouter</button>
      </form>

      <router-link to="/">Retour</router-link>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        title: '',
        genre: '',
        description: '',
        releaseDate: '',
      };
    },
    methods: {
      async addGame() {
        try {
          const response = await fetch('http://localhost:3000/games', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: this.title,
              genre: this.genre,
              description: this.description,
              releaseDate: this.releaseDate,
            }),
          });
          if (!response.ok) {
            throw new Error(`Erreur HTTP ! statut : ${response.status}`);
          }
          this.$router.push('/');
        } catch (error) {
          console.error('Erreur lors de l\'ajout du jeu :', error);
        }
      },
    },
  };
  </script>
  