// routes/statistiquesRouter.js
import express from 'express';
import { getProductStatistics } from '../controllers/adminController.js';

const statistiquesRouter = express.Router();

statistiquesRouter.get('/statistiques', getProductStatistics);

export default statistiquesRouter;
