import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Lottie from "lottie-react";
import userIconAnimation from "../assets/userIcon.json";
import SuccessAnimation from "./SuccessAnimation";
import cartAnimation from "../assets/Animation_Cart_Cleaned.json";
import image from "../assets/logo.png";
import {
  User,
  Menu,
  X,
  ChevronDown,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { useCart } from "../contexts/cartContext";
import { useAuth } from "../contexts/AuthContext";

const navItems = [
  { id: "accueil", label: "Accueil" },
  {
    id: "produits",
    label: "Produits",
    submenu: [{ id: "categories", label: "Catégories" }],
  },
  { id: "tarifs", label: "Tarifs" },
  {
    id: "ressources",
    label: "Ressources",
    submenu: [
      { id: "blogs", label: "Blogs", path: "/blog" },
      { id: "avis-client", label: "Avis Client", path: "/avis-clients" },
      { id: "guide-utilisation", label: "Guide d'utilisation", path: "/guide-utilisation" },
      { id: "faq", label: "FAQ", path: "/faq" },
      { id: "en-savoir-plus", label: "En savoir plus", path: "/savoir-plus" },
    ],
  },
];

export default function Navbar() {
  const [active, setActive] = useState("accueil");
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [removingItems, setRemovingItems] = useState([]);
  const [isClearing, setIsClearing] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, itemCount, removeFromCart, clearCart, isAdding } = useCart();
  const { user, logout } = useAuth();
  const lottieCartRef = useRef();
  const navRef = useRef(null);
  const [showAddAnimation, setShowAddAnimation] = useState(false);
  const [animationStep, setAnimationStep] = useState("idle");
  const [showLottie, setShowLottie] = useState(true);

  useEffect(() => {
    if (isAdding) {
      lottieCartRef.current?.goToAndPlay(0, true);
      setTimeout(() => {
        setShowLottie(false);
        setTimeout(() => setShowLottie(true), 50);
      }, 1800);
    }
  }, [isAdding]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100;
      let current = "accueil";
      const sectionsToCheck = navItems.filter((item) => !item.submenu);
      for (const item of sectionsToCheck) {
        const sectionId = item.scrollTo || item.id;
        const section = document.getElementById(sectionId);
        if (section && section.offsetTop <= scrollPos) {
          current = item.id;
        }
      }
      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id, customScrollTo = null) => {
    const sectionId = customScrollTo || id;
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
    }
    setMenuOpen(false);
    setDropdownOpen(null);
  };

  const handleItemClick = (item) => {
    if (item.submenu) {
      setDropdownOpen(dropdownOpen === item.id ? null : item.id);
    } else {
      setActive(item.id);
      scrollToSection(item.id, item.scrollTo);
    }
  };

  const handleSubmenuClick = (parentId, submenuItem) => {
    if (submenuItem.path) {
      navigate(submenuItem.path);
    } else if (submenuItem.id === "categories") {
      navigate("/categories");
    }
    setDropdownOpen(null);
    setMenuOpen(false);
  };

  const handleRemoveWithAnimation = (produitId) => {
    setRemovingItems((prev) => [...prev, produitId]);
    const btn = document.getElementById(`remove-btn-${produitId}`);
    if (btn) {
      btn.classList.add("shake");
      setTimeout(() => btn.classList.remove("shake"), 400);
    }
    setTimeout(() => {
      removeFromCart(produitId);
      setRemovingItems((prev) => prev.filter((id) => id !== produitId));
    }, 600);
  };

  const handleClearCartWithAnimation = () => {
    setIsClearing(true);
    setTimeout(() => {
      clearCart();
      setIsClearing(false);
    }, 700);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 600);
    if (typeof updateCartQuantity === "function") {
      updateCartQuantity(productId, newQuantity);
    }
    return () => clearTimeout(timer);
  };

  return (
    <>
      <style>
        {`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-6px); }
            40%, 80% { transform: translateX(6px); }
          }
          @keyframes pop {
            0% { transform: scale(1); }
            50% { transform: scale(1.6); box-shadow: 0 0 8px rgba(255,0,0,0.6); }
            100% { transform: scale(1); box-shadow: none; }
          }
          @keyframes fadeSlideIn {
            0% { opacity: 0; transform: translateX(30px) scale(0.9); }
            100% { opacity: 1; transform: translateX(0) scale(1); }
          }
          @keyframes fadeSlideOutRotate {
            0% { opacity: 1; transform: translateX(0) rotate(0deg) scale(1); }
            100% { opacity: 0; transform: translateX(-40px) rotate(-15deg) scale(0.8); }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); box-shadow: none; }
            50% { transform: scale(1.1); box-shadow: 0 0 12px rgba(220,20,60,0.8); }
          }
          @keyframes fadeZoomIn {
            0% { opacity: 0; transform: scale(0.9); }
            100% { opacity: 1; transform: scale(1); }
          }
          @keyframes fadeZoomOut {
            0% { opacity: 1; transform: scale(1); }
            100% { opacity: 0; transform: scale(0.9); }
          }
          @keyframes underline {
            from { width: 0; }
            to { width: 100%; }
          }
          .animate-shake {
            animation: shake 0.5s ease;
          }
          .animate-pop {
            animation: pop 0.7s ease;
          }
          .fade-slide-in {
            animation: fadeSlideIn 0.5s ease forwards;
          }
          .fade-slide-out-rotate {
            animation: fadeSlideOutRotate 0.6s ease forwards;
          }
          .pulse {
            animation: pulse 1.2s ease infinite;
          }
          .fade-zoom-in {
            animation: fadeZoomIn 0.4s ease forwards;
          }
          .fade-zoom-out {
            animation: fadeZoomOut 0.4s ease forwards;
          }
          .shake {
            animation: shake 0.4s ease;
          }
          .disabled {
            pointer-events: none;
            opacity: 0.6;
          }
          .group:hover .group-hover\:opacity-100 {
            opacity: 1 !important;
          }
          .group:hover .group-hover\:pointer-events-auto {
            pointer-events: auto !important;
          }
          @keyframes fadeSlideUp {
            from {
              opacity: 0;
              transform: translateY(8px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-slide-up {
            animation: fadeSlideUp 0.3s ease-out forwards;
          }
          .hover-glow:hover {
            box-shadow: 0 0 12px rgba(255, 0, 102, 0.4);
            transform: scale(1.02);
          }
          .hover-glow-red:hover {
            box-shadow: 0 0 10px rgba(249, 168, 212, 0.4);
            transform: scale(1.03);
          }
        `}
      </style>

      <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-inner px-6 md:px-12 py-2 flex items-center justify-between transition-colors duration-300">
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={image}
            alt="Logo"
            className="h-12 w-auto md:h-12 drop-shadow-lg transition-all duration-300"
          />
        </Link>

        <div className="hidden md:block relative">
          <ul 
            ref={navRef}
            className="flex gap-8 items-center px-2 py-2 relative"
          >
            {navItems.map((item) => (
              <li key={item.id} className="relative" data-id={item.id}>
                <div
                  className={`cursor-pointer text-sm md:text-base transition-all duration-300 flex items-center gap-1 py-2 px-1 relative ${
                    active === item.id
                      ? "text-red-600 font-semibold after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-pink-300 after:w-full"
                      : "text-gray-700 dark:text-white hover:text-red-600 hover:scale-102 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-pink-300 after:w-0 hover:after:w-full after:transition-all after:duration-300"
                  }`}
                  onClick={() => handleItemClick(item)}
                >
                  {item.label}
                  {item.submenu && <ChevronDown size={16} />}
                </div>

                {item.submenu && dropdownOpen === item.id && (
                  <div className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-inner border border-gray-200 dark:border-gray-600 min-w-48 py-2 z-50">
                    {item.submenu.map((submenuItem) => (
                      <button
                        key={submenuItem.id}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-red-600 transition-colors"
                        onClick={() => handleSubmenuClick(item.id, submenuItem)}
                      >
                        {submenuItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative flex items-center justify-center w-11 h-11 rounded-full bg-gray-900 dark:bg-gray-800 border border-gray-700 shadow-inner transition p-0"
            aria-label="Afficher le panier"
          >
            {showLottie && (
              <Lottie
                lottieRef={lottieCartRef}
                animationData={cartAnimation}
                loop={false}
                autoplay={false}
                className="w-full h-full"
                style={{ backgroundColor: "transparent" }}
              />
            )}
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-600 text-white rounded-full text-xs w-6 h-6 flex items-center justify-center font-bold shadow-inner animate-pop">
                {itemCount}
              </span>
            )}
          </button>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(dropdownOpen === "user" ? null : "user")}
                className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 hover:text-red-600 transition"
              >
                <div className="flex items-center gap-1">
                  <Lottie
                    animationData={userIconAnimation}
                    loop
                    autoplay
                    className="w-8 h-8 cursor-pointer"
                  />
                  <ChevronDown
                    size={16}
                    className="text-gray-800 dark:text-white transition-transform duration-200 group-hover:rotate-180"
                  />
                </div>
              </button>
              {dropdownOpen === "user" && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-inner z-50 overflow-hidden animate-fade-slide-up">
                  <button
                    onClick={() => {
                      setDropdownOpen(null);
                      navigate("/home/dashboard");
                    }}
                    className="w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 hover-glow"
                  >
                    👤 Votre espace
                  </button>
                  <button
                    onClick={() => {
                      setTimeout(() => {
                        logout();
                        navigate("/login");
                      }, 300);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 transition"
                  >
                    🔓 Déconnexion
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/signup"
              className="flex items-center space-x-2 cursor-pointer transition-colors duration-200 hover:text-red-600 text-gray-600 dark:text-gray-300"
            >
              <User size={20} />
              <span className="font-medium">Créer un compte</span>
            </Link>
          )}
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 dark:text-white hover:text-red-600 transition"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-white dark:bg-gray-900 shadow-inner border-t border-gray-300 dark:border-gray-700 z-40">
          <ul className="flex flex-col gap-3 p-4">
            {navItems.map((item) => (
              <li key={item.id} className="relative">
                <div
                  className={`cursor-pointer text-base flex items-center justify-between px-3 py-2 rounded relative ${
                    active === item.id
                      ? "bg-red-100 dark:bg-red-900 text-red-600 font-semibold after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-pink-300 after:w-full"
                      : "text-gray-700 dark:text-white hover:text-red-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-pink-300 after:w-0 hover:after:w-full after:transition-all after:duration-300"
                  }`}
                  onClick={() =>
                    item.submenu
                      ? setDropdownOpen(dropdownOpen === item.id ? null : item.id)
                      : scrollToSection(item.id, item.scrollTo)
                  }
                >
                  <span>{item.label}</span>
                  {item.submenu && <ChevronDown size={16} />}
                </div>
                {item.submenu && dropdownOpen === item.id && (
                  <ul className="pl-6 bg-gray-100 dark:bg-gray-800 rounded-b-md">
                    {item.submenu.map((submenuItem) => (
                      <li key={submenuItem.id}>
                        <button
                          className="w-full text-left px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-red-600 transition-colors"
                          onClick={() => handleSubmenuClick(item.id, submenuItem)}
                        >
                          {submenuItem.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li className="border-t border-gray-300 dark:border-gray-700 pt-4 mt-4">
              {user ? (
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/profil");
                    }}
                    className="w-full text-left px-4 py-2 text-base text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
                  >
                    👤 Profil
                  </button>
                  <button
                    onClick={() => {
                      setTimeout(() => {
                        logout();
                        navigate("/login");
                      }, 300);
                    }}
                    className="w-full text-left px-4 py-2 text-base text-red-600 hover:bg-red-100 dark:hover:bg-red-800 rounded transition"
                  >
                    🔓 Déconnexion
                  </button>
                </div>
              ) : (
                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="w-full block text-left px-4 py-2 text-base text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
                >
                  ✍️ Créer un compte
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}

      {showCart && (
        <div
          className="fixed top-20 right-4 w-80 max-h-[60vh] bg-white dark:bg-gray-900 border dark:border-gray-700 shadow-inner rounded-lg p-4 overflow-auto z-[1000] fade-zoom-in"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-lg font-bold mb-4 text-red-600 dark:text-red-400">
            Votre Panier
          </h3>
          {cartItems.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-300">Votre panier est vide.</p>
          ) : (
            <ul>
              {cartItems.map((item, index) => {
                if (!item?.produit?._id) return null;
                return (
                  <li
                    key={item.produit._id || index}
                    className={`mb-4 border-b dark:border-gray-600 pb-2 flex justify-between items-center transition-all duration-500 ease-in-out ${
                      removingItems.includes(item.produit._id)
                        ? "fade-slide-out-rotate"
                        : "fade-slide-in"
                    }`}
                    aria-live="polite"
                  >
                    <div className="w-full">
                      <p className="font-semibold text-black dark:text-white">
                        {item.produit.name}
                      </p>
                      <p className="text-sm text-gray-700 dark:text-white">
                        Quantité : {item.quantite}
                      </p>
                      <p className="text-sm text-gray-500 mt-1 transition-all duration-300">
                        Prix unitaire :{" "}
                        <span className="text-red-500 font-semibold">
                          {item.produit.price.toFixed(2)} TND
                        </span>
                      </p>
                      <p className="text-sm text-green-600 font-bold transition-all duration-300">
                        Total : {(item.produit.price * item.quantite).toFixed(2)} TND
                      </p>
                    </div>
                    <button
                      id={`remove-btn-${item.produit._id}`}
                      onClick={() => handleRemoveWithAnimation(item.produit._id)}
                      className="text-red-600 hover:text-red-800 transition"
                      aria-label={`Supprimer ${item.produit.name} du panier`}
                      disabled={isClearing}
                    >
                      <Trash2 size={20} />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
          {cartItems.length > 0 && (
            <div className="mt-6 grid grid-cols-2 gap-2">
              <button
                onClick={() => setShowCart(false)}
                className="bg-[#ff1a1a] text-white py-2 px-2 rounded-lg hover:bg-red-600 transition"
              >
                Fermer
              </button>
              <button
                onClick={() => {
                  setShowCart(false);
                  navigate("/voir-panier");
                }}
                className="bg-[#ff1a1a] text-white py-2 px-2 rounded-lg hover:bg-red-600 transition"
              >
                Voir le panier
              </button>
              {user ? (
                <button
                  onClick={() => navigate("/checkout")}
                  className="bg-[#ff1a1a] text-white py-2 px-2 rounded-lg hover:bg-red-600 transition"
                >
                  Passer à la caisse
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowCart(false);
                    navigate("/signup");
                  }}
                  className="bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500 transition"
                >
                  Se connecter pour payer
                </button>
              )}
              <button
                onClick={handleClearCartWithAnimation}
                className={`bg-[#ff1a1a] text-white py-2 px-2 rounded-lg hover:bg-red-600 transition ${
                  isClearing ? "pulse disabled" : ""
                }`}
                disabled={isClearing}
                aria-label="Vider le panier"
              >
                Vider le panier
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}