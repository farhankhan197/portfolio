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
    hidden: { y: -30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.4, 
        ease: [0.25, 0.1, 0.25, 1] 
      }
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.3, 
        ease: [0.25, 0.1, 0.25, 1] 
      }
    }
  };

  const linksVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3, 
        delay: 0.1,
        ease: [0.25, 0.1, 0.25, 1] 
      }
    }
  };

  const actionsVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.3, 
        delay: 0.2,
        ease: [0.25, 0.1, 0.25, 1] 
      }
    }
  };

  // Mobile menu variants with staggered children
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      width: "calc(100% - 3rem)",
      borderRadius: "12px",
      top: isScrolled ? "60px" : "75px",
      left: "50%",
      x: "-50%",
      transition: {
        duration: 0.3,
        ease: [0.4, 0.0, 0.2, 1],
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      width: "100%",
      borderRadius: 0,
      top: 0,
      left: 0,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0.0, 0.2, 1],
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Variants for individual nav items in mobile menu
  const navItemVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.2, ease: "easeInOut" }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <>
      {/* Fixed Navbar */}
      <motion.div
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
        className={`fixed left-0 right-0 flex justify-center z-40 transition-all duration-300 ${
          isScrolled
            ? "top-0 w-full px-8 py-4 bg-white/95 dark:bg-[#0d0d0d]/95 backdrop-blur-sm"
            : "top-5 max-w-5xl px-6 py-4 mx-6 bg-white dark:bg-[#0d0d0d] rounded-lg"
        } ${isOpen ? "" : isScrolled ? "shadow-md" : "shadow-lg"}`}
        style={{ zIndex: 50 }}
      >
        <div className="flex justify-between items-center w-full max-w-6xl mx-auto">
          <motion.h1
            variants={logoVariants}
            className="text-md font-semibold text-black dark:text-white shining-text"
          >
            Starfield
          </motion.h1>

          <motion.div
            variants={linksVariants}
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
            variants={actionsVariants}
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="fixed bg-white dark:bg-[#0d0d0d] flex flex-col items-center justify-center z-30 shadow-2xl overflow-hidden"
            style={{ 
              transformOrigin: "top center", 
              borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
              borderRight: "1px solid rgba(255, 255, 255, 0.1)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
            }}
          >
            <div className="flex flex-col items-center justify-center h-full py-20">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  variants={navItemVariants}
                  custom={i}
                  className="mb-6"
                >
                  <Link
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-black dark:text-white hover:underline px-4 py-2"
                  >
                    {item.name}
                  </Link>
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