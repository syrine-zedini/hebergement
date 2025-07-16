import React, { useEffect, useState } from "react";
import axios from "axios";
import ProduitCard from "../components/ProduitCard";

const ListeProduits = () => {
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    const fetchProduits = async () => {
      const res = await axios.get("http://localhost:8080/api/produits"); // adapte ton endpoint
      setProduits(res.data);
    };
    fetchProduits();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {produits.map((produit) => (
        <ProduitCard key={produit._id} produit={produit} />
      ))}
    </div>
  );
};

export default ListeProduits;
