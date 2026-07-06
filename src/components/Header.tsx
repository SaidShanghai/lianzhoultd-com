import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signInWithGoogle } from "@/contexts/AuthContext";

const navLinks = [
  { label: "Our Strategy", href: "#strategy" },
  { label: "Supply Chain", href: "#supply-chain" },
  { label: "Digital Platform", href: "#digital" },
  { label: "Solutions", href: "#solutions" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4">
        <a href="/" className="relative z-50">
          <span className="text-2xl font-bold tracking-tight text-primary">
            LIANZHOU
          </span>
        </a>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative z-50 flex flex-col gap-1.5 p-2 group"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-7 bg-primary transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-7 bg-primary transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-7 bg-primary transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-primary flex items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) =>
                link.label === "Digital Platform" ? (
                  <motion.button
                    key={link.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => {
                      setMenuOpen(false);
                      signInWithGoogle();
                    }}
                    className="text-3xl md:text-5xl font-light text-primary-foreground hover:opacity-70 transition-opacity"
                  >
                    {link.label}
                  </motion.button>
                ) : (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => setMenuOpen(false)}
                    className="text-3xl md:text-5xl font-light text-primary-foreground hover:opacity-70 transition-opacity"
                  >
                    {link.label}
                  </motion.a>
                )
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
