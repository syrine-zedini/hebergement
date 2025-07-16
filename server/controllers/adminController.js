// controllers/statistiquesController.js
import Produit from '../models/productModel.js';

// Fonction pour récupérer les statistiques produits
export const getProductStatistics = async (req, res) => {
  try {
    const totalProduits = await Produit.countDocuments();
    const produitsEnStock = await Produit.countDocuments({ stock: { $gt: 0 } });
    const produits = await Produit.find({ stock: { $gt: 0 } });

    const valeurStock = produits.reduce((acc, p) => acc + p.prix * p.stock, 0);

    res.json({
      totalProduits,
      produitsEnStock,
      valeurStock,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
