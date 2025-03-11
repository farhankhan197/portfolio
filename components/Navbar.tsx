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
      {/* Fixed Navbar */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className={`fixed left-0 right-0 flex justify-center z-40 transition-all duration-500 ease-in-out ${
          isScrolled
            ? "top-0 w-full px-8 py-4 bg-white dark:bg-[#0d0d0d] shadow-md"
            : "top-5 max-w-5xl px-6 py-4 mx-6 bg-white dark:bg-[#0d0d0d] rounded-lg shadow-lg"
        }`}
        style={{ zIndex: 50 }}
      >
        <div className="flex justify-between items-center w-full max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-md font-semibold text-black dark:text-white shining-text"
          >
            Starfield
          </motion.h1>

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
      </motion.div>

      {/* Dynamic Island Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              height: "0px",
              width: "calc(100% - 3rem)",
              maxWidth: "calc(100% - 3rem)",
              top: "50px",
              left: "50%",
              translateX: "-50%",
              borderRadius: "12px",
            }}
            animate={{
              height: "100vh",
              width: "100vw",
              maxWidth: "100vw",
              borderRadius: "0px",
              top: "0px",
              left: "0px",
              translateX: "0%",
            }}
            exit={{
              height: "0px",
              width: "calc(100% - 3rem)",
              maxWidth: "calc(100% - 3rem)",
              borderRadius: "12px",
              top: "50px",
              left: "50%",
              translateX: "-50%",
            }}
            transition={{
              duration: 0.6,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            className="fixed bg-white dark:bg-[#0d0d0d] flex flex-col items-center justify-center z-30 shadow-2xl"
            style={{
              transformOrigin: "top center",
              border: "2px solid rgba(255, 255, 255, 0.1)",
              overflow: "hidden",
              left: "1.5rem",
              maxWidth: "calc(100% - 3rem)",
            }}
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-black dark:text-white mb-6 hover:underline"
              >
                {item.name}
              </Link>
            ))}

            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-black dark:text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}