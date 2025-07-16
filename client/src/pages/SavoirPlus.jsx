import React, { useState } from "react";
import { Search, HelpCircle, BookOpen, FileText, Video, Users, ChevronRight, Star, Clock, Tag } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTranslation } from 'react-i18next';

export default function SavoirPlus() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

 

  const quickActions = [
    { title: t('savoir.quickActions.support'), icon: HelpCircle, action: "support" },
    { title: t('savoir.quickActions.videos'), icon: Video, action: "videos" },
    { title: t('savoir.quickActions.api'), icon: FileText, action: "api" },
    { title: t('savoir.quickActions.community'), icon: Users, action: "community" }
  ];

  const featuredArticles = [
    {
      id: 1,
      title: "Comment créer votre premier projet dans CRP MEMO",
      excerpt: "Guide étape par étape pour démarrer efficacement avec votre premier projet.",
      category: "Premiers pas",
      readTime: "5 min",
      rating: 4.8,
      views: 1250,
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

 
  const categories = [
    "all",
    ...Array.from(new Set(featuredArticles.map(article => article.category)))
  ];

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "80vh" }}>
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-black dark:via-gray-900 dark:to-blue-900 min-h-screen py-20">
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
            <HelpCircle className="text-blue-600 dark:text-blue-400" size={20} />
            <span className="text-blue-600 dark:text-blue-400 text-sm font-semibold uppercase tracking-wide">
              {t('savoir.headerTag')}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            {t('savoir.title')}
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            {t('savoir.subtitle')}
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={t('savoir.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors shadow-lg text-lg"
            />
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 group"
              >
                <action.icon className="mx-auto mb-3 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" size={32} />
                <span className="text-gray-900 dark:text-white font-medium text-sm">{action.title}</span>
              </button>
            ))}
          </div>
        </div>

      

      
          
        

        
      </div>
    </section>
    </main>
    </>
  );
}