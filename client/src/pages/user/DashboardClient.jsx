import React from 'react';
import { FiPackage, FiShoppingBag, FiHeart, FiAward, FiTruck, FiTrendingUp } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, Progress } from 'antd';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Palette de couleurs premium Pegasio
const colors = {
  primary: {
    darkBlue: '#0A3D62',
    vibrantOrange: '#FF7F00',
    lightOrange: '#FFA740',
    emeraldGreen: '#00B894',
    skyBlue: '#74B9FF',
    lightGreen: '#A8E6CF',
    white: '#F8FAFC',
    darkRed: '#8B0000',
  },
  secondary: {
    gray: '#6B7280',
    lightGray: '#E5E7EB',
  },
  status: {
    success: '#00B894',
    warning: '#FF7F00',
    error: '#EF4444',
  }
};

// Données exemple pour les graphiques
const performanceData = [
  { name: 'Jan', utilisation: 65, satisfaction: 78 },
  { name: 'Fév', utilisation: 59, satisfaction: 82 },
  { name: 'Mar', utilisation: 80, satisfaction: 85 },
  { name: 'Avr', utilisation: 81, satisfaction: 83 },
  { name: 'Mai', utilisation: 76, satisfaction: 88 },
  { name: 'Jun', utilisation: 85, satisfaction: 90 },
];

