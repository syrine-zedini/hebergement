import express from 'express';
import { addReview, getProductReviews } from '../controllers/reviewController.js';

const reviewRouter = express.Router();

reviewRouter.post('/', addReview); // ➕ Ajouter un avis
reviewRouter.get('/:productId', getProductReviews); // 🔍 Récupérer les avis d’un produit

export default reviewRouter;
