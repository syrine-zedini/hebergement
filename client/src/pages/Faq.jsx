import React, { useState } from "react";
import { ChevronDown, ChevronUp, Search, HelpCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const faqData = [
  {
    question: "Comment puis-je créer un compte sur Pegasio ?",
    answer:
      "Cliquez sur 'Créer un compte' en haut à droite et remplissez le formulaire d'inscription. Vous recevrez un email de confirmation pour activer votre compte.",
  },
  {
    question: "Puis-je modifier mon abonnement à tout moment ?",
    answer:
      "Oui, vous pouvez passer à une formule supérieure ou inférieure à tout moment depuis votre espace utilisateur, sans frais supplémentaires.",
  },
  {
    question: "Mes données sont-elles sécurisées ?",
    answer:
      "Absolument. Nous utilisons des protocoles de sécurité avancés et vos données sont chiffrées et sauvegardées régulièrement.",
  },
  {
    question: "Comment contacter le support client ?",
    answer:
      "Vous pouvez nous contacter via le formulaire de contact, par email ou par téléphone. Notre équipe vous répondra dans les plus brefs délais.",
  },
  {
    question: "Y a-t-il une période d'essai gratuite ?",
    answer:
      "Oui, nous proposons une période d'essai gratuite de 14 jours pour découvrir toutes les fonctionnalités de Pegasio.",
  },
];

export default function Faq() {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  const filteredFaqs = faqData.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase()) ||
    faq.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <main>
        <section
          id="faq"
          className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900 py-20 min-h-screen"
        >
          {/* Animated background blobs */}
          <div className="absolute inset-0 z-0">
            <div className="blob blob1"></div>
            <div className="blob blob2"></div>
          </div>
          {/* Content Container */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/20 px-6 py-3 rounded-full mb-6">
                <HelpCircle className="text-blue-600 dark:text-blue-400" size={28} />
                <span className="text-blue-600 dark:text-blue-400 text-sm font-semibold uppercase tracking-wide">FAQ</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                Questions Fréquemment <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Posées</span>
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                Retrouvez ici les réponses aux questions les plus courantes sur Pegasio, nos services et nos offres d'abonnement.
              </p>
            </div>
            {/* Search Bar */}
            <div className="mb-12 flex items-center justify-center">
              <div className="relative w-full max-w-xl">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Rechercher une question ou un mot-clé..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
              {search && (
                <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
                  {filteredFaqs.length} résultat{filteredFaqs.length !== 1 ? 's' : ''} trouvé{filteredFaqs.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>
            {/* FAQ List */}
            <div className="space-y-4">
              {filteredFaqs.length === 0 ? (
                <div className="text-center py-16">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 border border-gray-100 dark:border-gray-700">
                    <HelpCircle className="mx-auto text-gray-400 mb-4" size={48} />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Aucun résultat trouvé
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Essayez avec d'autres mots-clés ou consultez toutes nos questions.
                    </p>
                  </div>
                </div>
              ) : (
                filteredFaqs.map((faq, idx) => (
                  <div
                    key={faq.question}
                    className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 overflow-hidden"
                  >
                    <button
                      className="w-full flex justify-between items-center px-6 sm:px-8 py-6 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-2xl"
                      onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                      aria-expanded={openIndex === idx}
                      aria-controls={`faq-panel-${idx}`}
                    >
                      <span className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors duration-200 pr-4 leading-tight">
                        {faq.question}
                      </span>
                      <div className="flex-shrink-0 ml-4">
                        {openIndex === idx ? (
                          <ChevronUp className="text-blue-600 dark:text-blue-400 transform transition-transform duration-200" size={24} />
                        ) : (
                          <ChevronDown className="text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transform transition-all duration-200" size={24} />
                        )}
                      </div>
                    </button>
                    <div
                      id={`faq-panel-${idx}`}
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        openIndex === idx 
                          ? "max-h-96 opacity-100" 
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="px-6 sm:px-8 pb-6">
                        <div className="border-l-4 border-blue-100 dark:border-blue-900 pl-4">
                          <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}