exports.getAllGames = async (db) => {
    return await db.collection('games').find().toArray();
  };
  
  exports.addGame = async (db, game) => {
    const result = await db.collection('games').insertOne(game);
    return result.ops[0];
  };
  
  exports.deleteGame = async (db, id) => {
    return await db.collection('games').deleteOne({ _id: id });
  };
  