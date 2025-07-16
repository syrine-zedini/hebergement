import axios from "axios";

const API_URL = "http://localhost:8080/api/panier";

export const addToCart = async (produitId, quantite = 1) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(
      `${API_URL}/add`,      // <-- ici 'add' et non 'ajout'
      { produitId, quantite },
      {
        headers: {
          "Content-Type": "application/json",
          "x-token": token,
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout au panier :", error);
    throw new Error("Impossible d’ajouter le produit au panier.");
  }
};
