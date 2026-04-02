import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },

];

export const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll to add glassmorphism effect when moving down the page
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0, x: "-50%" }}
      animate={{ y: 0, opacity: 1, x: "-50%" }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
      className={`fixed top-6 left-1/2 z-50 flex items-center gap-1 px-2 py-2 rounded-full transition-all duration-500 ${
        scrolled
          ? "bg-black/60 backdrop-blur-xl border border-zinc-800 shadow-2xl shadow-black/50"
          : "bg-transparent border border-transparent"
      }`}
    >
      {navLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          onClick={() => setActive(link.name)}
          className="relative px-5 py-2 text-sm font-medium transition-colors"
        >
          <span
            className={`relative z-10 transition-colors duration-300 ${
              active === link.name
                ? "text-black font-bold"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            {link.name}
          </span>

          {active === link.name && (
            <motion.div
              layoutId="nav-pill"
              className="absolute inset-0 bg-white rounded-full"
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            />
          )}
        </a>
      ))}

    </motion.nav>
  );
};