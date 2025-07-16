import React from 'react';
import { Card, Table, Tag } from 'antd'; // Import Ant Design components
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title as ChartTitle, Tooltip, Legend, BarElement } from 'chart.js';

// Register Chart.js components – This is crucial for charts to render
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

const Paiements = () => {
  // Simulated data (replace with your actual API data)
  const paymentData = [
    { id: "#0012", date: "15/06/2024", amount: "750.00", status: "Payé", method: "Carte Bancaire", invoice: "#" },
    { id: "#0011", date: "15/05/2024", amount: "750.00", status: "Payé", method: "Virement", invoice: "#" },
    { id: "#0010", date: "15/04/2024", amount: "750.00", status: "Payé", method: "PayPal", invoice: "#" },
    { id: "#0009", date: "15/03/2024", amount: "200.00", status: "En retard", method: "Virement", invoice: "#" },
    { id: "#0008", date: "15/02/2024", amount: "750.00", status: "Payé", method: "Carte Bancaire", invoice: "#" },
    { id: "#0007", date: "15/01/2024", amount: "750.00", status: "Payé", method: "Virement", invoice: "#" },
  ];

  // Data for the Line Chart: Monthly Payments
  const monthlyPaymentsData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Paiements Reçus (€)',
        data: [750, 750, 200, 750, 750, 750], // Data corresponding to your paymentData for these months
        fill: true,
        backgroundColor: 'rgba(124, 58, 237, 0.2)', // Violet-500 with transparency
        borderColor: 'rgb(124, 58, 237)', // Violet-500
        tension: 0.3, // Makes the line curve slightly
      },
    ],
  };

  const monthlyPaymentsOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: 'bold',
          },
          color: '#333',
        }
      },
      title: {
        display: true,
        text: 'Flux Mensuel des Paiements',
        font: {
          size: 20,
          weight: 'bold',
        },
        color: '#6B7280', // Gray-500 for chart titles
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        bodyFont: {
          size: 14,
        },
        titleFont: {
          size: 16,
          weight: 'bold',
        },
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#4B5563', // Gray-600
        },
        grid: {
          display: false, // No vertical grid lines
        }
      },
      y: {
        ticks: {
          color: '#4B5563',
        },
        grid: {
          color: '#E5E7EB', // Light gray horizontal grid lines
        }
      }
    }
  };

  // Data for the Bar Chart: Payment Status Distribution
  const paymentStatusData = {
    labels: ['Payé', 'En retard'], // Based on your current paymentData
    datasets: [
      {
        label: 'Nombre de Paiements',
        data: [5, 1], // 5 'Payé', 1 'En retard' from paymentData
        backgroundColor: [
          'rgba(34, 197, 94, 0.6)', // Green-500 for 'Payé'
          'rgba(239, 68, 68, 0.6)', // Red-500 for 'En retard'
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const paymentStatusOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: 'bold',
          },
          color: '#333',
        }
      },
      title: {
        display: true,
        text: 'Répartition des Statuts de Paiement',
        font: {
          size: 20,
          weight: 'bold',
        },
        color: '#6B7280',
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        bodyFont: {
          size: 14,
        },
        titleFont: {
          size: 16,
          weight: 'bold',
        },
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#4B5563',
        },
        grid: {
          display: false,
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#4B5563',
          precision: 0 // No decimals for counts
        },
        grid: {
          color: '#E5E7EB',
        }
      }
    }
  };

  // Helper function to get status-based colors for Ant Design Tag
  const getStatusColor = (status) => {
    switch (status) {
      case "Payé": return "bg-green-100 text-green-800 border border-green-200";
      case "En retard": return "bg-red-100 text-red-800 border border-red-200";
      default: return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen space-y-10 animate-fade-in-up">

      {/* Main Header for the Dashboard - Updated to match sidebar background */}
      <div className="bg-gradient-to-br from-red-100 via-red-50 to-gray-100 text-gray-800 p-8 rounded-2xl shadow-lg transform transition-transform duration-500 hover:scale-[1.01] animate-slide-in-right">
        {/* Changed text color to a darker shade for readability on light background */}
        <h1 className="text-3xl font-extrabold mb-2 animate-pulse-light">Tableau de bord des paiements</h1>
        <p className="text-lg opacity-90 font-light">Suivez l'historique de vos transactions et vos échéances.</p>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">
        <Card
          title={<span className="text-lg font-bold text-gray-700">Solde actuel</span>}
          className="shadow-xl rounded-xl border-0 transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
          <p className="text-2xl font-extrabold text-blue-700">€2,450.00</p>
        </Card>
        <Card
          title={<span className="text-lg font-bold text-gray-700">Dernier paiement</span>}
          className="shadow-xl rounded-xl border-0 transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
          <p className="text-2xl font-extrabold text-green-600">15 Juin 2024</p>
        </Card>
        <Card
          title={<span className="text-lg font-bold text-gray-700">Prochaine échéance</span>}
          className="shadow-xl rounded-xl border-0 transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
          <p className="text-2xl font-extrabold text-red-600">15 Juillet 2024</p>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card
          title={<span className="text-2xl font-bold text-indigo-700 animate-slide-in-left">Flux mensuel</span>}
          className="shadow-xl rounded-2xl border-0 transform transition-transform duration-500 hover:scale-[1.01]"
        >
          <div className="p-4">
            <Line data={monthlyPaymentsData} options={monthlyPaymentsOptions} />
          </div>
        </Card>

        <Card
          title={<span className="text-2xl font-bold text-pink-700 animate-slide-in-right">Statut des paiements</span>}
          className="shadow-xl rounded-2xl border-0 transform transition-transform duration-500 hover:scale-[1.01]"
        >
          <div className="p-4">
            <Bar data={paymentStatusData} options={paymentStatusOptions} />
          </div>
        </Card>
      </div>

      {/* Transactions Table using Ant Design Table */}
      <Card
        title={<span className="text-xl font-bold text-gray-800 animate-fade-in">Liste des transactions</span>}
        className="shadow-xl rounded-2xl border-0 transform transition-transform duration-500 hover:scale-[1.01]"
        extra={
          <button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-5 py-2 rounded-full text-md font-semibold shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
            Exporter (PDF/Excel)
          </button>
        }
      >
        <Table
          dataSource={paymentData.map(data => ({ ...data, key: data.id }))}
          columns={[
            {
              title: 'ID',
              dataIndex: 'id',
              key: 'id',
            },
            {
              title: 'Date',
              dataIndex: 'date',
              key: 'date',
            },
            {
              title: 'Montant (€)',
              dataIndex: 'amount',
              key: 'amount',
              render: (text) => <span className="font-bold text-gray-900">{text}</span>,
            },
            {
              title: 'Statut',
              dataIndex: 'status',
              key: 'status',
              render: (status) => (
                <Tag className={`px-2 py-1 text-xs rounded-full font-semibold ${getStatusColor(status)}`}>
                  {status}
                </Tag>
              ),
            },
            {
              title: 'Méthode',
              dataIndex: 'method',
              key: 'method',
            },
            {
              title: 'Facture',
              dataIndex: 'invoice',
              key: 'invoice',
              render: (invoice) => (
                <a href={invoice} className="text-blue-600 hover:underline transition-colors duration-300">Télécharger</a>
              ),
            },
          ]}
          pagination={{ pageSize: 5 }}
          className="mt-6 animate-fade-in"
          scroll={{ x: 'max-content' }}
        />
      </Card>

      {/* Quick Action Buttons */}
      <div className="mt-8 flex justify-center animate-fade-in-up">
        <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-4 rounded-xl shadow-md hover:shadow-lg flex items-center justify-center gap-3 font-semibold text-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1">
          <span role="img" aria-label="payer">💳</span> Payer maintenant
        </button>
      </div>
    </div>
  );
};

export default Paiements;