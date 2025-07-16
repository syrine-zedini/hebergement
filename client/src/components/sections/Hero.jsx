import { useState, useEffect } from "react";
import {
  ArrowRight,
  ArrowDown,
  ChevronDown,
  ChevronUp,
  Target,
  Users,
  Lightbulb,
  Rocket,
  Settings,
  Brain,
  DollarSign,
  Receipt,
  Sparkles,
  BarChart2,
  Clock,
  ShieldCheck,
  Zap,
  MessageCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import DemoVideo from "../../assets/Demo.mp4";

const services = [
  {
    icon: <Settings className="text-orange-600 dark:text-orange-400" size={32} />,
    emoji: "🔧",
    title: "Gestion de Projets / Job Manager",
    preview:
      "Pilotage de projets, chantiers, missions, jobs (TPE/PME, BTP, agences, etc.). Suivi en temps réel de la performance de l'entreprise et des collaborateurs.",
    details: [
      "Gestion multi-entités avec transversalité des fonctionnalités",
      "Génération d'écritures comptables liées aux projets",
      "Centralisation des informations projet : délais, coûts, livrables, marges",
      "Module de planification, affectation des ressources et contrôle qualité",
      "Suivi budgétaire et analytique par job/projet",
    ],
  },
  {
    icon: <Brain className="text-blue-600 dark:text-blue-400" size={32} />,
    emoji: "🧠",
    title: "CRM (Gestion de la relation client)",
    preview:
      "Gestion des prospects et des clients. Suivi des devis, commandes, contrats. Pipeline commercial visuel et interactif.",
    details: [
      "Relances automatiques et historiques des interactions",
      "Intégration directe avec la facturation et la comptabilité",
      "Uniformisation des process commerciaux",
    ],
  },
  {
    icon: <DollarSign className="text-green-600 dark:text-green-400" size={32} />,
    emoji: "💰",
    title: "Comptabilité & Finance",
    preview:
      "Génération d'écritures comptables automatiques (ventes, achats, provisions). Synchronisation des données avec les outils comptables.",
    details: [
      "Analyse financière par projet, client, équipe ou entité",
      "Préparation à la facturation électronique (obligatoire en 2027)",
      "GED intégrée (gestion documentaire numérique)",
      "Réduction des délais de facturation et de paiement",
    ],
  },
  {
    icon: <Receipt className="text-purple-600 dark:text-purple-400" size={32} />,
    emoji: "🧾",
    title: "Facturation & Paiements",
    preview:
      "Facturation automatisée à partir des bons de commande ou livrables. Historique des paiements, alertes sur les impayés.",
    details: [
      "Modèles de factures paramétrables",
      "Export des données vers plateformes fiscales",
      "Réduction du cycle facturation → encaissement",
    ],
  },
];

const stats = [
  { value: "95%", label: "Satisfaction clients", icon: <Sparkles className="text-yellow-500" /> },
  { value: "40%", label: "Gain de temps", icon: <Clock className="text-blue-500" /> },
  { value: "30%", label: "Augmentation productivité", icon: <BarChart2 className="text-green-500" /> },
  { value: "100%", label: "Sécurité des données", icon: <ShieldCheck className="text-purple-500" /> },
];

export default function Hero() {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(Array(services.length).fill(false));
  const [currentImage, setCurrentImage] = useState(0);
  const [showDemo, setShowDemo] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const images = [
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const toggleExpand = (idx) => {
    setExpanded((expanded) => expanded.map((v, i) => (i === idx ? !v : v)));
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMsg = {
      content: newMessage,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setNewMessage("");

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Aucun token d'authentification trouvé");

      const response = await fetch("http://localhost:8080/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({
          content: newMessage,
          sender: "user",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Erreur HTTP ${response.status}`);
      }

      const data = await response.json();
      if (data.aiMessage?.content) {
        setMessages((prev) => [
          ...prev,
          {
            content: data.aiMessage.content,
            sender: "ai",
            timestamp: new Date(),
          },
        ]);
      }
    } catch (error) {
      console.error("Erreur détaillée:", { message: error.message, stack: error.stack });

      let errorMessage = "Erreur de communication avec le serveur";
      if (error.message.includes("401")) errorMessage = "Session expirée - Veuillez vous reconnecter";
      else if (error.message.includes("network")) errorMessage = "Problème de connexion réseau";

      setMessages((prev) => [
        ...prev,
        {
          content: errorMessage,
          sender: "system",
          timestamp: new Date(),
        },
      ]);
    }
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section
      id="accueil"
      className="relative overflow-hidden bg-white min-h-screen"
    >
      {/* Background Shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[80%] bg-pink-500 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[90%] bg-orange-500 rounded-full opacity-15 blur-3xl"></div>
      </div>

      {/* Hero Header */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-4 text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <div className="inline-flex items-center bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full mb-6">
            <Zap className="mr-2" size={18} />
            <span>{t("hero.newVersionAvailable")}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
              {t("hero.title")}
            </span>
            {" - "}
            {t("hero.partner")}
          </h1>

          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
            {t("hero.description")}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-red-600 to-red-500 text-white px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300 shadow-lg flex items-center gap-2"
              >
                {t("hero.cta.startFree")}
                <ArrowRight size={20} />
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white border-2 border-red-600 text-red-600 px-8 py-4 rounded-full hover:bg-red-50 transition-all duration-300 shadow-lg flex items-center gap-2"
              onClick={() => setShowDemo(true)}
            >
              {t("hero.cta.seeDemo")}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.button>
          </div>
        </motion.div>

        {/* Floating stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-5xl px-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 flex flex-col items-center"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="flex items-center mt-2 text-gray-600 dark:text-gray-300">
                {stat.icon}
                <span className="ml-2 text-sm">{stat.label}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Content Sections with Images */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Produit détaillé */}
        <div className="mb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-full mr-4">
                    <Target className="text-red-600 dark:text-red-400" size={32} />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t("hero.productDetails.title")}</h2>
                </div>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                  {t("hero.productDetails.description")}
                </p>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mt-4">
                  {t("hero.productDetails.features")}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {["Gestion de projets", "CRM intégré", "Comptabilité", "Facturation", "Analytics"].map(
                    (feature, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                      >
                        {t(`hero.productDetails.features.${feature}`)}
                      </span>
                    )
                  )}
                </div>
              </motion.div>
            </div>

            <div className="order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative h-96 rounded-2xl overflow-hidden shadow-2xl"
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImage}
                    src={images[currentImage]}
                    alt="Application de gestion de projets"
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </AnimatePresence>

                <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`w-3 h-3 rounded-full transition-all ${currentImage === index ? "bg-red-600 w-6" : "bg-gray-300"
                        }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                <div className="absolute -bottom-4 -right-4 bg-red-600 text-white p-4 rounded-xl shadow-lg z-10">
                  <span className="font-bold text-2xl">CRP MEMO</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Tarifs Section */}
        <div id="tarifs" className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-2">
              <span className="bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
                Tarifs & Abonnements
              </span>
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Choisissez la formule qui correspond à vos besoins. Sans engagement, évolutif à tout moment.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Standard Plan */}
            <motion.div
              whileHover={{ scale: 1.04 }}
              className="relative bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border-2 border-blue-200 dark:border-blue-700 rounded-2xl shadow-xl p-8 flex flex-col items-center"
            >
              <div className="bg-blue-100 dark:bg-blue-900/40 p-4 rounded-full mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-2">Standard</h3>
              <div className="text-4xl font-extrabold text-blue-700 dark:text-blue-200 mb-2">
                29€<span className="text-lg font-medium">/mois</span>
              </div>
              <ul className="text-gray-700 dark:text-gray-300 text-base mb-6 space-y-2 text-left">
                <li>✔️ Gestion de projets</li>
                <li>✔️ CRM intégré</li>
                <li>✔️ Facturation simple</li>
                <li>✔️ Support standard</li>
              </ul>
              <button className="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full transition-all">
                Choisir
              </button>
            </motion.div>
            {/* Premium Plan */}
            <motion.div
              whileHover={{ scale: 1.07 }}
              className="relative bg-gradient-to-br from-red-50 to-pink-100 dark:from-red-900/30 dark:to-pink-800/30 border-4 border-red-400 dark:border-pink-600 rounded-2xl shadow-2xl p-8 flex flex-col items-center scale-105 z-10"
            >
              <div className="bg-red-100 dark:bg-red-900/40 p-4 rounded-full mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-red-700 dark:text-pink-300 mb-2">Premium</h3>
              <div className="text-4xl font-extrabold text-red-700 dark:text-pink-200 mb-2">
                59€<span className="text-lg font-medium">/mois</span>
              </div>
              <ul className="text-gray-700 dark:text-gray-300 text-base mb-6 space-y-2 text-left">
                <li>✔️ Toutes les fonctionnalités Standard</li>
                <li>✔️ Comptabilité avancée</li>
                <li>✔️ Support prioritaire</li>
                <li>✔️ Personnalisation & intégrations avancées</li>
              </ul>
              <button className="mt-auto bg-gradient-to-r from-red-600 to-pink-500 hover:from-pink-600 hover:to-red-500 text-white font-semibold px-6 py-2 rounded-full transition-all shadow-lg">
                Essayer Premium
              </button>
              <span className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                Populaire
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Demo Video Modal */}
      {showDemo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          onClick={() => setShowDemo(false)}
          style={{ cursor: "pointer" }}
        >
          <div
            className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-2xl w-full p-4 max-h-[90vh] overflow-y-auto flex flex-col"
            onClick={(e) => e.stopPropagation()}
            style={{ cursor: "default" }}
          >
            <button
              className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-pink-500 text-white text-3xl font-bold shadow-lg border-2 border-white/70 dark:border-gray-800 transition-all duration-200 hover:scale-110 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-red-400 z-10"
              onClick={() => setShowDemo(false)}
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="16" fill="none" />
                <path d="M10 10L22 22M22 10L10 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </button>
            <video src={DemoVideo} controls autoPlay className="w-full rounded-lg mt-8 max-h-[60vh] object-contain" />
          </div>
        </div>
      )}

      {/* Chat Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-50"
        aria-label="Ouvrir le chat"
      >
        <MessageCircle size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 right-6 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-600 to-red-600 p-4 flex justify-between items-center">
              <h3 className="text-white font-bold text-lg">Support Pegasio</h3>
              <button
                onClick={toggleChat}
                className="text-white hover:text-gray-200 transition-colors"
                aria-label="Fermer le chat"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4 h-64 overflow-y-auto bg-gray-50 dark:bg-gray-900">
              {messages.map((msg, index) => (
                <div key={index} className={`mt-2 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[75%] rounded-lg p-3 ${
                      msg.sender === "user"
                        ? "bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200"
                        : msg.sender === "ai"
                        ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    }`}
                  >
                    {msg.sender === "ai" && (
                      <div className="flex items-center mb-1">
                        <span className="font-bold text-xs mr-2">MEMO AI</span>
                      </div>
                    )}
                    <p>{msg.content}</p>
                    <span className="block text-xs opacity-70 mt-1 text-right">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <input
                type="text"
                placeholder="Tapez votre message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={onKeyPress}
                className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                className="mt-2 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
                aria-label="Envoyer le message"
              >
                Envoyer
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}