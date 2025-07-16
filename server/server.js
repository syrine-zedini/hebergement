import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js'; 
import productRoutes from './routes/ProductRoutes.js';
import statistiquesRouter from './routes/AdminRouter.js';
import reviewRouter from './routes/reviewRoutes.js';
import panierRoutes from "./routes/panierRoutes.js";
import newsletterRouter from './routes/newsletterRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import stripeRoutes from './routes/stripeRoutes.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Connexion à la base de données
connectDB();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Configuration CORS et sécurité
app.use((req, res, next) => {
  const origin = process.env.CLIENT_URL || 'http://localhost:5173';
  
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Configuration spécifique pour Google Auth
  if (req.path === '/api/auth/google') {
    res.setHeader('Cross-Origin-Opener-Policy', 'unsafe-none');
    res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
  } else {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  }
  
  next();
});

// Routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRoutes);
app.use('/api/review', reviewRouter);
app.use('/api/prod', statistiquesRouter);
app.use("/api/panier", panierRoutes);
app.use('/api/newsletter', newsletterRouter);
app.use('/api/messages', messageRouter);
app.use("/api/stripe", stripeRoutes);

app.get('/', (req, res) => {
  res.send('Server is running');
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});