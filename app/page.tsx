"use client";
import Image from "next/image";
import { ModeToggle } from "@/components/ModeToggle";
import Link from "next/link";
import { useState, JSX } from "react";
import { ChevronRight, LinkIcon, Instagram, Menu } from "lucide-react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import LinkedinIcon from "@/components/LinkedinIcon";
import GithubIcon from "@/components/GithubIcon";
import TwitterIcon from "@/components/TwitterIcon";
import DiscordIcon from "@/components/DiscordIcon";

const LeetCodeIcon = dynamic(() => import("@/components/LeetcodeIcon"), {
  ssr: false,
});

type NavItem = { name: string; path: string };
interface SocialLink {
  name: string;
  url: string;
  icon: JSX.Element;
}

export default function Home(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const navItems: NavItem[] = [
    { name: "About", path: "#about" },
    { name: "Projects", path: "#projects" },
    { name: "Skills", path: "#skills" },
    { name: "Contact", path: "#contact" },
  ];

  const socialLinks: SocialLink[] = [
    {
      name: "GitHub",
      url: "https://github.com/farhankhan197",
      icon: <GithubIcon className="h-5 w-5" />,
    },
    {
      name: "Twitter",
      url: "https://twitter.com/Farhankhan_twt",
      icon: <TwitterIcon className="h-5 w-5" />,
    },
    {
      name: "LeetCode",
      url: "https://leetcode.com/farhankhan19",
      icon: <LeetCodeIcon className="h-5 w-5" />,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/farhan-khan-71a857296/",
      icon: <LinkedinIcon className="h-5 w-5" />,
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/musunoa/",
      icon: <Instagram className="h-5 w-5" />,
    },
    {
      name: "Discord",
      url: "/Farhan_Khan_Resume.pdf",
      icon: <DiscordIcon className="h-5 w-5" />,
    },
  ];

  const toggleMenu = (): void => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-transparent text-black dark:text-white">
      {/*Navigation Bar - Dropdown Menu*/}

      <nav
        className="w-full max-w-5xl flex justify-between items-center p-4 mb-6 sticky top-0 z-40 
                bg-white/30 dark:bg-black/30 backdrop-blur-lg border border-white/20 
                dark:border-black/20 rounded-lg shadow-lg"
      >
        <div className="flex items-center gap-4">
          {/* <Image
            src="/images/profile.jpg"
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full"
          /> */}
          <h1 className="text-md font-semibold shining-text">Starfield</h1>
        </div>
        <div className="hidden absolute left-1/2 transform -translate-x-1/2  md:flex space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="hover:text-gray-600 dark:hover:text-gray-300 hover:underline transition-colors text-sm font-medium"
            >
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-4 "
      >
        <p className="text-gray-600 dark:text-gray-400  ">Hey there, i'm</p>
        <div className="flex items-center justify-center">
          <Image
            src="/images/photo.jpg"
            alt="Profile"
            width={200}
            height={0}
            className="h-auto m-4 flex items-center justify-center rounded-full"
          />
        </div>
        <h1 className="text-3xl font-extrabold">Farhan Khan</h1>
        <p className="text-gray-600 flex flex-start dark:text-gray-400 mt-2 text-lg text-left p-4">
          I am a third year CS student, Passionate Full-Stack Developer and
          Machine Learning Engineer with expertise in building high-performance
          web applications and AI-driven solutions.
        </p>
        <p className="text-gray-600 flex flex-start dark:text-gray-400 mt-2 text-lg text-left p-4">
          My focus lies in developing scalable, efficient, and aesthetically
          pleasing applications using Next.js (TypeScript) for frontend
          development and leveraging Deep Learning for real-world AI
          applications.
        </p>
      </motion.div>
      <motion.div
        className="flex gap-4 w-full max-w-xl sm:max-w-sm md:max-w-lg items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {socialLinks.map((link) => (
          <Link
            key={link.name}
            href={link.url}
            className="bg-gray-300 dark:bg-gray-800 rounded-full hover:bg-gray-400 dark:hover:bg-gray-600 transition"
          >
            {link.icon}
          </Link>
        ))}
      </motion.div>

      <button className="inline-flex m-4 items-center gap-2 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium hover:bg-green-200 dark:hover:bg-green-700 transition-colors whitespace-nowrap">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
        Available
      </button>

      {/* Sections */}
      {[
        {
          id: "about",
          title: "About Me",
          content:
            "I am a passionate software engineer with experience in modern web development.",
        },
        {
          id: "skills",
          title: "Technical Skills",
          content:
            "Proficient in JavaScript, TypeScript, React, Next.js, and Node.js.",
        },
        {
          id: "contact",
          title: "Available for work",
          content:
            "I am currently open for freelance and full-time opportunities.",
        },
      ].map((section) => (
        <motion.section
          key={section.id}
          id={section.id}
          className="w-full max-w-3xl mb-6 p-6 bg-transparent backdrop-blur-lg rounded-xl shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-3 text-black dark:text-white">
            {section.title}
          </h2>
          <p className="text-gray-800 dark:text-gray-300">{section.content}</p>
        </motion.section>
      ))}

      {/* Social Links */}
    </div>
  );
}
