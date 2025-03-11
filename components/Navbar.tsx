import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { ModeToggle } from "@/components/ModeToggle";
import { motion } from "framer-motion";

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed left-0 right-0 flex justify-center z-40 transition-all duration-500 ease-in-out transform ${
        isScrolled
          ? "top-0 scale-100 px-8 py-4 bg-white dark:bg-[#0d0d0d] shadow-md dark:shadow-[0_10px_30px_rgba(255,255,255,0.1)] rounded-none"
          : "top-5 scale-95 max-w-5xl px-6 py-4 mx-6 bg-white dark:bg-[#0d0d0d] rounded-lg shadow-lg dark:shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
      }`}
      style={{
        transformOrigin: "top center",
      }}
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

        {/* Center (Nav Links) */}
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

        {/* Right side (ModeToggle & Menu) */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <ModeToggle />
          <button id="menu-button" className="md:hidden">
            <Menu className="h-6 w-6 text-black dark:text-white" />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}