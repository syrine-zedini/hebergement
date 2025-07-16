import Review from '../models/reviewModel.js';
import userModel from "../models/userModel.js";

// ➕ Ajouter un avis
export const addReview = async (req, res) => {
  try {
    const { userId, productId, rating, comment } = req.body;
    const newReview = new Review({ userId, productId, rating, comment });
    await newReview.save();

    res.status(201).json({
      message: '✅ Avis ajouté avec succès.',
      review: newReview
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// 🔍 Récupérer les avis d'un produit
export const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId }).populate('userId', 'name');

    res.status(200).json({
      message: '📦 Liste des avis récupérée avec succès.',
      reviews
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

