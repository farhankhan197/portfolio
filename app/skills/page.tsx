"use client";
import { motion } from "framer-motion";
import NavBar from "@/components/Navbar";
import { JSX } from "react";
export default function Skills(): JSX.Element {
  const skills = [
    {
      category: "Frontend",
      list: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js"],
    },
    {
      category: "Backend",
      list: ["Node.js", "Express", "NestJS", "Django", "Spring Boot"],
    },
    {
      category: "Databases",
      list: ["MongoDB", "PostgreSQL", "MySQL", "Firebase"],
    },
    {
      category: "DevOps & Tools",
      list: ["Docker", "Kubernetes", "Git", "CI/CD", "Linux"],
    },
    {
      category: "Machine Learning",
      list: ["Python", "TensorFlow", "PyTorch", "OpenCV"],
    },
  ];

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
          <h1 className="text-3xl font-extrabold">Skills</h1>
          <p className="text-lg text-gray-500 mt-2">
            Technologies and tools I work with regularly.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="p-4 border border-gray-800 rounded-xl bg-transparent backdrop-blur-lg shadow-md"
            >
              <h2 className="text-xl font-semibold mb-3">{skill.category}</h2>
              <ul className="text-gray-400">
                {skill.list.map((item, i) => (
                  <li key={i} className="mt-1">
                    - {item}
                  </li>
                ))}
              </ul>
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
