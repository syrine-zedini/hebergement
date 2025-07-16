import express from 'express';
import { Message } from '../models/Message.js'; // Import modifié
import { getAIResponse } from '../controllers/aiControlller.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Middleware pour extraire userId du token
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Accès non autorisé' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalide', error: error.message });
  }
};

// Route unique POST qui gère à la fois l'enregistrement et la réponse AI
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { content, sender = 'user' } = req.body;
    
    if (!content) {
      return res.status(400).json({ message: 'Le contenu du message est requis' });
    }

    // Enregistrement du message utilisateur
    const userMessage = new Message({ 
      content, 
      sender, 
      userId: req.userId 
    });
    await userMessage.save();

    // Réponse AI seulement si c'est un message utilisateur
    let aiMessage = null;
    if (sender === 'user') {
      const aiResponse = await getAIResponse(content);
      
      aiMessage = new Message({
        content: aiResponse,
        sender: 'ai',
        userId: req.userId
      });
      await aiMessage.save();
    }

    res.status(201).json({
      success: true,
      userMessage,
      aiMessage
    });

  } catch (error) {
    console.error('Erreur complète:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur du serveur',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Récupérer les messages de l'utilisateur connecté
router.get('/', authenticateToken, async (req, res) => {
  try {
    const messages = await Message.find({ userId: req.userId })
                               .sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur serveur', 
      error: error.message 
    });
  }
});

export default router;