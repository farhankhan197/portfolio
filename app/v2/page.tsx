"use client";
import Image from "next/image";
import { ModeToggle } from "@/components/ModeToggle";
import Link from "next/link";
import { useState, useEffect, JSX } from "react";
import { ChevronRight, LinkIcon, Instagram, X, Menu } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamic imports with type assertions
const LeetCodeIcon = dynamic(() => import("@/components/LeetcodeIcon"), {
  ssr: false,
});


// Define navigation item type
type NavItem = {
  name: string;
  path: string;
};

// Define social link type
interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

export default function Home(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // Navigation items
  const navItems: NavItem[] = [
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Skills", path: "/skills" },
    { name: "Contact", path: "/contact" },
  ];

  // Social links
  const socialLinks: SocialLink[] = [
    {
      name: "GitHub",
      url: "https://github.com/farhankhan197",
      icon: <LinkIcon className="h-5 w-5" />,
    },
    {
      name: "LeetCode",
      url: "https://leetcode.com/farhankhan19",
      icon: <LeetCodeIcon className="h-5 w-5" />,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/farhan-khan-71a857296/",
      icon: <LinkIcon className="h-5 w-5" />,
    },
  ];

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      const menu = document.getElementById("mobile-menu");
      const menuButton = document.getElementById("menu-button");

      if (
        isMenuOpen &&
        menu &&
        menuButton &&
        !menu.contains(e.target as Node) &&
        !menuButton.contains(e.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    // Close menu when ESC key is pressed
    const handleEscKey = (e: KeyboardEvent): void => {
      if (isMenuOpen && e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    // Prevent scrolling when menu is open
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  // Toggle menu handler
  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 text-foreground">
      {/* Navbar */}
      <nav className="w-full max-w-5xl flex justify-between items-center bg-white dark:bg-black shadow-md rounded-lg p-4 mb-6 sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Image
            src="/images/profile.jpg"
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full"
          />
          <h1 className="text-lg bg-white dark:bg-black p-4 font-semibold">
            Farhan Khan
          </h1>
        </div>
        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="hover:text-primary transition-colors text-sm font-medium"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <button
            id="menu-button"
            className="md:hidden flex items-center justify-center h-8 w-8 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden transition-opacity ease-in-out duration-300" />
      )}

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`fixed top-0 right-0 w-72 h-full bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="font-semibold">Menu</h2>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="rounded-full p-1 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex flex-col p-4 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              <ChevronRight className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </div>

        {/* Additional menu items */}
        {/* <div className="border-t border-gray-200 dark:border-gray-700 mt-4 p-4">
          <h3 className="text-sm text-muted-foreground mb-3">Connect</h3>
          <div className="grid grid-cols-3 gap-2">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.url}
                className="flex flex-col items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.icon}
                <span className="text-xs">{link.name}</span>
              </Link>
            ))}
          </div>
        </div> */}
      </div>

      {/* Main Content */}
      <main className="w-full max-w-3xl  rounded-xl p-6 shadow-lg">
        {/* Hero Section */}
        <div className="text-center mb-10  light:bg-white dark:bg-black ">
          <h1 className="text-5xl  font-extrabold">Farhan Khan</h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Software Engineer
          </p>
        </div>

        {/* About Me */}
        <section className="mb-6 p-4 dark:bg-black light:bg-white border border-white rounded-sm">
          <h2 className="text-xl font-semibold mb-3">About Me</h2>
          <p className="text-muted-foreground">
            I am a passionate software engineer with a strong background in
            developing efficient and scalable applications. With experience in
            modern web development, I enjoy solving complex problems and
            building user-friendly solutions.
          </p>
        </section>

        {/* Technical Skills */}
        <section className="mb-6 p-4 dark:bg-black light:bg-white border border-white rounded-sm">
          <h2 className="text-xl font-semibold mb-3">Technical Skills</h2>
          <p className="text-muted-foreground">
            Proficient in JavaScript, TypeScript, React, Next.js, and Node.js.
            Experienced in backend development, API integration, and database
            management. Always eager to learn new technologies and improve my
            skill set.
          </p>
        </section>

        {/* Additional Links */}
        <section className="mb-6 p-4 dark:bg-black light:bg-white border border-white rounded-sm">
          <h2 className="text-md text-muted-foreground mb-3">
            Connect with me
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.url}
                className="flex items-center justify-center gap-2 p-3 bg-gray-800 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
              >
                {link.icon}
                <span className="font-medium">{link.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* More Links and Availability */}
        <section className="mb-6 ">
          <h2 className="text-md text-muted-foreground mb-3">More Links</h2>
          <p className="text-muted-foreground">
            Check out my blog and other resources.
          </p>
        </section>
        <section>
          <h2 className="text-md text-muted-foreground mb-3">
            Available for work
          </h2>
          <p className="text-muted-foreground">
            I am currently available for freelance and full-time opportunities.
          </p>
        </section>
      </main>
    </div>
  );
}
