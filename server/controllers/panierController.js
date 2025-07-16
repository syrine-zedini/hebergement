import Panier from "../models/panierModel.js";

// POST /api/panier/ajout
export const ajouterAuPanier = async (req, res) => {
  const { produitId, quantite } = req.body;
  const userId = req.user.id; // récupéré via le middleware d'authentification

  try {
    let panier = await Panier.findOne({ utilisateur: userId });

    if (!panier) {
      panier = new Panier({ utilisateur: userId, items: [] });
    }

    const index = panier.items.findIndex(item => item.produit.toString() === produitId);

    if (index > -1) {
      panier.items[index].quantite += quantite;
    } else {
      panier.items.push({ produit: produitId, quantite });
    }

    await panier.save();
    res.status(200).json(panier);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// GET /api/panier
export const getPanier = async (req, res) => {
  const userId = req.user.id;

  try {
    const panier = await Panier.findOne({ utilisateur: userId }).populate("items.produit");
    if (!panier) return res.status(404).json({ message: "Panier vide" });

    res.status(200).json(panier);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// DELETE /api/panier/:produitId
export const supprimerProduit = async (req, res) => {
  const userId = req.user.id;
  const { produitId } = req.params;

  try {
    const panier = await Panier.findOne({ utilisateur: userId });

    if (!panier) return res.status(404).json({ message: "Panier introuvable" });

    panier.items = panier.items.filter(item => item.produit.toString() !== produitId);
    await panier.save();

    res.status(200).json(panier);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};
