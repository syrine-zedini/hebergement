import React from 'react';
import { FiPackage, FiTruck, FiTag, FiCheckCircle, FiClock, FiXCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';

const colors = {
  primary: {
    // Vibrant but elegant primary colors
    royalBlue: '#4169E1',   // A strong, classic blue
    crimsonRed: '#DC143C',  // A deep, rich red
    burntOrange: '#FF7F50', // A warm, inviting orange
    forestGreen: '#228B22', // A classic, deep green
    offWhite: '#F8F8F8',    // A soft, warm white for backgrounds
    darkText: '#333333',    // A deep charcoal for main text - this will be our "black" for text
    raspberryRed: '#E30B5C', // A vibrant, yet elegant raspberry red
    darkRed: '#8B0000',     // A sophisticated, deep red for strong emphasis
  },
  secondary: {
    // Complementary softer tones for balance
    lightBlue: '#ADD8E6',    // Lighter blue for accents
    softOrange: '#FFA07A',   // Lighter orange
    paleGreen: '#90EE90',    // Lighter green
    lightGray: '#E0E0E0',    // Very light gray for subtle backgrounds/borders
    mediumGrayText: '#666666', // Medium gray for secondary text
  },
  status: {
    // Status colors remain clear and recognizable
    success: '#28A745', // Green
    warning: '#FFC107', // Yellow/Orange
    error: '#DC3545',   // Red
    info: '#17A2B8',    // Cyan/Blue
  }
};

// Helper to get status color and icon
const getStatusProps = (status) => {
  switch (status) {
    case 'Expédié':
      return { color: colors.status.info, icon: FiTruck, bgColor: 'bg-blue-50', textColor: colors.status.info };
    case 'En préparation':
      return { color: colors.status.warning, icon: FiClock, bgColor: 'bg-yellow-50', textColor: colors.status.warning };
    case 'Livré':
      return { color: colors.status.success, icon: FiCheckCircle, bgColor: 'bg-green-50', textColor: colors.status.success };
    case 'Annulé':
      return { color: colors.status.error, icon: FiXCircle, bgColor: 'bg-red-50', textColor: colors.status.error };
    default:
      return { color: colors.secondary.mediumGrayText, icon: FiTag, bgColor: 'bg-gray-50', textColor: colors.secondary.mediumGrayText };
  }
};

// --- Order Card Component ---
const OrderCard = ({ order, index }) => {
  const { color, icon: StatusIcon, bgColor, textColor } = getStatusProps(order.status);

  return (
    <motion.div
      key={order.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.08, type: "spring", stiffness: 100, damping: 10, mass: 0.8 }}
      whileHover={{ scale: 1.02, boxShadow: "0 12px 25px -8px rgba(0, 0, 0, 0.08)", y: -5 }}
      className="bg-white rounded-2xl shadow-md p-6 mb-4 flex items-center justify-between border border-gray-100 cursor-pointer overflow-hidden"
    >
      <div className="flex items-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2 + index * 0.08, type: "spring", stiffness: 150, damping: 12 }}
          className="p-3 rounded-full mr-4 flex-shrink-0"
          style={{ backgroundColor: bgColor }}
        >
          <StatusIcon className="text-2xl" style={{ color: color }} />
        </motion.div>
        <div>
          <p className="font-semibold text-lg" style={{ color: colors.primary.darkText }}>
            Commande <span style={{ color: colors.primary.royalBlue }}>#{order.id}</span>
          </p>
          <p className="text-sm" style={{ color: colors.secondary.mediumGrayText }}>Passée le {order.date}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold text-xl" style={{ color: colors.primary.darkText }}>{order.amount}</p>
        <motion.span
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + index * 0.08, type: "spring", stiffness: 100, damping: 10 }}
          className={`text-xs px-3 py-1 inline-flex leading-5 font-semibold rounded-full mt-2`}
          style={{ backgroundColor: bgColor, color: textColor }}
        >
          {order.status}
        </motion.span>
      </div>
    </motion.div>
  );
};

