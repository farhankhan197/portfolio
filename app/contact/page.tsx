"use client";
import { motion } from "framer-motion";
import NavBar from "@/components/Navbar";
import Link from "next/link";
import { useState } from "react";
import { JSX } from "react/jsx-runtime";
export default function Contact(): JSX.Element {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for Nodemailer API call
    console.log("Form Data Submitted:", formData);
  };

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
          <h1 className="text-3xl font-extrabold">Contact Me</h1>
          <p className="text-lg text-gray-500 mt-2">
            Feel free to reach out for collaborations, questions, or just to say
            hi!
          </p>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex text-sm max-w-lg gap-6 mx-6 text-gray-300 mb-8"
        >
          <Link
            href="https://github.com/farhankhan197"
            className="hover:text-blue-500 transition"
          >
            GitHub
          </Link>
          <Link
            href="https://twitter.com/Farhankhan_twt"
            className="hover:text-blue-500 transition"
          >
            Twitter
          </Link>
          <Link
            href="https://www.linkedin.com/in/farhan-khan-71a857296/"
            className="hover:text-blue-500 transition"
          >
            LinkedIn
          </Link>
          <Link
            href="https://leetcode.com/farhankhan19"
            className="hover:text-blue-500 transition"
          >
            LeetCode
          </Link>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-lg bg-transparent backdrop-blur-lg border border-gray-800 rounded-xl shadow-md p-6"
        >
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm text-gray-400">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-600 rounded-md bg-transparent text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm text-gray-400">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-600 rounded-md bg-transparent text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-sm text-gray-400">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full mt-1 p-2 border border-gray-600 rounded-md bg-transparent text-white focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
          >
            Send Message
          </button>
        </motion.form>

        <p className="mt-10 text-xs text-gray-500 text-center">
          Built with passion by Farhan.
        </p>
      </div>
    </>
  );
}
