"use client";
import Image from "next/image";
import { ModeToggle } from "@/components/ModeToggle";
import Link from "next/link";
import { useState, JSX } from "react";
import { ChevronRight, LinkIcon, Instagram, Menu, LogOut } from "lucide-react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import LinkedinIcon from "@/components/LinkedinIcon";
import GithubIcon from "@/components/GithubIcon";
import TwitterIcon from "@/components/TwitterIcon";
import DiscordIcon from "@/components/DiscordIcon";
import NavBar from "@/components/Navbar";

const LeetCodeIcon = dynamic(() => import("@/components/LeetcodeIcon"), {
  ssr: false,
});

interface Skills {
  name: string;
  icon: JSX.Element;
}

type NavItem = { name: string; path: string };
interface SocialLink {
  name: string;
  url: string;
  icon: JSX.Element;
}

interface WorkExperience {
  company: string;
  logo: string;
  jobTitle: string;
  duration: string;
  url: string;
}

interface Project {
  title: string;
  description: string;
  url: string;
  image: string;
  techStack?: string[];
}

export default function Home(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const navItems: NavItem[] = [
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Skills", path: "/skills" },
    { name: "Contact", path: "/contact" },
  ];

  const skills: Skills[] = [
    {
      name: "Javascript",
      icon: <GithubIcon className="h-5 w-5" />,
    },
    {
      name: "typescript",
      icon: <GithubIcon className="h-5 w-5" />,
    },
    {
      name: "Python",
      icon: <GithubIcon className="h-5 w-5" />,
    },
    {
      name: "React",
      icon: <GithubIcon className="h-5 w-5" />,

    },
    {
      name: "Next.js",
      icon: <GithubIcon className="h-5 w-5" />,
    },
    {
      name: "Tailwind CSS",
      icon: <GithubIcon className="h-5 w-5" />,
    },
      {
      name: "Node.js",
      icon: <GithubIcon className="h-5 w-5" />,
      },
      {
      name: "Express",
      icon: <GithubIcon className="h-5 w-5" />,
      },
      {
      name: "MongoDB",
      icon: <GithubIcon className="h-5 w-5" />,
      },
  ];
  const Projects: Project[] = [
    {
      title: "Retail Radar",
      description: "A Dashboard for Retail Owners",
      url: "",
      image: "/images/retail-radar.png",
      techStack: [" Next.js ", " TypeScript ", " Tailwind CSS "],
    },
    {
      title: "Vizack Enterprises",
      description: "A Next.js Website for Vizack Enterprises.",
      url: "https://vizackenterprises.com",
      image: "/images/vizack.png",
      techStack: [" Next.js ", " TypeScript ", " Tailwind CSS "],
    },
  ];
  const workExperience: WorkExperience[] = [
    {
      company: "The Catchy Pixel",
      logo: "/images/thecatchypixel_logo.jpg",
      jobTitle: "Co-Founder",
      duration: "Mar 2025 - Present",
      url: "https://x.com/thecatchypixel",
    },
    {
      company: "Edslash",
      logo: "/images/edslash_logo.png",
      jobTitle: "Full Stack Intern",
      duration: "Apr 2024 - Jun 2024",
      url: "https://edslash.com",
    },
    {
      company: "Vizack",
      logo: "/images/vizack_logo.jpg",
      jobTitle: "Full Stack Intern",
      duration: "Jan 2024 - Mar 2024",
      url: "https://vizackenterprises.com",
    },
    {
      company: "Spark Club",
      logo: "/images/spark_club_logo.jpg",
      jobTitle: "Founder",
      duration: "March 2024 - Present",
      url: "https://chat.whatsapp.com/L1TnMG7ntdw87JRw6vpovO",
    },
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
    <>
      <div className="min-h-screen flex flex-col items-center p-6 bg-transparent text-black dark:text-white">
        {/* Navigation Bar - Dropdown Menu */}

        {/* <div className="fixed top-5 left-0 right-0 flex justify-center z-40 transition-all duration-300 ease-in-out transform">
          <div className="w-full max-w-3xl flex justify-between items-center p-4 mx-6 mb-6 bg-white dark:bg-zinc-950 border border-white/20 dark:border-black/20 rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-4">
              <h1 className="text-md font-semibold shining-text">Starfield</h1>
            </div>
            <div className="hidden md:flex space-x-4">
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
              <button
                id="menu-button"
                className="md:hidden"
                onClick={toggleMenu}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div> */}
        <NavBar />

        {/* Mobile Navigation Menu */}
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-24 mb-4"
        >
          <p className="text-gray-600 dark:text-gray-400">Hey there, I'm</p>
          <div className="flex items-center justify-center">
            <Image
              src="/images/iyel4h.jpg"
              alt="Profile"
              width={200}
              height={200}
              className="rounded-full m-4"
            />
          </div>
          <h1 className="text-3xl font-extrabold">Farhan Khan</h1>
          <p className="text-left w-full max-w-lg p-6 bg-transparent backdrop-blur-lg rounded-xl shadow-md">
            I am a third-year CS student, passionate Full-Stack Developer, and
            Machine Learning Engineer with expertise in building
            high-performance web applications and AI-driven solutions.
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
            className="rounded-full hover:bg-gray-400 dark:hover:bg-gray-600 transition-all ease-in-out transform scale-100 hover:scale-105"
          >
            {link.icon}
          </Link>
        ))}
      </motion.div>

      <button className="inline-flex m-6 items-center gap-2 bg-green-100 dark:bg-green-800 text-green-800 shining-text dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium hover:bg-green-200 dark:hover:bg-green-700 transition-colors whitespace-nowrap">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
        Available
      </button>

        {/* Work Experience */}
        <motion.h1
          className="text-2xl font-semibold mt-8 mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Work Experience
        </motion.h1>
        {workExperience.map((experience) => (
          <motion.section
            key={experience.company}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="border border-gray-800 w-full max-w-lg m-4 bg-transparent backdrop-blur-lg rounded-xl shadow-md p-4"
          >
            <div className="flex items-center gap-4">
              <Image
                src={experience.logo}
                alt={experience.company}
                width={50}
                height={50}
                className="rounded-full"
              />
              <div>
                <Link href={experience.url} className="hover:underline">
                  <p className="text-lg font-medium">{experience.company}</p>
                </Link>
                <p className="text-sm font-semibold text-gray-300">
                  {experience.jobTitle}
                </p>
                <p className="text-sm text-gray-400">{experience.duration}</p>
              </div>
            </div>
          </motion.section>
        ))}

        {/* Projects */}
        <motion.h1
          className="text-2xl mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Projects
        </motion.h1>
        {Projects.map((project) => (
          <motion.section
            key={project.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="border border-gray-800 w-full max-w-lg m-4 bg-transparent backdrop-blur-lg rounded-xl shadow-md p-4"
          >
            <div className="relative w-full h-40 rounded-lg overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="mt-4">
              <Link href={project.url}>
                <p className="text-lg hover:underline font-medium">
                  {project.title}
                </p>
                <div className="flex gap-2">
                  {project.techStack?.map((tech) => (
                    <p
                      key={tech}
                      className="text-xs bg-gray-800 dark:bg-gray-200 dark:text-black rounded-sm p-1"
                    >
                      {tech}
                    </p>
                  ))}
                </div>
              </Link>
              <p className="text-sm mt-2 font-semibold text-gray-300">
                {project.description}
              </p>
             <div className="mt-4 flex gap-4">
              <Link href = ""> <GithubIcon/> </Link> 
             <Link href = "" className="rotate-0 hover:rotate-45 transition-all ease-in-out transform"><LinkIcon/></Link>
             </div>
            </div>
          </motion.section>
        ))}

        {/* Skills */}
        <motion.h1
          className="text-2xl mt-8 font-semibold mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Skills
        </motion.h1>
        <motion.div
          className="flex flex-wrap gap-4 mx-6 max-w-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="flex items-center gap-2 bg-gray-300 dark:bg-gray-800 rounded-full p-2"
            >
              <p>{skill.name}</p>
            </div>
          ))}
        </motion.div>

        <p className="mt-10 text-xs">Built with ❤️ by Farhan.</p>
      </div>
    </>
  );
}
