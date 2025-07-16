import express from "express";
import auth from "../middleware/userAuth.js"; 
import Panier from "../models/panierModel.js";
import Product from "../models/productModel.js";  // important !

const router = express.Router();

// 🟢 Récupérer le panier
router.get("/", auth, async (req, res) => {
  try {
    const utilisateurId = req.userId;
    let panier = await Panier.findOne({ utilisateur: utilisateurId }).populate("items.produit");
    if (!panier) return res.status(200).json({ success: true, items: [] });
    res.status(200).json({ success: true, items: panier.items });
  } catch (error) {
    console.error("Erreur GET /api/panier :", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// 🟢 Ajouter ou incrémenter un produit
router.post("/add", auth, async (req, res) => {
  try {
    const utilisateurId = req.userId;
    const { produitId, quantite = 1 } = req.body;

    if (!produitId) {
      return res.status(400).json({ message: "produitId manquant" });
    }

    let panier = await Panier.findOne({ utilisateur: utilisateurId });
    if (!panier) {
      panier = new Panier({ utilisateur: utilisateurId, items: [] });
    }

    const index = panier.items.findIndex(
      (item) => item.produit.toString() === produitId
    );

    if (index !== -1) {
      panier.items[index].quantite += quantite;
    } else {
      panier.items.push({ produit: produitId, quantite });
    }

    await panier.save();
    await panier.populate("items.produit");

    res.status(200).json({ message: "Produit ajouté au panier", items: panier.items });
  } catch (error) {
    console.error("Erreur POST /api/panier/add :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});
// 🔴 Vider complètement le panier
router.delete("/vider", auth, async (req, res) => {
  try {
    const utilisateurId = req.userId;
    const panier = await Panier.findOne({ utilisateur: utilisateurId });

    if (!panier) {
      return res.status(404).json({ message: "Panier non trouvé" });
    }

    panier.items = []; // Supprimer tous les produits
    await panier.save();

    res.status(200).json({ success: true, items: [] });
  } catch (error) {
    console.error("Erreur DELETE /api/panier/vider :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Exemple : DELETE /api/panier/:productId
router.delete("/:productId", auth, async (req, res) => {
  const userId = req.userId;
  const { productId } = req.params;

  try {
    const panier = await Panier.findOneAndUpdate(
      { utilisateur: userId },
      { $pull: { items: { produit: productId } } },
      { new: true }
    );

    if (!panier) {
      return res.status(404).json({ message: "Panier non trouvé." });
    }

    res.status(200).json({ success: true, panier });
  } catch (err) {
    console.error("Erreur suppression produit :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});




// 🔴 ➕ Route manquante ajoutée : décrémenter un produit
router.post("/decrement", auth, async (req, res) => {
  try {
    const utilisateurId = req.userId;
    const { produitId } = req.body;

    if (!produitId) {
      return res.status(400).json({ message: "produitId manquant" });
    }

    let panier = await Panier.findOne({ utilisateur: utilisateurId });
    if (!panier) {
      return res.status(404).json({ message: "Panier non trouvé" });
    }

    const index = panier.items.findIndex(
      (item) => item.produit.toString() === produitId
    );

    if (index === -1) {
      return res.status(404).json({ message: "Produit non trouvé dans le panier" });
    }

    panier.items[index].quantite -= 1;

    if (panier.items[index].quantite <= 0) {
      panier.items.splice(index, 1); // Supprimer le produit si quantité = 0
    }

    await panier.save();
    await panier.populate("items.produit");

    res.status(200).json({ message: "Quantité décrémentée", items: panier.items });
  } catch (error) {
    console.error("Erreur POST /api/panier/decrement :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});



// Route pour fusionner le panier invité avec le panier utilisateur connecté
router.post("/merge", auth, async (req, res) => {
  try {
    const utilisateurId = req.userId;
    const guestItems = req.body.items;

    if (!Array.isArray(guestItems)) {
      return res.status(400).json({ message: "Format invalide pour les items" });
    }

    let panier = await Panier.findOne({ utilisateur: utilisateurId });

    if (!panier) {
      panier = new Panier({ utilisateur: utilisateurId, items: [] });
    }

    // Fusion des items : addition des quantités si produit existe déjà
    guestItems.forEach((guestItem) => {
      const index = panier.items.findIndex(
        (item) => item.produit.toString() === guestItem._id
      );
      if (index !== -1) {
        panier.items[index].quantite += guestItem.quantite;
      } else {
        panier.items.push({
          produit: guestItem._id,
          quantite: guestItem.quantite,
        });
      }
    });

    await panier.save();
    await panier.populate("items.produit");

    res.status(200).json({ message: "Panier fusionné avec succès", items: panier.items });
  } catch (error) {
    console.error("Erreur POST /api/panier/merge :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

export default router;
