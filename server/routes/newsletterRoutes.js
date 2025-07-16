import express from 'express';
import { subscribeNewsletter } from '../controllers/newsletterController.js';

const router = express.Router();

// Subscribe to newsletter
router.post('/subscribe', subscribeNewsletter);

export default router; 