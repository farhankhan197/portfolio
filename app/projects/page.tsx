"use client";
import { motion } from "framer-motion";
import NavBar from "@/components/Navbar";
import Link from "next/link";
import { JSX } from "react";
const projects = [
  {
    title: "Dynamic Navbar Animation",
    description:
      "A Starfield-themed floating navbar that expands seamlessly like YouTube’s mini-player.",
    link: "https://github.com/farhankhan197/dynamic-navbar",
  },
  {
    title: "AI-Powered Content Generator",
    description:
      "Trained a small-scale LLM on 2800 engineering papers to generate research papers.",
    link: "https://github.com/farhankhan197/ai-content-generator",
  },
  {
    title: "Full-Stack Blogging Platform",
    description:
      "Developed a modern blogging platform with Next.js, TypeScript, and MongoDB.",
    link: "https://github.com/farhankhan197/fullstack-blog",
  },
  {
    title: "Cybersecurity Dashboard",
    description:
      "Built an interactive dashboard to visualize security threats and vulnerabilities in real-time.",
    link: "https://github.com/farhankhan197/cybersecurity-dashboard",
  },
];

export default function Projects(): JSX.Element {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center p-6 bg-transparent text-black dark:text-white">
        {/* Navigation Bar */}
        <NavBar />

        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-20 mb-8 w-full max-w-3xl px-4"
        >
          <h1 className="text-3xl font-extrabold">Projects</h1>
          <p className="text-lg text-gray-500 mt-2">
            A collection of my recent work in web development and AI.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="bg-transparent backdrop-blur-lg border border-gray-800 rounded-xl shadow-md p-6"
            >
              <h2 className="text-xl font-semibold">{project.title}</h2>
              <p className="text-gray-400 mt-2">{project.description}</p>
              <Link
                href={project.link}
                className="inline-block mt-4 text-blue-500 hover:underline"
              >
                View Project →
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <p className="mt-10 text-xs text-gray-500 text-center">
          Built with passion by Farhan.
        </p>
      </div>
    </>
  );
}
