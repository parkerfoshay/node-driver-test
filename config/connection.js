const { MongoClient } = require("mongodb");

// Connection URI
const uri = "mongodb+srv://<username>:<password>@sandbox.zlcqn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// Create a new MongoClient
const client = new MongoClient(uri);

let dbConnection;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db("sample_airbnb");
      console.log("Successfully connected to MongoDB.");

      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },
};