// --- Main Component ---
const MesCommandes = () => {
  // Order data (you'll replace this with your actual data from an API)
  const allOrders = [
    { id: 'PGS-7891', date: '15/07/2023', amount: '€189.99', status: 'Expédié' },
    { id: 'PGS-7890', date: '14/07/2023', amount: '€245.50', status: 'En préparation' },
    { id: 'PGS-7889', date: '13/07/2023', amount: '€120.00', status: 'Livré' },
    { id: 'PGS-7888', date: '12/07/2023', amount: '€89.99', status: 'Livré' },
    { id: 'PGS-7887', date: '11/07/2023', amount: '€55.00', status: 'Livré' },
    { id: 'PGS-7886', date: '10/07/2023', amount: '€320.75', status: 'Expédié' },
    { id: 'PGS-7885', date: '09/07/2023', amount: '€75.20', status: 'Livré' },
    { id: 'PGS-7884', date: '08/07/2023', amount: '€99.99', status: 'Annulé' }, // Example of another status
  ];

  // Calculate order summary for the "diagram" card
  const totalOrders = allOrders.length;
  const deliveredOrders = allOrders.filter(order => order.status === 'Livré').length;
  const pendingOrders = allOrders.filter(order => order.status === 'En préparation' || order.status === 'Expédié').length;

  return (
    <div className="min-h-screen font-sans p-6" style={{ backgroundColor: colors.primary.offWhite }}>
      
      {/* Header of the Orders page */}
      <motion.header
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-10 flex justify-center items-center" // Changed to justify-center
      >
        <h1 className="text-4xl font-extrabold drop-shadow-sm">
          <span style={{ color: colors.primary.darkText }}>Toutes vos </span>
          <span style={{ color: colors.primary.darkRed }}>commandes 📦 </span>
        </h1>
      </motion.header>

      
      {/* Order Summary / Diagram Card */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.7, type: "spring", stiffness: 80, damping: 10 }}
        className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-10 flex flex-col sm:flex-row justify-around items-center text-center overflow-hidden"
      >
        <motion.div
          className="flex flex-col items-center p-4"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <FiPackage size={40} className="mb-3" style={{ color: colors.primary.burntOrange }} />
          <p className="text-4xl font-bold" style={{ color: colors.primary.darkText }}>{totalOrders}</p>
          <p className="text-base" style={{ color: colors.secondary.mediumGrayText }}>Commandes au total</p>
        </motion.div>
        <div className="w-px h-20 bg-gray-200 opacity-80 mx-8 hidden sm:block"></div>
        <motion.div
          className="flex flex-col items-center p-4"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <FiCheckCircle size={40} className="mb-3" style={{ color: colors.primary.forestGreen }} />
          <p className="text-4xl font-bold" style={{ color: colors.primary.darkText }}>{deliveredOrders}</p>
          <p className="text-base" style={{ color: colors.secondary.mediumGrayText }}>Commandes Livrées</p>
        </motion.div>
        <div className="w-px h-20 bg-gray-200 opacity-80 mx-8 hidden sm:block"></div>
        <motion.div
          className="flex flex-col items-center p-4"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <FiClock size={40} className="mb-3" style={{ color: colors.primary.crimsonRed }} />
          <p className="text-4xl font-bold" style={{ color: colors.primary.darkText }}>{pendingOrders}</p>
          <p className="text-base" style={{ color: colors.secondary.mediumGrayText }}>Commandes en cours</p>
        </motion.div>
      </motion.div>

      
      {/* List of orders */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 70, damping: 9 }}
        className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden p-6"
      >
        {allOrders.length > 0 ? (
          <div>
            {allOrders.map((order, index) => (
              <OrderCard key={order.id} order={order} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
            className="text-center py-12"
          >
            <FiTruck size={70} className="mx-auto mb-8" style={{ color: colors.primary.royalBlue }} />
            <p className="text-xl mb-6" style={{ color: colors.secondary.mediumGrayText }}>Vous n'avez pas encore passé de commandes.</p>
            <motion.button
              className="mt-6 px-10 py-5 rounded-full font-semibold shadow-lg transition-all duration-300 transform"
              style={{ backgroundColor: colors.primary.burntOrange, color: colors.primary.white }}
              whileHover={{ scale: 1.08, boxShadow: '0 8px 20px rgba(0,0,0,0.15)', backgroundColor: colors.secondary.softOrange }}
              whileTap={{ scale: 0.95 }}
            >
              Découvrir nos produits !
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default MesCommandes;