import { useState } from "react"
import {
  BookOpen,
  CheckCircle,
  Info,
  ChevronRight,
  ChevronLeft,
  User,
  Target,
  Users,
  CreditCard,
  BarChart3,
  HelpCircle,
  Play,
} from "lucide-react"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const steps = [
  {
    id: 1,
    title: "Créer un compte",
    icon: <User className="text-blue-600 dark:text-blue-400" size={32} />,
    description:
      "Cliquez sur 'Créer un compte' et remplissez le formulaire d'inscription pour accéder à votre espace Pegasio.",
    details: [
      "Rendez-vous sur la page d'inscription",
      "Remplissez vos informations personnelles",
      "Vérifiez votre adresse email",
      "Activez votre compte",
    ],
  },
  {
    id: 2,
    title: "Configurer votre profil",
    icon: <Info className="text-blue-600 dark:text-blue-400" size={32} />,
    description:
      "Ajoutez vos informations personnelles, votre entreprise et vos préférences pour personnaliser votre expérience.",
    details: [
      "Complétez vos informations personnelles",
      "Ajoutez les détails de votre entreprise",
      "Configurez vos préférences",
      "Téléchargez votre photo de profil",
    ],
  },
  {
    id: 3,
    title: "Ajouter un projet ou une mission",
    icon: <Target className="text-blue-600 dark:text-blue-400" size={32} />,
    description: "Créez un nouveau projet, définissez les objectifs, les membres de l'équipe et les échéances.",
    details: [
      "Créez un nouveau projet",
      "Définissez les objectifs et livrables",
      "Ajoutez les membres de l'équipe",
      "Planifiez les échéances",
    ],
  },
  {
    id: 4,
    title: "Gérer vos clients et factures",
    icon: <CreditCard className="text-blue-600 dark:text-blue-400" size={32} />,
    description:
      "Ajoutez vos clients, gérez les devis, factures et suivez les paiements directement depuis la plateforme.",
    details: [
      "Ajoutez vos clients",
      "Créez des devis personnalisés",
      "Générez et envoyez des factures",
      "Suivez les paiements",
    ],
  },
  {
    id: 5,
    title: "Analyser vos performances",
    icon: <BarChart3 className="text-blue-600 dark:text-blue-400" size={32} />,
    description:
      "Utilisez les tableaux de bord et rapports pour suivre l'évolution de votre activité et prendre de meilleures décisions.",
    details: [
      "Consultez vos tableaux de bord",
      "Analysez vos métriques clés",
      "Générez des rapports détaillés",
      "Exportez vos données",
    ],
  },
]

const toc = [
  { id: 0, title: "Introduction", icon: <BookOpen size={18} /> },
  { id: 1, title: "Créer un compte", icon: <User size={18} /> },
  { id: 2, title: "Configurer votre profil", icon: <Info size={18} /> },
  { id: 3, title: "Ajouter un projet", icon: <Target size={18} /> },
  { id: 4, title: "Gérer clients & factures", icon: <CreditCard size={18} /> },
  { id: 5, title: "Analyser performances", icon: <BarChart3 size={18} /> },
  { id: 6, title: "Support & FAQ", icon: <HelpCircle size={18} /> },
]

