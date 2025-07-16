import React from "react";
import { useCart } from "../contexts/temp";

const ProduitCard = ({ produit }) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(produit);
  };

  return (
    <div className="p-4 border rounded shadow flex flex-col">
      <h3 className="text-lg font-semibold">{produit.nom}</h3>
      <p className="flex-grow">{produit.description}</p>
      <button
        onClick={handleAddToCart}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Ajouter au panier
      </button>
    </div>
  );
};

export default ProduitCard;
