import { useState } from "react";
import { Link } from "react-router-dom";
import image from "../assets/logo.png";

import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Send } from "lucide-react";

export default function Footer() {
    const [email, setEmail] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        setIsSubscribed(true);
        setTimeout(() => {
            setIsSubscribed(false);
            setEmail("");
        }, 3000);
    };

    return (
        <footer className="relative bg-black text-white overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 opacity-50">
                <div className="w-full h-full bg-repeat" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}></div>
            </div>

            <div className="max-w-7xl mx-auto">
                {/* Main Footer Content - Two Section Layout with spacing */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[500px]">
                    
                    {/* Left Section - Company Info */}
                    <div className="bg-slate-800 p-8 lg:p-12 flex flex-col justify-between rounded-r-3xl lg:rounded-r-none">
                        <div>
                            <div className="flex items-center space-x-3 mb-8">
                                <Link to="/" className="flex items-center space-x-2">
                                    <img
                                        src={image}
                                        alt="Pegasio Logo"
                                        className="h-16 w-auto drop-shadow-lg transition-all duration-300"
                                    />
                                </Link>
                            </div>

                            <p className="text-slate-300 leading-relaxed text-base mb-8 max-w-md">
                                Pegasio est une solution 100% digitale qui répond à l'intégralité des besoins des entrepreneurs : création d'entreprise, démarches juridiques, gestion administrative, facturation, comptabilité, etc. Grâce à l'accompagnement d'experts juridiques dédiés, les professionnels disposent d'une offre complète, fiable et rassurante, au meilleur prix.
                            </p>

                            <div className="space-y-2 mb-8">
                                <p className="text-white font-semibold">Yolaw SAS</p>
                                <p className="text-slate-300">50 rue d'Hauteville</p>
                                <p className="text-slate-300">75010 PARIS</p>
                            </div>

                            <div className="space-y-3">
                                <div className="text-slate-300">
                                    <Link 
                                        to="#contact" 
                                        className="hover:text-white transition-colors underline"
                                    >
                                        Contactez-nous
                                    </Link>
                                </div>
                                <div className="flex items-center space-x-3 text-slate-300">
                                    <Phone size={18} className="text-red-500" />
                                    <span>01 76 39 00 60</span>
                                </div>
                                <p className="text-slate-400 text-sm">Du lundi au vendredi de 9h à 19h</p>
                            </div>
                        </div>

                        {/* Newsletter Section */}
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold text-white mb-4 relative">
                                Newsletter
                                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
                            </h3>
                            <form onSubmit={handleSubscribe} className="space-y-3">
                                <div className="relative">
                                    <input
                                        type="email"
                                        required
                                        placeholder="Votre adresse email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-slate-400 transition-all"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubscribed}
                                    className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                                >
                                    {isSubscribed ? (
                                        <span>✓ Abonné!</span>
                                    ) : (
                                        <>
                                            <Send size={18} />
                                            <span>S'abonner</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right Section - Services & Links with added left margin for spacing */}
                    <div className="bg-slate-900 p-8 lg:p-12 lg:ml-8 rounded-l-3xl lg:rounded-l-none">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full">
                            
                            {/* Services juridiques */}
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-6 relative">
                                    Services juridiques
                                    <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
                                </h3>
                                <ul className="space-y-3">
                                    {[
                                        "Création d'entreprise",
                                        "Modification d'entreprise", 
                                        "Fermeture d'entreprise",
                                        "Tous les services",
                                        "Nos tarifs"
                                    ].map((service) => (
                                        <li key={service}>
                                            <a
                                                href="#"
                                                className="text-slate-300 hover:text-white transition-colors text-sm underline flex items-center group"
                                            >
                                                <span className="w-2 h-2 bg-red-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                                {service}
                                            </a>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-8">
                                    <h4 className="text-lg font-semibold text-white mb-4 relative">
                                        Abonnement
                                        <div className="absolute -bottom-2 left-0 w-8 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
                                    </h4>
                                    <ul className="space-y-3">
                                        {[
                                            "Comptastart",
                                            "Assistance juridique",
                                            "Service Obligations Juridiques",
                                            "Tous nos abonnements"
                                        ].map((item) => (
                                            <li key={item}>
                                                <a
                                                    href="#"
                                                    className="text-slate-300 hover:text-white transition-colors text-sm underline flex items-center group"
                                                >
                                                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                                    {item}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Contenus */}
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-6 relative">
                                    Contenus
                                    <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
                                </h3>
                                <ul className="space-y-3">
                                    {[
                                        "Fiches pratiques",
                                        "Guides pratiques",
                                        "Modèles",
                                        "Webinars"
                                    ].map((content) => (
                                        <li key={content}>
                                            <a
                                                href="#"
                                                className="text-slate-300 hover:text-white transition-colors text-sm underline flex items-center group"
                                            >
                                                <span className="w-2 h-2 bg-red-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                                {content}
                                            </a>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-8">
                                    <h4 className="text-lg font-semibold text-white mb-4 relative">
                                        Autres informations
                                        <div className="absolute -bottom-2 left-0 w-8 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
                                    </h4>
                                    <ul className="space-y-3">
                                        {[
                                            "Mentions légales",
                                            "Conditions générales",
                                            "CGU avocats",
                                            "Charte sur la vie privée",
                                            "Gestion des cookies"
                                        ].map((info) => (
                                            <li key={info}>
                                                <a
                                                    href="#"
                                                    className="text-slate-300 hover:text-white transition-colors text-sm underline flex items-center group"
                                                >
                                                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                                    {info}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Liens utiles */}
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-6 relative">
                                    Liens utiles
                                    <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
                                </h3>
                                <ul className="space-y-3">
                                    {[
                                        "L'équipe Legalstart",
                                        "Nous rejoindre",
                                        "Articles de presse",
                                        "Partenaires et soutiens",
                                        "Services partenaires",
                                        "Moyen de paiement",
                                        "Plan du site",
                                        "FAQ"
                                    ].map((link) => (
                                        <li key={link}>
                                            <a
                                                href="#"
                                                className="text-slate-300 hover:text-white transition-colors text-sm underline flex items-center group"
                                            >
                                                <span className="w-2 h-2 bg-red-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="bg-slate-900 border-t border-slate-700 px-8 lg:px-12 py-6">
                    <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
                        
                        {/* Copyright and disclaimer */}
                        <div className="text-center lg:text-left">
                            <p className="text-slate-400 text-sm mb-2">
                                Informations importantes sur les services et abonnements fournis par Legalstart : Legalstart est développé par Yolaw
                            </p>
                            <p className="text-slate-500 text-xs">
                                © {new Date().getFullYear()} <span className="text-red-400 font-semibold">Pegasio</span>. Tous droits réservés.
                            </p>
                        </div>

                        {/* Social Media */}
                        <div className="flex items-center space-x-4">
                            {[
                                { Icon: Facebook, url: "https://facebook.com", label: "Facebook", color: "hover:text-blue-500" },
                                { Icon: Twitter, url: "https://twitter.com", label: "Twitter", color: "hover:text-sky-400" },
                                { Icon: Instagram, url: "https://instagram.com", label: "Instagram", color: "hover:text-pink-500" },
                                { Icon: Linkedin, url: "https://linkedin.com", label: "LinkedIn", color: "hover:text-blue-600" },
                            ].map(({ Icon, url, label, color }) => (
                                <a
                                    key={label}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className={`p-2 bg-slate-800 rounded-full text-slate-400 ${color} transition-all duration-200 hover:scale-110`}
                                >
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}