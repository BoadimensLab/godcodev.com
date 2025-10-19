import { useState, useEffect } from "react";
import { navLinks } from "../constants";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`navbar ${scrolled ? "scrolled" : "not-scrolled"} w-full fixed top-0 z-50 bg-white dark:bg-gray-900 transition-shadow shadow-md`}
    >
      <div className="inner flex justify-between items-center px-4 py-3 md:py-4 md:px-8 max-w-7xl mx-auto">
        {/* Logo */}
        <a href="#hero" className="logo flex items-center text-lg font-bold text-gray-800 dark:text-white">
          <img
            src="/images/logbrand.jpg"
            alt="Logobrand"
            className="logo-img w-10 h-10 rounded-full object-cover mr-2"
          />
          MENSAH | GODCODEV.
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <ul className="flex gap-6 items-center text-sm font-medium text-gray-700 dark:text-gray-200">
            {navLinks.map(({ link, name }) => (
              <li key={name}>
                <a href={link} className="hover:text-blue-500 transition">{name}</a>
              </li>
            ))}
            <li>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full bg-cyan-950 dark:bg-gray-700 text-white"
                aria-label="Toggle Dark Mode"
              >
                {darkMode ? "🌞" : "🌙"}
              </button>
            </li>
          </ul>
        </nav>

        {/* CTA Buttons - Hidden on mobile, shown on md+ */}
        <div className="hidden md:flex items-center gap-4 ml-4">
          <a
            href="/Document/BOADI_MENSAH_JOHN_CV.pdf"
            download
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
          >
            Download CV
          </a>
          <a
            href="#contact"
            className="px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition"
          >
            Contact me
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-800 dark:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen ? "true" : "false"}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-4 pb-4 transition-all duration-300">
          <ul className="flex flex-col gap-4 text-gray-700 dark:text-gray-200">
            {navLinks.map(({ link, name }) => (
              <li key={name}>
                <a href={link} onClick={() => setMobileMenuOpen(false)}>{name}</a>
              </li>
            ))}
            <li>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-md bg-cyan-950 dark:bg-gray-700 text-white"
              >
                {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
              </button>
            </li>
            <li>
              <a
                href="/Document/BOADI_MENSAH_JOHN_CV.pdf"
                download
                className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Download CV
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="block w-full text-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
              >
                Contact me
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default NavBar;
