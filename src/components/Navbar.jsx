import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom"; 

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Projects", href: "/#projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/#contact" },
];

export const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation(); 

 
  useEffect(() => {
    if (location.pathname === "/") {
      if (location.hash) {
        const id = location.hash.substring(1);
      
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }, [location.pathname, location.hash]);

 
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    if (location.pathname === "/blog") {
      setActive("Blog");
      return; 
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const activeLink = navLinks.find(
              (link) => link.href === `/#${entry.target.id}` || (entry.target.id === 'home' && link.href === '/')
            );
            if (activeLink) {
              setActive(activeLink.name);
            }
          }
        });
      },
      { rootMargin: "-40% 0px -60% 0px" }
    );

    if (location.pathname === "/") {
      navLinks.forEach((link) => {
        if (link.href.startsWith("/#")) {
          const sectionId = link.href.substring(2);
          const sectionElement = document.getElementById(sectionId);
          if (sectionElement) observer.observe(sectionElement);
        } else if (link.href === "/") {
          const homeElement = document.getElementById("home");
          if (homeElement) observer.observe(homeElement);
        }
      });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [location.pathname]); 

 
  const handleNavClick = (e, link) => {
    setActive(link.name);

    if (location.pathname === "/") {
      if (link.href.startsWith("/#")) {
        e.preventDefault(); 
        const id = link.href.substring(2);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", link.href);
        }
      } else if (link.href === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.pushState(null, "", "/");
      }
    }
  };

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
        <Link 
          key={link.name}
          to={link.href} 
          onClick={(e) => handleNavClick(e, link)} // <-- Trigger custom logic
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
        </Link>
      ))}
    </motion.nav>
  );
};