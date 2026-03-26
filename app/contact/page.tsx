"use client";
import { motion } from "framer-motion";
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState } from "react";
import LinkedinIcon from "@/components/LinkedinIcon";
import GithubIcon from "@/components/GithubIcon";
import TwitterIcon from "@/components/TwitterIcon";
import DiscordIcon from "@/components/DiscordIcon";
import dynamic from "next/dynamic";
import {Instagram,LinkIcon} from "lucide-react";
import { JSX } from "react/jsx-runtime";

const LeetCodeIcon = dynamic(() => import("@/components/LeetcodeIcon"), {
  ssr: false,
});
export default function Contact(): JSX.Element {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  interface SocialLink{
    name: string;
    url: string;
    icon: JSX.Element;
  }

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center p-6 bg-transparent text-foreground">
        {/* Navigation Bar */}
        <NavBar />

        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-20 mb-8 w-full max-w-lg px-4"
        >
          <h1 className="text-3xl font-extrabold">Contact Me</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Feel free to reach out for collaborations, questions, or just to say
            hi!
          </p>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex gap-4 w-full max-w-xl sm:max-w-sm md:max-w-lg mb-6 items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.url}
              className="bg-muted dark:bg-muted rounded-full hover:bg-muted-foreground/20 dark:hover:bg-muted-foreground/30 transition"
            >
              {link.icon}
            </Link>
          ))}
        </motion.div>
          <p className="text-sm">Email me for urgent communication.</p>
        <Link href="mailto:farhankhan.code@gmail.com" className="flex hover:underline items-center group gap-2 mt-2">
          <LinkIcon className="rotate-0 group-hover:rotate-45  transition-all ease-in-out transform"></LinkIcon>
          <p className="mt-1 text-lg group hover:underline">farhankhan.code@gmail.com</p>
        </Link>

        <button className="inline-flex m-6 items-center gap-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium hover:bg-green-200 dark:hover:bg-green-800 transition-colors whitespace-nowrap">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          Available
        </button>

        <h1 className="m-6 text-xl">OR</h1>
        <p className="text-lg m-4">Email me Through this Form.</p>
        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-lg bg-transparent backdrop-blur-lg border border-border rounded-xl shadow-md p-6"
        >
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm text-muted-foreground">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-border rounded-md bg-transparent text-foreground focus:outline-none focus:border-primary"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm text-muted-foreground">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-border rounded-md bg-transparent text-foreground focus:outline-none focus:border-primary"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-sm text-muted-foreground">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full mt-1 p-2 border border-border rounded-md bg-transparent text-foreground focus:outline-none focus:border-primary"
            ></textarea>
          </div>

          {submitStatus === "success" && (
            <div className="mb-4 p-3 bg-green-500/20 text-green-400 rounded-md text-center">
              Message sent successfully! I'll get back to you soon.
            </div>
          )}
          {submitStatus === "error" && (
            <div className="mb-4 p-3 bg-red-500/20 text-red-400 rounded-md text-center">
              Failed to send message. Please try again or email me directly.
            </div>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </motion.form>

        <Footer />
      </div>
    </>
  );
}
