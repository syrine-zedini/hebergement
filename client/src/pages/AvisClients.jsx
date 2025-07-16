import React, { useState } from "react";
import { Star, User, MessageCircle, Send } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const reviews = [
  {
    name: "Sophie Martin",
    rating: 5,
    comment: "Service client réactif et plateforme très intuitive. Je recommande vivement Pegasio !",
    date: "12 mars 2024",
  },
  {
    name: "Jean Dupont",
    rating: 4,
    comment: "La gestion de projet est simplifiée, et l'équipe support est à l'écoute.",
    date: "28 février 2024",
  },
  {
    name: "Claire Dubois",
    rating: 5,
    comment: "J'ai pu automatiser ma facturation et gagner un temps précieux. Merci !",
    date: "15 janvier 2024",
  },
  {
    name: "Thomas Bernard",
    rating: 4,
    comment: "Bon rapport qualité/prix et fonctionnalités complètes.",
    date: "2 janvier 2024",
  },
];

export default function AvisClients() {
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ name: "", comment: "", rating: 5 });

  const filteredReviews = reviews.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.comment.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <main>
        <section
          id="avis-clients"
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
                <MessageCircle className="text-blue-600 dark:text-blue-400" size={28} />
                <span className="text-blue-600 dark:text-blue-400 text-sm font-semibold uppercase tracking-wide">Avis Clients</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                Ce que disent nos clients
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                Découvrez les témoignages et retours d'expérience de nos utilisateurs Pegasio.
              </p>
            </div>
            {/* Search Bar */}
            <div className="mb-12 flex items-center justify-center">
              <div className="relative w-full max-w-xl">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Rechercher un avis ou un nom..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
              {search && (
                <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
                  {filteredReviews.length} résultat{filteredReviews.length !== 1 ? 's' : ''} trouvé{filteredReviews.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>
            {/* Reviews Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {filteredReviews.length === 0 ? (
                <div className="col-span-full text-center py-16">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 border border-gray-100 dark:border-gray-700">
                    <MessageCircle className="mx-auto text-gray-400 mb-4" size={48} />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Aucun avis trouvé
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Essayez avec un autre nom ou mot-clé.
                    </p>
                  </div>
                </div>
              ) : (
                filteredReviews.map((review, idx) => (
                  <div
                    key={idx}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 flex flex-col gap-4 hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <User className="text-blue-600 dark:text-blue-400" size={28} />
                      <span className="font-semibold text-gray-900 dark:text-white text-lg">{review.name}</span>
                      <span className="text-gray-400 text-sm ml-auto">{review.date}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={
                            i < review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300 dark:text-gray-600"
                          }
                          fill={i < review.rating ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-base flex-1">{review.comment}</p>
                  </div>
                ))
              )}
            </div>
            {/* Review Submission Form (UI only) */}
            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Laisser un avis</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1">Nom</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1">Votre avis</label>
                  <textarea
                    value={form.comment}
                    onChange={e => setForm({ ...form, comment: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Votre expérience avec Pegasio..."
                    rows={3}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="block text-gray-700 dark:text-gray-300">Note :</label>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      className={`focus:outline-none ${form.rating >= star ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
                      onClick={() => setForm({ ...form, rating: star })}
                    >
                      <Star size={22} fill={form.rating >= star ? "currentColor" : "none"} />
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl mt-2"
                  disabled
                >
                  <Send size={20} />
                  Envoyer (bientôt disponible)
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 