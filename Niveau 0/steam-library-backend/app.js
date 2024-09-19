const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

let db;

// Co mongodb steamlibrary via fct asynchrone
async function connectDB() {
  try {
    await client.connect();
    db = client.db('steamLibrary');
    console.log('Connecté à MongoDB');
  } catch (err) {
    console.error('Erreur lors de lma connexion à MongoDB', err);
  }
}

connectDB();

app.use(cors());
app.use(express.json());

// Middleware pour insert requete dans steamLibrary
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Import des routes
const gamesRouter = require('./routes/games');
app.use('/games', gamesRouter);

app.listen(3000, () => {
  console.log('Le serveur est en cours d\'exécution sur le port 3000');
});