export default function GuideUtilisation() {
  const [activeStep, setActiveStep] = useState(0)

  const nextStep = () => {
    if (activeStep < toc.length - 1) {
      setActiveStep(activeStep + 1)
    }
  }

  const prevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1)
    }
  }

  const getProgressPercentage = () => {
    return (activeStep / (toc.length - 1)) * 100
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-6 py-3 rounded-full mb-6 shadow-lg border border-blue-200 dark:border-blue-800">
              <BookOpen className="text-blue-600 dark:text-blue-400" size={24} />
              <span className="text-blue-600 dark:text-blue-400 text-sm font-semibold uppercase tracking-wide">
                Guide d'utilisation
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Bien démarrer avec <span className="text-blue-600 dark:text-blue-400">Pegasio</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Suivez ce guide étape par étape pour maîtriser toutes les fonctionnalités de la plateforme et optimiser
              votre productivité.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-12">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Progression</span>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {activeStep + 1} / {toc.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-80 flex-shrink-0">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 sticky top-24">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <BookOpen size={20} />
                  Sommaire
                </h3>
                <nav className="space-y-2">
                  {toc.map((item, idx) => (
                    <button
                      key={item.id}
                      className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl transition-all duration-200 font-medium group ${
                        activeStep === idx
                          ? "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 shadow-md"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                      }`}
                      onClick={() => setActiveStep(idx)}
                    >
                      <div
                        className={`p-1 rounded-lg ${activeStep === idx ? "bg-blue-200 dark:bg-blue-800" : "bg-gray-200 dark:bg-gray-600 group-hover:bg-gray-300 dark:group-hover:bg-gray-500"}`}
                      >
                        {item.icon}
                      </div>
                      <span className="flex-1">{item.title}</span>
                      {activeStep === idx && <ChevronRight size={16} className="text-blue-600 dark:text-blue-400" />}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 lg:p-12 min-h-[600px]">
                {/* Introduction */}
                {activeStep === 0 && (
                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <BookOpen className="text-blue-600 dark:text-blue-400" size={40} />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Bienvenue dans Pegasio</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
                      Pegasio est une solution tout-en-un conçue pour simplifier la gestion de vos projets, optimiser
                      votre facturation, centraliser votre CRM et analyser vos performances. Ce guide interactif vous
                      accompagnera pas à pas pour découvrir toutes les fonctionnalités et tirer le meilleur parti de la
                      plateforme.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
                        <Users className="text-blue-600 dark:text-blue-400 mb-3" size={32} />
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Gestion d'équipe</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          Collaborez efficacement avec vos équipes
                        </p>
                      </div>
                      <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-xl">
                        <BarChart3 className="text-indigo-600 dark:text-indigo-400 mb-3" size={32} />
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Analytics avancés</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          Analysez vos performances en temps réel
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={nextStep}
                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl"
                    >
                      <Play size={20} />
                      Commencer le guide
                    </button>
                  </div>
                )}

                {/* Steps */}
                {steps.map(
                  (step, idx) =>
                    activeStep === idx + 1 && (
                      <div key={step.id}>
                        <div className="flex items-center gap-4 mb-8">
                          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                            {step.icon}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">
                              Étape {step.id}
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{step.title}</h2>
                          </div>
                        </div>

                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                          {step.description}
                        </p>

                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 mb-8">
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <CheckCircle size={20} className="text-green-600 dark:text-green-400" />
                            Points clés à retenir
                          </h3>
                          <ul className="space-y-3">
                            {step.details.map((detail, detailIdx) => (
                              <li key={detailIdx} className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full flex-shrink-0"></div>
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ),
                )}

                {/* Support & FAQ */}
                {activeStep === toc.length - 1 && (
                  <div className="text-center">
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <HelpCircle className="text-green-600 dark:text-green-400" size={40} />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Support & FAQ</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
                      Vous avez terminé le guide ! Pour toute question supplémentaire, notre équipe support est là pour
                      vous aider.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl text-left">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Centre d'aide</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                          Consultez notre base de connaissances complète
                        </p>
                        <button className="text-blue-600 dark:text-blue-400 font-medium text-sm hover:underline">
                          Accéder au centre d'aide →
                        </button>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl text-left">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Contact support</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">Notre équipe répond sous 24h</p>
                        <button className="text-green-600 dark:text-green-400 font-medium text-sm hover:underline">
                          Contacter le support →
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={prevStep}
                    disabled={activeStep === 0}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors duration-200 ${
                      activeStep === 0
                        ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <ChevronLeft size={20} />
                    Précédent
                  </button>

                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {activeStep + 1} sur {toc.length}
                  </div>

                  <button
                    onClick={nextStep}
                    disabled={activeStep === toc.length - 1}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors duration-200 ${
                      activeStep === toc.length - 1
                        ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
                    }`}
                  >
                    Suivant
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}