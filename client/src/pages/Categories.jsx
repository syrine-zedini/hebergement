import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../contexts/cartContext";

export default function Categories() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Erreur lors du chargement des produits", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="p-6 bg-white dark:bg-black min-h-screen transition-colors duration-300 text-black dark:text-white">
      <h1 className="text-3xl font-bold mb-6 text-center text-red-600 dark:text-red-400">
        Nos Produits
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="border dark:border-gray-700 p-6 rounded shadow hover:shadow-lg bg-white dark:bg-gray-900 transition-all flex flex-col"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-700 dark:text-gray-300 flex-grow">{product.description}</p>
            <p className="text-red-600 font-bold mt-4 text-lg">{product.price} TND</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-5 bg-red-600 text-white px-5 py-3 rounded hover:bg-red-700 transition"
            >
              Ajouter au panier
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
