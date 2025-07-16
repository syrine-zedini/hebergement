import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Icônes SVG personnalisées
const HomeIcon = ({ size = 22, className = '' }) => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height={size} width={size} className={className}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const ShoppingBagIcon = ({ size = 22, className = '' }) => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height={size} width={size} className={className}>
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
);

const CreditCardIcon = ({ size = 22, className = '' }) => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height={size} width={size} className={className}>
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
    <line x1="1" y1="10" x2="23" y2="10"></line>
  </svg>
);

const FileTextIcon = ({ size = 22, className = '' }) => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height={size} width={size} className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const NavItem = ({ icon: IconComponent, text, active, to, onClick, sidebarOpen }) => (
  <Link to={to} className="block" onClick={onClick}>
    <div className={`flex items-center p-4 my-2 mx-3 rounded-xl transition-all duration-300
      ${active ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg' :
        'text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-red-500/50 hover:to-red-600/50'}
      hover:scale-[1.02] hover:shadow-md`}>
      <div className="mr-3 relative"
        style={{
          transform: active ? 'scale(1.2)' : 'scale(1)',
          transition: 'transform 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55)'
        }}>
        <IconComponent className={`${active ? 'text-white' : 'text-gray-700'} drop-shadow-md`} />
      </div>
      <span className={`font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ease-out
        ${sidebarOpen ? 'w-auto opacity-100' : 'w-0 opacity-0'}`}>
        {text}
      </span>
    </div>
  </Link>
);

const AsideBarClient = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const activeTab = location.pathname.split('/').pop() || 'dashboard';

  const [hoverRight, setHoverRight] = useState(false);
  const effectiveOpen = sidebarOpen || hoverRight;

  const menuItems = [
    { icon: HomeIcon, text: "Dashboard", to: "/home/dashboard" },
    { icon: ShoppingBagIcon, text: "Mes commandes", to: "/home/commandes" },
    { icon: CreditCardIcon, text: "Paiement", to: "/home/paiements" },
    { icon: FileTextIcon, text: "Mes documents", to: "/home/documents" }
  ];

  const handleItemClick = () => {
    if (!sidebarOpen) setSidebarOpen(true);
  };

  return (
    <div
      className="fixed top-0 left-0 h-full z-40 flex flex-col bg-gradient-to-br from-red-100 via-red-50 to-gray-100 backdrop-blur-sm border-r border-red-200 shadow-lg"
      style={{
        width: effectiveOpen ? 280 : 90,
        transition: 'width 0.3s ease',
      }}
    >
      {/* Espace vide à la place du logo */}
      <div className="p-5 flex items-center justify-center border-b border-red-200">
        <div className={effectiveOpen ? 'h-40' : 'h-20'} />
      </div>

      <nav className="mt-8 flex-1 overflow-y-auto px-2 pb-4">
        {menuItems.map((item) => (
          <NavItem
            key={item.text}
            icon={item.icon}
            text={item.text}
            active={activeTab === item.to.split('/').pop()}
            to={item.to}
            onClick={handleItemClick}
            sidebarOpen={effectiveOpen}
          />
        ))}
      </nav>

      {/* Zone invisible à droite pour hover qui élargit la sidebar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 5,
          height: '100%',
          cursor: 'ew-resize',
          zIndex: 100,
        }}
        onMouseEnter={() => setHoverRight(true)}
        onMouseLeave={() => setHoverRight(false)}
      />
    </div>
  );
};

export default AsideBarClient;
