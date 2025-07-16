import image from "../assets/logo.png";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black shadow-md px-6 md:px-12 py-2 flex items-center justify-start transition-colors duration-300">
      {/* Logo uniquement */}
      <a href="/" className="flex items-center space-x-2">
        <img
          src={image}
          alt="Logo"
          className="h-12 w-auto md:h-14 drop-shadow-lg transition-all duration-300"
        />
      </a>
    </nav>
  );
}