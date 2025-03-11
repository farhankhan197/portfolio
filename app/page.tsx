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
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Skills", path: "/skills" },
    { name: "Contact", path: "/contact" },
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
        <p className=" text-left w-full max-w-3xl mb-6 p-6 bg-transparent backdrop-blur-lg rounded-xl shadow-md">
          I am a third year CS student, Passionate Full-Stack Developer and
          Machine Learning Engineer with expertise in building high-performance
          web applications and AI-driven solutions.
        </p>
        <p className="text-left w-full max-w-3xl mb-6 p-6 bg-transparent backdrop-blur-lg rounded-xl shadow-md">
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

      <button className="inline-flex m-6 items-center gap-2 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium hover:bg-green-200 dark:hover:bg-green-700 transition-colors whitespace-nowrap">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
        Available
      </button>

      {/* Sections */}
      <h1 className="text-2xl font-semibold mb-3 mx-2 text-black dark:text-white">
        Work Experience
      </h1>
      <section
        id="Work Experience"
        className=" border border-white w-full max-w-lg m-6  bg-transparent backdrop-blur-lg rounded-xl shadow-md"
      >
        <div className="mx-2 p-2 flex justify-between items-center gap-2">
          <Image
            src="data:image/png;base64,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"
            alt={"edSlash Logo"}
            width={50}
            height={0}
          ></ Image>
          <p className="dark:text-white underline">Edslash</p>
          <span className="m-2 block">
            Full Stack Intern | Apr 2024 - Jun 2024{" "}
          </span>
        </div>
      </section>
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
