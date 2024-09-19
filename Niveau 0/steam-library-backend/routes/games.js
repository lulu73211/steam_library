const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

// ici endpoint pour récupérer et afficher tous les jeux
router.get('/', async (req, res) => {
  try {
    const games = await req.db.collection('games').find().toArray();
    res.json(games);
  } catch (err) {
    console.error('Erreur lors de la récupération des jeux :', err);
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des jeux' });
  }
});

// ici endpoint pour ajouter un jeu
router.post('/', async (req, res) => {
    try {
      const game = req.body;
  
      if (!game.title || !game.genre) {
        return res.status(400).json({ error: 'Les champs "title" et "genre" sont obligatoires.' });
      }
  
      if (game.releaseDate) {
        game.releaseDate = new Date(game.releaseDate);
      }

      const result = await req.db.collection('games').insertOne(game);
  
      game._id = result.insertedId;
  
      res.status(201).json(game);
    } catch (err) {
      console.error('Erreur lors de l\'ajout du jeu :', err);
      res.status(500).json({ error: 'Une erreur est survenue lors de l\'ajout du jeu', details: err.message });
    }
  });


// ici endpoint pour supp d'un jeu
router.delete('/:id', async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    await req.db.collection('games').deleteOne({ _id: id });
    res.status(204).send();
  } catch (err) {
    console.error('Erreur lors de la suppression du jeu :', err);
    res.status(500).json({ error: 'Une erreur est survenue lors de la suppression du jeu' });
  }
});

module.exports = router;
