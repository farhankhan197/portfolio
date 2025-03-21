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
  { name: "Home", path:"/"},
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Skills", path: "/skills" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 5000000);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <motion.div
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className={`fixed left-0 right-0 flex justify-center z-40 transition-all duration-500 mx-auto ease-in-out shadow-none transform ${
          isScrolled
            ? `top-0 shadow-none scale-100 px-8 py-4 bg-white dark:bg-[#0d0d0d] ${
                isOpen ? "shadow-none" : "shadow-md dark:shadow-none]"
              } rounded-none`
            : `top-0 scale-100 max-w-5xl px-6 py-4 bg-white dark:bg-[#0d0d0d] ${
                isOpen ? "shadow-none" : "shadow-lg dark:shadow-none"
              } rounded-lg`
        }`}
      >
        <div className="flex justify-between items-center w-full max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-md font-semibold text-black dark:text-white"
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
            <button
              onClick={handleToggleMenu}
              className="md:hidden"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <X className="h-6 w-6 text-black dark:text-white" />
              ) : (
                <Menu className="h-6 w-6 text-black dark:text-white" />
              )}
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              scaleY: 0.9,
              borderRadius: 12,
              height: "0vh",
            }}
            animate={{
              scaleY: 1,
              borderRadius: 0,
              height: "100vh",
            }}
            exit={{
              scaleY: 0.9,
              borderRadius: 12,
              height: "0vh",
            }}
            transition={{
              duration: 0.2,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            className="fixed top-0 left-0 flex flex-col items-center justify-center bg-white dark:bg-[#0d0d0d] z-30 origin-top w-full"
          >
            {navItems.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.2,
                  delay: i * 0.01,
                }}
                className="w-full text-center"
              >
                <Link
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-black dark:text-white block py-4"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}