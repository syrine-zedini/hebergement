import express from "express";
import Stripe from "stripe";
import auth from "../middleware/userAuth.js";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ⚠️ taux de conversion à ajuster selon le marché
const TND_TO_EUR = 0.3; // Exemple : 1 TND = 0.3 €

router.post("/create-checkout-session", auth, async (req, res) => {
  const items = req.body.items;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: items.map((item) => ({
        price_data: {
          currency: "eur", // ✅ Devise cible = euro
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * TND_TO_EUR * 100), // ✅ Convertir vers EUR puis en centimes
        },
        quantity: item.quantite,
      })),
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Erreur Stripe :", error);
    res.status(500).json({ error: "Erreur Stripe" });
  }
});

export default router;
