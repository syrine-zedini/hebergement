
import React from 'react';
import { Card, Table, Tag } from 'antd';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title as ChartTitle, Tooltip, Legend, BarElement } from 'chart.js';
import { motion } from 'framer-motion'; // Import motion from framer-motion

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend
);

const documentsData = [
  {
    key: '1',
    nom: 'Facture Client A - Mars 2023',
    type: 'PDF',
    date: '15/03/2023',
    statut: 'Payé',
    tags: ['#facture', '#mars'],
  },
  {
    key: '2',
    nom: 'Contrat de Service B - V3.2',
    type: 'PDF',
    date: '22/04/2023',
    statut: 'Actif',
    tags: ['#contrat', '#service'],
  },
  {
    key: '3',
    nom: 'Facture Fournisseur C - Jan 2023',
    type: 'PDF',
    date: '05/01/2023',
    statut: 'Impayé',
    tags: ['#facture', '#fournisseur'],
  },
  {
    key: '4',
    nom: 'Contrat de Partenariat - Marketing',
    type: 'PPT',
    date: '18/05/2023',
    statut: 'Actif',
    tags: ['#contrat', '#marketing'],
  },
];

// Helper function to get status-based colors for Ant Design Tag
const getStatusColor = (status) => {
    switch (status) {
      case "Payé":
      case "Actif":
        return "bg-green-100 text-green-800 border border-green-200"; // Green from Paiements for 'Payé'/'Actif'
      case "En retard": // Mapping 'En retard' from Paiements
      case "Impayé":
        return "bg-red-100 text-red-800 border border-red-200"; // Red from Paiements for 'En retard'/'Impayé'
      default: return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };


const columns = [
  {
    title: <span className="text-gray-700 font-semibold">Nom du document</span>, // Adjusted to a common gray
    dataIndex: 'nom',
    key: 'nom',
    render: (text) => <a className="text-blue-600 hover:text-blue-800 transition-colors duration-300">{text}</a>,
  },
  {
    title: <span className="text-gray-700 font-semibold">Type</span>, // Adjusted
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: <span className="text-gray-700 font-semibold">Date</span>, // Adjusted
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: <span className="text-gray-700 font-semibold">Statut</span>, // Adjusted
    dataIndex: 'statut',
    key: 'statut',
    render: (statut) => (
      <Tag className={`animate-fade-in ${getStatusColor(statut)}`}>{statut}</Tag> // Using the new getStatusColor
    ),
  },
  {
    title: <span className="text-gray-700 font-semibold">Tags</span>, // Adjusted
    dataIndex: 'tags',
    key: 'tags',
    render: (tags) => (
      <>
        {tags.map((tag) => (
          <Tag color="purple" key={tag} className="animate-fade-in"> {/* Using a purple from the Paiements vibe */}
            {tag}
          </Tag>
        ))}
      </>
    ),
  },
];

// Data for the Line Chart - Adjusted colors
const lineChartData = {
  labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
  datasets: [
    {
      label: 'Contrats Signés',
      data: [3, 5, 4, 7, 6, 8],
      fill: true, // Fill area under the line for a softer look
      backgroundColor: 'rgba(124, 58, 237, 0.2)', // Violet-500 from Paiements
      borderColor: 'rgb(124, 58, 237)', // Violet-500 from Paiements
      tension: 0.3, // Makes the line curve slightly for elegance
    },
  ],
};

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        font: { size: 14, weight: 'bold' },
        color: '#333', // From Paiements
      }
    },
    title: {
      display: true,
      text: 'Évolution des Contrats Signés',
      font: {
        size: 20, // Larger title for elegance
        weight: 'bold',
      },
      color: '#6B7280', // Gray-500 from Paiements for chart titles
    },
    tooltip: { // Consistent tooltip style
      backgroundColor: 'rgba(0,0,0,0.7)',
      bodyFont: { size: 14 },
      titleFont: { size: 16, weight: 'bold' },
    }
  },
  scales: {
    x: {
      ticks: { color: '#4B5563' }, // Gray-600 from Paiements
      grid: { display: false } // No vertical grid lines
    },
    y: {
      ticks: { color: '#4B5563' },
      grid: { color: '#E5E7EB' } // Light gray horizontal grid lines from Paiements
    }
  }
};

