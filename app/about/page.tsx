"use client";
import { motion } from "framer-motion";
import NavBar from "@/components/Navbar";
import Link from "next/link";
import { JSX } from "react/jsx-runtime";

export default function About(): JSX.Element {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center p-6 bg-transparent text-black dark:text-white">
        {/* Navigation Bar */}
        <NavBar />

        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-20 mb-8 w-full max-w-3xl px-4"
        >
          <h1 className="text-3xl font-extrabold">About Me</h1>

          <p className="text-left mt-6 text-lg leading-relaxed">
            I am a passionate Full-Stack Developer and Machine Learning
            enthusiast, currently a
            <strong> third-year Computer Science student</strong>. I enjoy
            solving complex problems and building
            <strong> high-performance web applications</strong>. My work extends
            to
            <strong> AI-driven solutions</strong> where I explore the
            intersection of web development and artificial intelligence.
          </p>

          <p className="text-left mt-4 text-lg leading-relaxed">
            Whether it's designing seamless UI/UX, optimizing backend
            performance, or experimenting with cutting-edge machine learning
            models, I find joy in every step of the process. I am always eager
            to learn new technologies and collaborate with like-minded
            individuals.
          </p>
        </motion.div>

        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-3xl bg-transparent backdrop-blur-lg rounded-xl shadow-md p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold mb-4">My Journey</h2>

          <p className="text-lg leading-relaxed">
            I started my tech journey in <strong>2022</strong> with web
            development. By <strong>2023</strong>, I had built my first{" "}
            <strong> full-stack application</strong>. Since then, I have worked
            with multiple organizations, gaining experience in building scalable
            solutions.
          </p>

          <p className="text-lg leading-relaxed mt-4">
            I have interned at <strong>Vizack</strong>, <strong>Edslash</strong>
            , and <strong>The Catchy Pixel</strong>, where I contributed to
            various projects. I also founded <strong>Spark Club</strong> to
            bring together developers who share a passion for technology.
          </p>
        </motion.div>

        {/* Interests Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-3xl mt-8"
        >
          <h2 className="text-2xl font-semibold mb-4">What Excites Me?</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-lg">
            <span className="bg-gray-800 dark:bg-gray-700 dark:text-white p-2 rounded-lg text-center">
              Web Development
            </span>
            <span className="bg-gray-800 dark:bg-gray-700 dark:text-white p-2 rounded-lg text-center">
              Machine Learning
            </span>
            <span className="bg-gray-800 dark:bg-gray-700 dark:text-white p-2 rounded-lg text-center">
              UI/UX Design
            </span>
            <span className="bg-gray-800 dark:bg-gray-700 dark:text-white p-2 rounded-lg text-center">
              Automating Workflows
            </span>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="w-full max-w-3xl mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Let's Connect</h2>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="https://twitter.com/Farhankhan_twt"
              className="bg-gray-300 dark:bg-gray-800 rounded-full hover:bg-gray-400 dark:hover:bg-gray-600 transition p-3 text-sm text-center w-28"
            >
              Twitter
            </Link>
            <Link
              href="https://www.linkedin.com/in/farhan-khan-71a857296/"
              className="bg-gray-300 dark:bg-gray-800 rounded-full hover:bg-gray-400 dark:hover:bg-gray-600 transition p-3 text-sm text-center w-28"
            >
              LinkedIn
            </Link>
            <Link
              href="https://github.com/farhankhan197"
              className="bg-gray-300 dark:bg-gray-800 rounded-full hover:bg-gray-400 dark:hover:bg-gray-600 transition p-3 text-sm text-center w-28"
            >
              GitHub
            </Link>
            <Link
              href="https://leetcode.com/farhankhan19"
              className="bg-gray-300 dark:bg-gray-800 rounded-full hover:bg-gray-400 dark:hover:bg-gray-600 transition p-3 text-sm text-center w-28"
            >
              LeetCode
            </Link>
          </div>
        </motion.div>

        <p className="mt-10 text-xs text-gray-500 text-center">
          Built with dedication by Farhan.
        </p>
      </div>
    </>
  );
}
