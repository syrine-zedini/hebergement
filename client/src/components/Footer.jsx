
import { useState } from "react";
import { Link } from "react-router-dom";
import image from "../assets/logo.png";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Send } from "lucide-react";
import { useTranslation } from 'react-i18next';

export default function Footer() {
    const [email, setEmail] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);
    const { t, i18n } = useTranslation();

    const handleSubscribe = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:8080/api/newsletter/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (data.success) {
                setIsSubscribed(true);
                setEmail("");
                setTimeout(() => {
                    setIsSubscribed(false);
                }, 3000);
            } else {
                // Handle error response
                alert(data.message || 'Subscription failed. Please try again.');
            }
        } catch (error) {
            console.error('Newsletter subscription error:', error);
            alert('Failed to subscribe. Please check your connection and try again.');
        }
    };

    const handleLanguageChange = (e) => {
        i18n.changeLanguage(e.target.value);
        localStorage.setItem('i18nextLng', e.target.value);
    };

    return (
        <footer className="relative bg-gray-900 text-white overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')]"></div>
            </div>

            {/* Gradient accent */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
                {/* Two main sections */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
                    {/* Left section - Contact info */}
                    <div className="lg:col-span-1 bg-gray-800/50 p-8 rounded-xl border border-gray-700 backdrop-blur-sm">
                        <div className="flex flex-col h-full">
                            {/* Logo */}
                            <Link to="/" className="inline-flex justify-center lg:justify-start mb-8 group">
                                <img
                                    src={image}
                                    alt="Pegasio Logo"
                                    className="h-24 w-auto transition-transform duration-300 group-hover:scale-105"
                                />
                            </Link>

                            {/* Description */}
                            <p className="text-gray-400 text-center lg:text-left leading-relaxed mb-8">
                                Solution 100% digitale pour entrepreneurs : création d'entreprise, démarches juridiques, gestion administrative, facturation et comptabilité.
                            </p>

                            {/* Contact info */}
                            <div className="space-y-4 mb-8">
                                <div className="flex items-start gap-4 p-4 bg-gray-700/50 rounded-lg">
                                    <MapPin className="flex-shrink-0 mt-1 text-red-400" size={20} />
                                    <span className="text-gray-300">50 rue d'Hauteville, 75010 PARIS</span>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-gray-700/50 rounded-lg">
                                    <Phone className="text-red-400" size={20} />
                                    <a href="tel:0176390060" className="text-gray-300 hover:text-white transition-colors">01 76 39 00 60</a>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-gray-700/50 rounded-lg">
                                    <Mail className="text-red-400" size={20} />
                                    <a href="mailto:contact@pegasio.com" className="text-gray-300 hover:text-white transition-colors">contact@pegasio.com</a>
                                </div>
                            </div>

                            {/* Social media */}
                            <div className="mt-auto">
                                <h3 className="text-lg font-semibold text-white mb-4 text-center lg:text-left">
                                    {t('footer.follow_us')}
                                </h3>
                                <div className="flex justify-center lg:justify-start space-x-4">
                                    {[
                                        { Icon: Facebook, url: "#", color: "hover:bg-blue-600" },
                                        { Icon: Twitter, url: "#", color: "hover:bg-sky-500" },
                                        { Icon: Instagram, url: "#", color: "hover:bg-gradient-to-r hover:from-purple-600 hover:via-pink-600 hover:to-yellow-500" },
                                        { Icon: Linkedin, url: "#", color: "hover:bg-blue-700" },
                                    ].map(({ Icon, url, color }, index) => (
                                        <a
                                            key={index}
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`p-3 bg-gray-700 rounded-full text-gray-300 ${color} hover:text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
                                        >
                                            <Icon size={20} />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right section - Other links */}
                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Services section */}
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-gray-700 relative">
                                    <span className="relative">
                                        {t('footer.services')}
                                        <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-red-500 to-blue-500 rounded-full"></span>
                                    </span>
                                </h3>
                                <ul className="space-y-3">
                                    {[
                                        t('footer.company_creation'),
                                        t('footer.company_modification'), 
                                        t('footer.company_closure'),
                                        t('footer.all_services'),
                                        t('footer.prices')
                                    ].map((service) => (
                                        <li key={service}>
                                            <a
                                                href="#"
                                                className="text-gray-400 hover:text-white transition-colors flex items-center group"
                                            >
                                                <span className="w-2 h-2 bg-gradient-to-r from-red-500 to-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                                {service}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Content section */}
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-gray-700 relative">
                                    <span className="relative">
                                        {t('footer.resources')}
                                        <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-red-500 to-blue-500 rounded-full"></span>
                                    </span>
                                </h3>
                                <ul className="space-y-3">
                                    {[
                                        t('footer.practical_sheets'),
                                        t('footer.practical_guides'),
                                        t('footer.templates'),
                                        t('footer.webinars'),
                                        t('footer.blog'),
                                        t('footer.faq')
                                    ].map((content) => (
                                        <li key={content}>
                                            <a
                                                href="#"
                                                className="text-gray-400 hover:text-white transition-colors flex items-center group"
                                            >
                                                <span className="w-2 h-2 bg-gradient-to-r from-red-500 to-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                                {content}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Legal section */}
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-gray-700 relative">
                                    <span className="relative">
                                        {t('footer.company')}
                                        <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-red-500 to-blue-500 rounded-full"></span>
                                    </span>
                                </h3>
                                <ul className="space-y-3">
                                    {[
                                        t('footer.about'),
                                        t('footer.team'),
                                        t('footer.join_us'),
                                        t('footer.partners'),
                                        t('footer.press'),
                                        t('footer.legal_notices'),
                                        t('footer.cgu'),
                                        t('footer.confidentiality')
                                    ].map((item) => (
                                        <li key={item}>
                                            <a
                                                href="#"
                                                className="text-gray-400 hover:text-white transition-colors flex items-center group"
                                            >
                                                <span className="w-2 h-2 bg-gradient-to-r from-red-500 to-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                                {item}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div className="mt-10 bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                            <h3 className="text-xl font-semibold text-white mb-4 text-center">
                                {t('footer.stay_informed')}
                            </h3>
                            <form onSubmit={handleSubscribe} className="max-w-2xl mx-auto">
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <input
                                        type="email"
                                        required
                                        placeholder={t('footer.email_placeholder')}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="flex-1 px-5 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-400 transition-all"
                                    />
                                    <button
                                        type="submit"
                                        disabled={isSubscribed}
                                        className="px-6 py-3 bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white rounded-lg font-medium transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-red-500/20 whitespace-nowrap"
                                    >
                                        {isSubscribed ? (
                                            <span className="flex items-center">
                                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                </svg>
                                                {t('footer.thank_you')}
                                            </span>
                                        ) : (
                                            <>
                                                <Send size={18} />
                                                <span>{t('footer.subscribe')}</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                                {isSubscribed && (
                                    <p className="text-green-400 text-sm mt-2 text-center">
                                        {t('footer.thank_you')}
                                    </p>
                                )}
                            </form>
                            <p className="text-gray-400 text-xs mt-3 text-center">
                                {t('footer.privacy_note')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom section with language switcher */}
                <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between gap-4 relative">
                    <div className="text-center md:text-left">
                        <p className="text-gray-500 text-sm">
                            © {new Date().getFullYear()} Pegasio. {t('footer.rights_reserved')}
                        </p>
                        <p className="text-gray-600 text-xs mt-1">
                            {t('footer.legal_disclaimer')}
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-gray-500 text-sm items-center">
                        <a href="#" className="hover:text-white transition-colors">{t('footer.legal_mentions')}</a>
                        <a href="#" className="hover:text-white transition-colors">{t('footer.cgu')}</a>
                        <a href="#" className="hover:text-white transition-colors">{t('footer.confidentiality')}</a>
                        <a href="#" className="hover:text-white transition-colors">{t('footer.cookies')}</a>
                        {/* Language Switcher - moved here for better placement */}
                        <div className="flex items-center ml-4 mt-2 md:mt-0 bg-gray-800 border border-gray-600 rounded px-2 py-1 hover:border-blue-500 transition-colors">
                            <span className="text-gray-400 mr-2" role="img" aria-label="language">🌐</span>
                            <select
                                value={i18n.language}
                                onChange={handleLanguageChange}
                                className="bg-gray-800 text-white px-2 py-1 rounded focus:outline-none border-none text-sm"
                                aria-label="Select language"
                            >
                                <option value="fr">Français</option>
                                <option value="en">English</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
