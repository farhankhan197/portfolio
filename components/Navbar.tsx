import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "@/components/ModeToggle";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  name: string;
  path: string;
}

const navItems: NavItem[] = [
  { name: "About", path: "#about" },
  { name: "Projects", path: "#projects" },
  { name: "Skills", path: "#skills" },
  { name: "Contact", path: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Navbar */}
      <div 
        className={`fixed flex justify-center z-40 transition-all duration-300 ${
          isScrolled ? "w-full px-8" : "max-w-5xl mx-6 rounded-lg"
        }`}
        style={{ 
          top: isScrolled ? 0 : "1.25rem",
          left: isScrolled ? 0 : "auto",
          right: isScrolled ? 0 : "auto",
          zIndex: 50 
        }}
      >
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className={`w-full flex justify-center ${
            isScrolled 
              ? "bg-white/95 dark:bg-[#0d0d0d]/95 backdrop-blur-sm px-8 py-4" 
              : "bg-white dark:bg-[#0d0d0d] rounded-lg px-6 py-4 shadow-lg"
          }`}
        >
          <div className="flex justify-between items-center w-full max-w-6xl">
            {/* Left Side (Title) */}
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="text-md font-semibold text-black dark:text-white shining-text"
            >
              Starfield
            </motion.h1>

            {/* Center (Nav Links for Desktop) */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="hidden md:flex space-x-6"
            >
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="hover:text-gray-600 dark:hover:text-gray-300 hover:underline transition-colors text-sm font-medium text-black dark:text-white"
                >
                  {item.name}
                </Link>
              ))}
            </motion.div>

            {/* Right Side (ModeToggle & Menu Button) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex items-center gap-4"
            >
              <ModeToggle />
              <button 
                onClick={handleToggleMenu} 
                className="md:hidden focus:outline-none"
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-6 w-6 text-black dark:text-white" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-6 w-6 text-black dark:text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Mobile Menu Expansion */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ 
              opacity: 0, 
              height: 0,
              width: "calc(100% - 3rem)",
              top: isScrolled ? "60px" : "75px",
              left: "50%",
              x: "-50%",
              borderRadius: "12px",
            }}
            animate={{ 
              opacity: 1, 
              height: "100vh",
              width: "100%",
              top: 0,
              left: 0,
              x: 0,
              borderRadius: 0,
              transition: {
                duration: 0.5,
                ease: [0.4, 0.0, 0.2, 1],
              }
            }}
            exit={{ 
              opacity: 0,
              height: 0,
              width: "calc(100% - 3rem)",
              top: isScrolled ? "60px" : "75px",
              left: "50%",
              x: "-50%",
              borderRadius: "12px",
              transition: {
                duration: 0.3,
              }
            }}
            className="fixed bg-white dark:bg-[#0d0d0d] flex flex-col items-center justify-center z-30 overflow-hidden"
            style={{ 
              transformOrigin: "top center", 
              backgroundImage: "radial-gradient(circle at 50% 100%, rgba(255, 255, 255, 0.03) 0%, transparent 70%)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)"
            }}
          >
            <div className="flex flex-col items-center justify-center h-full py-20 w-full max-w-md mx-auto">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="w-full text-center"
                >
                  <Link
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-black dark:text-white hover:underline"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}