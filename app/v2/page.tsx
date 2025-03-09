"use client";
import Image from "next/image";
import { ModeToggle } from "@/components/ModeToggle";
import Link from "next/link";
import { useState, useEffect, JSX } from "react";
import { ChevronRight, LinkIcon, X, Menu } from "lucide-react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const LeetCodeIcon = dynamic(() => import("@/components/LeetcodeIcon"), {
  ssr: false,
});

type NavItem = { name: string; path: string };
interface SocialLink { name: string; url: string; icon: JSX.Element }

export default function Home(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const navItems: NavItem[] = [
    { name: "About", path: "#about" },
    { name: "Projects", path: "#projects" },
    { name: "Skills", path: "#skills" },
    { name: "Contact", path: "#contact" },
  ];

  const socialLinks: SocialLink[] = [
    { name: "GitHub", url: "https://github.com/farhankhan197", icon: <LinkIcon className="h-5 w-5" /> },
    { name: "LeetCode", url: "https://leetcode.com/farhankhan19", icon: <LeetCodeIcon className="h-5 w-5" /> },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/farhan-khan-71a857296/", icon: <LinkIcon className="h-5 w-5" /> },
  ];

  const toggleMenu = (): void => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black text-gray-900 dark:text-white">
      {/* Navbar */}
      <nav className="w-full max-w-5xl flex justify-between items-center p-4 mb-6 sticky top-0 z-40 bg-white/80 dark:bg-black/60 backdrop-blur-md rounded-lg shadow-lg">
        <div className="flex items-center gap-4">
          <Image src="/images/profile.jpg" alt="Profile" width={40} height={40} className="rounded-full" />
          <h1 className="text-lg font-semibold">Farhan Khan</h1>
        </div>
        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link key={item.name} href={item.path} className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors text-sm font-medium">
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <button id="menu-button" className="md:hidden" onClick={toggleMenu}>
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-10">
        <h1 className="text-5xl font-extrabold">Farhan Khan</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Software Engineer</p>
      </motion.div>

      {/* Sections */}
      {[
        { id: "about", title: "About Me", content: "I am a passionate software engineer with experience in modern web development." },
        { id: "skills", title: "Technical Skills", content: "Proficient in JavaScript, TypeScript, React, Next.js, and Node.js." },
        { id: "contact", title: "Available for work", content: "I am currently open for freelance and full-time opportunities." },
      ].map((section) => (
        <motion.section key={section.id} id={section.id} className="w-full max-w-3xl mb-6 p-6 bg-white dark:bg-gray-800/70 backdrop-blur-lg rounded-xl shadow-md"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <h2 className="text-xl font-semibold mb-3">{section.title}</h2>
          <p className="text-gray-700 dark:text-gray-300">{section.content}</p>
        </motion.section>
      ))}

      {/* Social Links */}
      <motion.div className="flex gap-4 mt-6"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}>
        {socialLinks.map((link) => (
          <Link key={link.name} href={link.url} className="p-3 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition">
            {link.icon}
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
