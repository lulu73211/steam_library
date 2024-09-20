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

// ici endpoint pour modifier un jeu
router.put('/:id', async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      console.error('ID non valide :', req.params.id);
      return res.status(400).send({ message: 'ID non valide' });
    }

    const updatedGame = await req.db.collection('games').findOneAndUpdate(
      { _id: new ObjectId(req.params.id) }, 
      { $set: req.body },                    
      { returnOriginal: false }
    );

    if (!updatedGame.value) {
      console.error('Jeu non trouvé pour l\'ID :', req.params.id);
      return res.status(404).send({ message: 'Jeu non trouvé' });
    }

    // Log de la réponse si tout est OK
    console.log('Jeu modifié avec succès :', updatedGame.value);

    res.status(200).send(updatedGame.value);
  } catch (error) {
    console.error('Erreur lors de la modification du jeu :', error);
    res.status(500).send({ message: 'Erreur lors de la modification du jeu', error: error.message });
  }
});



// ici endpoint pour récupérer un jeu via son ID
router.get('/:id', async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ message: 'ID non valide' });
    }

    const game = await req.db.collection('games').findOne({ _id: new ObjectId(req.params.id) });

    if (!game) {
      return res.status(404).send({ message: 'Jeu non trouvé' });
    }
    res.status(200).json(game);
  } catch (error) {
    console.error('Erreur lors de la récupération du jeu :', error);
    res.status(500).send({
      message: 'Erreur lors de la récupération du jeu',
      error: error.message || error
    });
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

    // Utiliser req.db pour insérer le nouveau jeu
    const result = await req.db.collection('games').insertOne(game);

    game._id = result.insertedId;

    res.status(201).json(game);
  } catch (err) {
    console.error('Erreur lors de l\'ajout du jeu :', err);
    res.status(500).json({ error: 'Une erreur est survenue lors de l\'ajout du jeu', details: err.message });
  }
});

// ici endpoint pour supprimer un jeu
router.delete('/:id', async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ message: 'ID non valide' });
    }

    const id = new ObjectId(req.params.id);

    await req.db.collection('games').deleteOne({ _id: id });
    res.status(204).send();
  } catch (err) {
    console.error('Erreur lors de la suppression du jeu :', err);
    res.status(500).json({ error: 'Une erreur est survenue lors de la suppression du jeu' });
  }
});

module.exports = router;
