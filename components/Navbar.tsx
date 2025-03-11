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

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className={`fixed left-0 right-0 flex justify-center z-40 transition-all duration-500 ease-in-out ${
        isScrolled
          ? "top-0 w-full px-8 py-4 bg-white dark:bg-[#0d0d0d] shadow-md"
          : "top-5 max-w-5xl px-6 py-4 mx-6 bg-white dark:bg-[#0d0d0d] rounded-lg shadow-lg"
      }`}
    >
      <div className="flex justify-between items-center w-full max-w-6xl mx-auto">
        {/* Left side (Title) */}
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-md font-semibold text-black dark:text-white shining-text"
        >
          Starfield
        </motion.h1>

        {/* Center (Nav Links - Desktop) */}
        <motion.div
          className="hidden md:flex space-x-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
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

        {/* Right side (ModeToggle & Menu Button) */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <ModeToggle />
          <button onClick={handleToggleMenu} className="md:hidden">
            {isOpen ? (
              <X className="h-6 w-6 text-black dark:text-white" />
            ) : (
              <Menu className="h-6 w-6 text-black dark:text-white" />
            )}
          </button>
        </motion.div>
      </div>

      {/* Full-Screen Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 bg-white dark:bg-[#0d0d0d] flex flex-col items-center justify-center z-50 border border-gray-300 dark:border-gray-700 shadow-2xl rounded-xl"
            style={{
              border: "2px solid rgba(255, 255, 255, 0.1)",
              transformOrigin: "top center",
            }}
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                onClick={handleCloseMenu}
                className="text-lg font-medium text-black dark:text-white mb-6 hover:underline"
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}