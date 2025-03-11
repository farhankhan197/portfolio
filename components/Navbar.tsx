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

  // Animation variants
  const navbarVariants = {
    initial: { y: -30, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.4, 
        ease: [0.25, 0.1, 0.25, 1] 
      }
    }
  };

  return (
    <>
      {/* Fixed Navbar with Fixed Width Container */}
      <div 
        className={`fixed left-0 right-0 flex justify-center z-40 transition-all duration-300 ${
          isOpen ? "" : isScrolled ? "shadow-md" : "shadow-lg"
        }`}
        style={{ 
          top: isScrolled ? 0 : "1.25rem",
          zIndex: 50 
        }}
      >
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ 
            y: 0, 
            opacity: 1,
          }}
          transition={{ 
            duration: 0.4, 
            ease: [0.25, 0.1, 0.25, 1] 
          }}
          className={`w-full transition-all duration-300 flex justify-center ${
            isScrolled 
              ? "bg-white/95 dark:bg-[#0d0d0d]/95 backdrop-blur-sm px-8 py-4" 
              : "max-w-5xl mx-auto bg-white dark:bg-[#0d0d0d] rounded-lg px-6 py-4"
          }`}
        >
          <div className="flex justify-between items-center w-full max-w-6xl">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                transition: { 
                  duration: 0.3, 
                  ease: [0.25, 0.1, 0.25, 1] 
                }
              }}
              className="text-md font-semibold text-black dark:text-white shining-text"
            >
              Starfield
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.3, 
                  delay: 0.1,
                  ease: [0.25, 0.1, 0.25, 1] 
                }
              }}
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

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                transition: { 
                  duration: 0.3, 
                  delay: 0.2,
                  ease: [0.25, 0.1, 0.25, 1] 
                }
              }}
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

      {/* Mobile Menu */}
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
                duration: 0.4,
                ease: [0.4, 0.0, 0.2, 1],
                when: "beforeChildren",
                staggerChildren: 0.1,
                delayChildren: 0.2
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
                ease: [0.4, 0.0, 0.2, 1],
                when: "afterChildren",
                staggerChildren: 0.05,
                staggerDirection: -1
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
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: { 
                      duration: 0.3, 
                      delay: 0.2 + (i * 0.1),
                      ease: "easeOut" 
                    }
                  }}
                  exit={{ 
                    opacity: 0, 
                    y: -20, 
                    scale: 0.95,
                    transition: { 
                      duration: 0.2, 
                      delay: (navItems.length - 1 - i) * 0.05,
                      ease: "easeInOut" 
                    }
                  }}
                  className="w-full px-6 py-3"
                >
                  <Link
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-black dark:text-white hover:underline block py-3 px-6 w-full text-center"
                  >
                    {item.name}
                  </Link>
                  {i < navItems.length - 1 && (
                    <div className="h-px w-3/4 bg-gray-200 dark:bg-gray-800 mx-auto mt-3"></div>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5, duration: 0.3 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-black dark:text-white focus:outline-none"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}