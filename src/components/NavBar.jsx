import { useState, useEffect } from "react";
import { navLinks } from "../constants";
import { Sun, Moon } from "lucide-react";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // On mount: load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Watch theme changes
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
    <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}>
      <div className="inner flex justify-between items-center">
        <a href="#hero" className="logo" style={{ display: "flex", alignItems: "center" }}>
          <img
            src="/images/logbrand.jpg"
            alt="Logobrand"
            className="logo-img"
            style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "8px", objectFit: "cover" }}
          />
          MENSAH | GODCODEV.
        </a>

        <nav className="desktop">
          <ul className="flex gap-6 items-center">
            {navLinks.map(({ link, name }) => (
              <li key={name} className="group">
                <a href={link}>
                  <span>{name}</span>
                  <span className="underline" />
                </a>
              </li>
            ))}

            <li>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full bg-cyan-950 dark:bg-gray-700 transition"
                aria-label="Toggle Dark Mode"
              >
                {darkMode ? "🌞" : "🌙"}
              </button>
            </li>
          </ul>
        </nav>
        <a
          href="/Document/BOADI_MENSAH_JOHN_CV.pdf"
          download
          className="contact-btn group">
          <div className="inner">
            <span>Download CV</span>
          </div>
        </a>

        <a href="#contact" className="contact-btn group">
          <div className="inner">
            <span>Contact me</span>
          </div>
        </a>
      </div>
    </header>
  );
};

export default NavBar;
