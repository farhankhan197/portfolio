"use client";
import { motion } from "framer-motion";
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { JSX } from "react";
import { projectsPage } from "@/lib/data";

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
          {projectsPage.map((project, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="bg-transparent backdrop-blur-lg border border-gray-800 rounded-xl shadow-md overflow-hidden"
            >
              {project.image && (
                <div className="relative w-full h-40 bg-gray-800">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold">{project.title}</h2>
                <p className="text-gray-400 mt-2">{project.description}</p>
                {project.techStack && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs bg-gray-700 px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <Link
                  href={project.url}
                  className="inline-block mt-4 text-blue-500 hover:underline"
                >
                  View Project →
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <Footer />
      </div>
    </>
  );
}
