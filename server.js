const express = require('express');

const routes = require('./controllers');
const db = require('./config/connection')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// perform a database connection when the server starts
db.connectToServer(function (err) {
    if (err) {
      console.error(err);
      process.exit();
    }
  
    // start the Express server
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  });