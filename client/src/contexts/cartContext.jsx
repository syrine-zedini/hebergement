import { createContext, useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import Swal from "sweetalert2";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { isAuthenticated } = useAuth();

  const wasAuthenticated = useRef(isAuthenticated);

  // *** Nouvel état pour animation d'ajout ***
  const [isAdding, setIsAdding] = useState(false);

  // Fonction pour récupérer/fusionner panier local + serveur
  const fetchCart = async () => {
    if (!isAuthenticated) {
      // Pas connecté → charger panier local
      const localCart = JSON.parse(localStorage.getItem("guest_cart")) || [];
      setCartItems(localCart);
      return;
    }

    try {
      // Connecté → fusion panier local + récupérer panier serveur
      const localCart = JSON.parse(localStorage.getItem("guest_cart")) || [];
      if (localCart.length > 0) {
        await axios.post(
          "http://localhost:8080/api/panier/merge",
          { items: localCart },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        localStorage.removeItem("guest_cart");
      }

      const res = await axios.get("http://localhost:8080/api/panier", {
        withCredentials: true,
      });
      setCartItems(res.data.items || []);
    } catch (error) {
      console.error("Erreur chargement/fusion panier :", error);
      setCartItems([]);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [isAuthenticated]);

  // Détecter déconnexion pour charger panier local
  useEffect(() => {
    if (wasAuthenticated.current && !isAuthenticated) {
      const localCart = JSON.parse(localStorage.getItem("guest_cart")) || [];
      setCartItems(localCart);
    }
    wasAuthenticated.current = isAuthenticated;
  }, [isAuthenticated]);

  // Fonction interne d'ajout réelle sans animation
  const _addToCart = async (product) => {
    if (!isAuthenticated) {
      const localCart = JSON.parse(localStorage.getItem("guest_cart")) || [];
      const existing = localCart.find((item) => item._id === product._id);

      let updatedCart;
      if (existing) {
        updatedCart = localCart.map((item) =>
          item._id === product._id
            ? { ...item, quantite: item.quantite + 1 }
            : item
        );
      } else {
        updatedCart = [...localCart, { ...product, quantite: 1 }];
      }

      localStorage.setItem("guest_cart", JSON.stringify(updatedCart));
      setCartItems(updatedCart);
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/api/panier/add",
        { produitId: product._id, quantite: 1 },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setCartItems(res.data.items);
    } catch (error) {
      console.error("Erreur ajout panier :", error);
    }
  };

  // Nouvelle fonction publique qui ajoute ET déclenche l'animation
  const addToCart = async (product) => {
    await _addToCart(product);
    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 1000); // Animation pendant 1s
  };

  const removeFromCart = async (productId) => {
    if (!isAuthenticated) {
      const localCart = JSON.parse(localStorage.getItem("guest_cart")) || [];
      const updatedCart = localCart
        .map((item) =>
          item._id === productId ? { ...item, quantite: item.quantite - 1 } : item
        )
        .filter((item) => item.quantite > 0);

      localStorage.setItem("guest_cart", JSON.stringify(updatedCart));
      setCartItems(updatedCart);
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/api/panier/decrement",
        { produitId: productId },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setCartItems(res.data.items);
    } catch (error) {
      console.error("Erreur décrémentation panier :", error);
    }
  };

  const clearCart = async () => {
    if (!isAuthenticated) {
      localStorage.removeItem("guest_cart");
      setCartItems([]);
      return;
    }

    try {
      const res = await axios.delete("http://localhost:8080/api/panier/vider", {
        withCredentials: true,
      });
      setCartItems(res.data.items || []);
    } catch (error) {
      console.error("Erreur vidage panier :", error);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/api/panier/${productId}`, {
        withCredentials: true,
      });
      await fetchCart(); // Actualiser le panier local après suppression
      Swal.fire({
        icon: "success",
        title: "Produit supprimé",
        toast: true,
        position: "top-end",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Erreur suppression produit :", error);
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Impossible de supprimer le produit",
        toast: true,
        position: "top-end",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const itemCount = cartItems.reduce((total, item) => total + item.quantite, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        itemCount,
        addToCart,       // ici on expose la fonction avec animation
        removeFromCart,
        clearCart,
        handleRemove,
        isAdding,        // expose l’état animation pour Navbar
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