// Data for the Bar Chart - Adjusted colors
const barChartData = {
  labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
  datasets: [
    {
      label: 'Factures Émises',
      data: [12, 19, 3, 5, 2, 9],
      backgroundColor: [ // Using Paiements green and red, and other complementary colors
        'rgba(34, 197, 94, 0.6)', // Green-500 from Paiements
        'rgba(239, 68, 68, 0.6)', // Red-500 from Paiements
        'rgba(255, 206, 86, 0.5)', // Yellow
        'rgba(75, 192, 192, 0.5)', // Cyan
        'rgba(153, 102, 255, 0.5)', // Light purple
        'rgba(255, 159, 64, 0.5)', // Orange
      ],
      borderColor: [
        'rgba(34, 197, 94, 1)',
        'rgba(239, 68, 68, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const barChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        font: { size: 14, weight: 'bold' },
        color: '#333',
      }
    },
    title: {
      display: true,
      text: 'Nombre de Factures Émises par Mois',
      font: {
        size: 20, // Larger title
        weight: 'bold',
      },
      color: '#6B7280', // Gray-500
    },
    tooltip: {
      backgroundColor: 'rgba(0,0,0,0.7)',
      bodyFont: { size: 14 },
      titleFont: { size: 16, weight: 'bold' },
    }
  },
  scales: {
    x: {
      ticks: { color: '#4B5563' },
      grid: { display: false }
    },
    y: {
      beginAtZero: true,
      ticks: { color: '#4B5563', precision: 0 },
      grid: { color: '#E5E7EB' }
    }
  }
};


const PegasioDashboard = () => {
  // Define colors directly within the component or import them if available globally
  const colors = {
    primary: {
      darkText: '#333333',
      darkRed: '#8B0000',
    },
  };

  return (
    <div className="space-y-8 p-8 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen animate-fade-in-up"> {/* Background from Paiements */}

      {/* Accès rapide Section - NOW AT THE VERY TOP */}
      {/* Applied characteristics from the provided header */}
      <motion.header
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-10 flex justify-center items-center" // Centered
      >
        <h1 className="text-4xl font-extrabold drop-shadow-sm">
          <span style={{ color: colors.primary.darkText }}>Accès rapide à </span>
          <span style={{ color: colors.primary.darkRed }}>vos documents</span>
        </h1>
      </motion.header>

      <Card className="shadow-xl rounded-2xl border-0 transform transition-transform duration-500 hover:scale-[1.01]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
          <button className="bg-purple-100 hover:bg-purple-200 text-purple-800 p-6 rounded-xl text-center font-semibold transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg flex flex-col items-center justify-center"> {/* Purple tint */}
            <div className="text-4xl mb-3">💰</div>
            Factures
          </button>
          <button className="bg-green-100 hover:bg-green-200 text-green-800 p-6 rounded-xl text-center font-semibold transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg flex flex-col items-center justify-center">
            <div className="text-4xl mb-3">🤝</div>
            Contrats
          </button>
          <button className="bg-red-100 hover:bg-red-200 text-red-800 p-6 rounded-xl text-center font-semibold transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg flex flex-col items-center justify-center">
            <div className="text-4xl mb-3">⚙️</div>
            Support technique
          </button>
        </div>
      </Card>

      {/* Charts Section - Now after "Accès rapide" */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card title={<span className="text-2xl font-bold text-indigo-700 animate-slide-in-left">Statistiques des contrats</span>} className="shadow-xl rounded-2xl border-0 transform transition-transform duration-500 hover:scale-[1.01]"> {/* Title color from Paiements */}
          <div className="p-4">
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </Card>

        <Card title={<span className="text-2xl font-bold text-pink-700 animate-slide-in-right">Statistiques des factures</span>} className="shadow-xl rounded-2xl border-0 transform transition-transform duration-500 hover:scale-[1.01]"> {/* Title color from Paiements */}
          <div className="p-4">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </Card>
      </div>

      {/* Factures & Contrats Section - NOW AT THE END */}
      <Card
        title={<span className="text-xl font-bold text-gray-800">Gestion des documents</span>} // Title color from Paiements
        className="shadow-xl rounded-2xl border-0 transform transition-transform duration-500 hover:scale-[1.01]"
        extra={
          <button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
            Télécharger tous
          </button>
        }
      >
        <Table
          columns={columns}
          dataSource={documentsData}
          pagination={{ pageSize: 5 }}
          className="mt-6 animate-fade-in"
          scroll={{ x: 'max-content' }}
        />
      </Card>
    </div>
  );
};

export default PegasioDashboard;
