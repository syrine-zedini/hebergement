/*import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { t } = useTranslation();

  const contactInfo = [
    {
      icon: <Mail className="w-8 h-8 text-red-600 dark:text-red-400" />,
      title: "Email",
      detail: "contact@pegasio.com",
    },
    {
      icon: <Phone className="w-8 h-8 text-red-600 dark:text-red-400" />,
      title: "Téléphone",
      detail: "+33 1 23 45 67 89",
    },
    {
      icon: <MapPin className="w-8 h-8 text-red-600 dark:text-red-400" />,
      title: "Adresse",
      detail: (
        <>
          123 Rue des Affaires, Suite 100 <br />
          75001 Paris, France
        </>
      ),
    },
  ];

  const socialLinks = [
    { 
      icon: <Facebook />, 
      href: "https://www.facebook.com/PegasioOfficial", 
      label: "Facebook",
      color: "text-blue-600 dark:text-blue-400"
    },
    { 
      icon: <Twitter />, 
      href: "https://twitter.com/PegasioOfficial", 
      label: "Twitter",
      color: "text-sky-500 dark:text-sky-400"
    },
    { 
      icon: <Instagram />, 
      href: "https://www.instagram.com/PegasioOfficial", 
      label: "Instagram",
      color: "text-pink-600 dark:text-pink-400"
    },
    { 
      icon: <Linkedin />, 
      href: "https://www.linkedin.com/company/pegasio", 
      label: "LinkedIn",
      color: "text-blue-500 dark:text-blue-400"
    },
  ];

  return (
    <section
      id="contacts"
      className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-black dark:via-gray-900 dark:to-blue-900 py-20"
    >
      {/* Background animation elements }
      <div className="absolute inset-0 z-0">
        <div className="blob blob1 animate-pulse-slow"></div>
        <div className="blob blob2 animate-pulse-slower"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      //  {/* Heading }
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/20 px-6 py-3 rounded-full mb-6 animate-fadeIn">
            <span className="text-red-600 dark:text-red-400 text-sm font-semibold uppercase tracking-wide">
              CONTACT
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white animate-fadeIn delay-100">
            {t('contact.title')}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto animate-fadeIn delay-200">
            {t('contact.description')}
          </p>
        </div>

       // {/* Contact Information Cards }
        <div className="space-y-8 max-w-lg mx-auto">
          {contactInfo.map(({ icon, title, detail }, index) => (
            <div
              key={title}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 transition-transform hover:scale-[1.02] hover:shadow-2xl"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                  {icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mt-2 text-md">
                    {detail}
                  </p>
                </div>
              </div>
            </div>
          ))}

       //   {/* Social Links }
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {t('contact.socials.title')}
            </h3>
            <div className="flex gap-4">
              {socialLinks.map(({ icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`group relative w-11 h-11 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-all ${color}`}
                >
                  {React.cloneElement(icon, {
                    className: "w-5 h-5 transition-all group-hover:scale-110",
                  })}
                  <span className="sr-only">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}*/