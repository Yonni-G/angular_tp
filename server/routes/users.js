const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');  // Importer la bibliothèque jsonwebtoken
const User = require('../models/user');
require('dotenv').config();  // Pour charger les variables d'environnement

const router = express.Router();

// Clé secrète pour signer les tokens
const JWT_SECRET = process.env.JWT_SECRET || 'votre_clé_secrète'; // Il est important de ne pas exposer cette clé

// Route pour obtenir les infos de profil d'un utilisateur
// Utilisation de ton middleware 'verifyToken' pour vérifier le token avant d'accéder à la route
router.get('/user', verifyToken, async (req, res) => {
  try {
    // Récupère l'utilisateur depuis la base de données en utilisant l'ID de l'utilisateur présent dans 'req.user'
    const user = await User.findById(req.user.userId);  // Assumes that 'userId' is the key from the token payload

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Renvoie les informations de l'utilisateur (ici on retourne 'username' et 'email' comme exemple)
    res.json({
      username: user.username,
      email: user.email,
      // Ajouter d'autres informations que tu souhaites retourner
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});

// Route pour enregistrer un utilisateur
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet utilisateur existe déjà.' });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Utilisateur enregistré avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});

// Route pour la connexion
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Utilisateur introuvable.' });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe incorrect.' });
    }

    // Générer un token JWT
    const token = jwt.sign(
      { userId: user._id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }  // Le token expire après 1 heure
    );

    res.json({ message: 'Connexion réussie', token, username: user.username });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});

// Route protégée (exemple)
router.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'Accès à une route protégée', user: req.user });
});

// Middleware pour vérifier le token JWT
function verifyToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1]; // Extraire le token du header Authorization

  if (!token) {
    return res.status(403).json({ message: 'Token requis' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token invalide ou expiré' });
    }
    req.user = decoded;  // Stocke les informations de l'utilisateur dans la requête
    next();
  });
}

module.exports = router;
