require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à MongoDB Atlas

mongoose.connect(process.env.MONGO_URI) // Supprime les options obsolètes
  .then(() => console.log("Connecté à MongoDB Atlas"))
  .catch(err => console.error("Erreur de connexion MongoDB :", err));


const usersRoutes = require('./routes/users');
app.use('/users', usersRoutes);


app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
