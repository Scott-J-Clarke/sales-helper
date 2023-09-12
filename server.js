const express = require('express');
const routes = require('./routes');

// Sequelize connection is imported (it's separated for modularity):
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// Sync Sequelize models (SQL tables) to the database, then turn on the server:
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}!`));
});