// Composant de carte avec animations
const StatCard = ({ title, value, icon, trend, duration = 0.2, delay = 0 }) => {
  const TrendIcon = trend?.icon;

  let iconColor = colors.primary.darkBlue;
  let bgColorOpacity = '20';

  if (title.includes('point')) {
    iconColor = colors.primary.vibrantOrange;
  } else if (title.includes('Commandes totales')) {
    iconColor = colors.primary.darkBlue;
  } else if (title.includes('liste de souhaits')) {
    iconColor = colors.primary.emeraldGreen;
  } else if (title.includes('Commandes en cours')) {
    iconColor = colors.primary.skyBlue;
  }

  let iconBgColor = `${iconColor}${bgColorOpacity}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, type: "spring", stiffness: 150, delay }}
      whileHover={{
        y: -5,
        boxShadow: "0 15px 35px -8px rgba(0, 0, 0, 0.15)",
        scale: 1.02
      }}
      className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 cursor-pointer"
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-secondary-gray">{title}</p>
          <p className="text-2xl font-bold mt-2 text-gray-900">{value}</p>
          {trend && (
            <div className={`flex items-center mt-2 text-sm ${trend.color === "text-status-success" ? "text-status-success" : "text-status-warning"}`}>
              {TrendIcon && <TrendIcon className="mr-1" />}
              <span>{trend.value}</span>
            </div>
          )}
        </div>
        <div
          className="p-3 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: iconBgColor }}
        >
          {React.cloneElement(icon, {
            className: "text-xl",
            style: { color: iconColor }
          })}
        </div>
      </div>
    </motion.div>
  );
};

// Composant de produit favori
const FavoriteProduct = ({ name, lastOrder, status, delay = 0 }) => {
  const getStatusClasses = (status) => {
    switch (status) {
      case 'Expédié':
        return 'bg-primary-lightGreen text-primary-emeraldGreen';
      case 'En préparation':
        return 'bg-yellow-100 text-yellow-800';
      case 'Livré':
        return 'bg-blue-100 text-primary-darkBlue';
      default:
        return 'bg-secondary-lightGray text-secondary-gray';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 120, delay }}
      whileHover={{ scale: 1.02, boxShadow: "0 8px 20px -5px rgba(0, 0, 0, 0.08)" }}
      className="flex items-center p-4 bg-white rounded-2xl shadow-xs border border-gray-100 cursor-pointer"
    >
      <div className="relative">
        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary-skyBlue to-primary-lightGreen flex items-center justify-center">
          <FiPackage className="text-white text-xl" />
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 + delay, type: "spring", stiffness: 200 }}
          className="absolute -top-2 -right-2 bg-white p-1 rounded-full shadow-sm"
        >
          <FiHeart className="text-primary-vibrantOrange text-sm" fill={colors.primary.vibrantOrange} />
        </motion.div>
      </div>
      <div className="ml-4 flex-1">
        <h4 className="font-medium text-gray-900">{name}</h4>
        <p className="text-sm text-secondary-gray">Dernière commande: {lastOrder}</p>
      </div>
      <div className="ml-4">
        <span className={`px-3 py-1 text-xs rounded-full font-semibold ${getStatusClasses(status)}`}>
          {status}
        </span>
      </div>
    </motion.div>
  );
};

const ClientDashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">
      <p>Veuillez vous connecter pour accéder à ce contenu</p>
      <Link to="/login" className="text-blue-500 ml-2">Se connecter</Link>
    </div>;
  }

  const clientData = {
    userName: user.name || "Utilisateur",
    orders: user.orders || 18,
    wishlist: user.wishlistItems || 7,
    ongoingOrders: user.pendingOrders || 2,
    loyaltyPoints: user.loyaltyPoints || 1250
  };

  const favoriteProducts = [
    {
      name: 'Pegasio Ultra Running',
      lastOrder: '15/07/2023',
      status: 'Expédié'
    },
    {
      name: 'Veste Sport Pro',
      lastOrder: '10/07/2023',
      status: 'Livré'
    },
    {
      name: 'Casque Vélo Aero',
      lastOrder: '01/07/2023',
      status: 'Livré'
    }
  ];

  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="min-h-screen bg-gray-50 font-sans p-6 text-gray-800"
    >
      {/* En-tête personnalisé */}
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100, delay: 0.2 }}
        className="mb-10"
      >
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <div className="space-y-6"> {/* Espacement vertical entre les éléments */}
      {/* Section Bonjour */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 shadow-sm"></section>
            <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
              Bonjour, {clientData.userName} 👋
            </h1>
            <p className="text-lg mt-2" style={{ color: colors.primary.darkRed }}>
              Bienvenue dans votre espace client personnalisé Pegasio
            </p>
            
            
          </div>
        </div>
        </div>
      </motion.header>

      {/* Section Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
        className="space-y-6 p-6 bg-white rounded-2xl shadow-sm mb-10"
      >
        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-md border-0">
            <h3 className="text-gray-500 font-semibold">Utilisation moyenne</h3>
            <div className="flex items-center mt-2">
              <div>
                <p className="text-2xl font-bold text-gray-800">78%</p>
                <p className="text-green-600">+5.2% vs dernier trimestre</p>
              </div>
            </div>
          </Card>

          <Card className="shadow-md border-0">
            <h3 className="text-gray-500 font-semibold">Satisfaction client</h3>
            <div className="flex items-center mt-2">
              <Progress
                type="circle"
                percent={88}
                strokeColor="#10b981"
                className="mr-4"
                width={80}
              />
              <div>
                <p className="text-2xl font-bold text-gray-800">88/100</p>
                <p className="text-green-600">+12% vs année dernière</p>
              </div>
            </div>
          </Card>

          <Card className="shadow-md border-0">
            <h3 className="text-gray-500 font-semibold">Documents disponibles</h3>
            <div className="flex items-center mt-2">
              <Progress
                type="circle"
                percent={100}
                strokeColor="#f59e0b"
                className="mr-4"
                width={80}
                format={() => (
                  <span className="text-xl font-bold text-gray-800">12</span>
                )}
              />
              <div>
                <p className="text-gray-800">Dernier ajout:</p>
                <p className="text-blue-600 font-medium">
                  Guide d'intégration API
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Graphiques de performance */}
        <Card title="Performance Pegasio" className="shadow-md border-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-gray-700 font-medium mb-4">
                Taux d'utilisation mensuel
              </h4>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="utilisation"
                    stroke="#4f46e5"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                    name="Utilisation (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h4 className="text-gray-700 font-medium mb-4">
                Satisfaction client
              </h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="satisfaction"
                    fill="#10b981"
                    name="Satisfaction (/100)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Section principale - Stats et Carte Fidélité */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10"
      >
        {/* Cartes de statistiques */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCard
            title="Vos points fidélité"
            value={clientData.loyaltyPoints}
            icon={<FiAward />}
            trend={{ icon: FiTrendingUp, value: "+150 ce mois", color: "text-status-success" }}
            delay={0.1}
          />
          <StatCard
            title="Commandes totales"
            value={clientData.orders}
            icon={<FiShoppingBag />}
            trend={{ icon: FiTrendingUp, value: "+3 ce mois", color: "text-status-success" }}
            duration={0.3}
            delay={0.2}
          />
          <StatCard
            title="Votre liste de souhaits"
            value={clientData.wishlist}
            icon={<FiHeart />}
            duration={0.4}
            delay={0.3}
          />
          <StatCard
            title="Commandes en cours"
            value={clientData.ongoingOrders}
            icon={<FiTruck />}
            duration={0.5}
            delay={0.4}
          />
        </div>

        {/* Carte de fidélité Premium */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 100, damping: 10 }}
          className="bg-gradient-to-br from-primary-darkBlue to-primary-vibrantOrange rounded-3xl shadow-2xl p-8 text-white overflow-hidden relative transform hover:scale-102 transition-all duration-300 ease-in-out"
        >
          <div className="absolute -right-10 -top-10 w-36 h-36 rounded-full bg-white bg-opacity-10 transform rotate-45"></div>
          <div className="absolute -left-5 -bottom-5 w-24 h-24 rounded-full bg-white bg-opacity-10 transform -rotate-30"></div>

          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <h3 className="font-extrabold text-3xl mb-4" style={{ color: colors.primary.darkRed }}>Votre Carte Pegasio Premium</h3>
              <p className="text-base opacity-95" style={{ color: 'black' }}>Profitez d'avantages exclusifs !</p>
            </div>

            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-sm opacity-80" style={{ color: colors.primary.darkRed }}>Membre depuis</p>
                <p className="font-semibold text-lg" style={{ color: 'black' }}>2021</p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-80" style={{ color: colors.primary.darkRed }}>Niveau</p>
                <p className="font-bold text-lg" style={{ color: 'black' }}>Gold</p>
              </div>
            </div>
            <div className="bg-white bg-opacity-20 p-5 rounded-xl backdrop-blur-sm shadow-inner">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm opacity-80" style={{ color: colors.primary.darkRed }}>Prochain avantage</p>
                  <p className="font-bold text-base" style={{ color: 'black' }}>
                    Une réduction exclusive de 30% vous attend sur notre prochain produit phare 🔥
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Produits favoris */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.7, ease: "easeOut" }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10"
      >
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-semibold text-2xl text-gray-900 mb-4">Vos produits favoris</h3>
          {favoriteProducts.map((product, index) => (
            <FavoriteProduct
              key={index}
              name={product.name}
              lastOrder={product.lastOrder}
              status={product.status}
              delay={index * 0.1}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ClientDashboard;