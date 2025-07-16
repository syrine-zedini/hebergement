import React from "react";
import { addToCart } from "../api/cartService";
import Swal from "sweetalert2";

const ProduitCard = ({ produit }) => {
  const handleAddToCart = async () => {
    try {
      await addToCart(produit._id, 1); // quantité : 1
      Swal.fire({
        icon: "success",
        title: "Ajouté au panier",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: error.message,
      });
    }
  };

  return (
    <div className="p-4 border rounded shadow">
      <h3 className="text-lg font-semibold">{produit.nom}</h3>
      <p>{produit.description}</p>
      <button
        onClick={handleAddToCart}
        className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Ajouter au panier
      </button>
    </div>
  );
};

export default ProduitCard;
