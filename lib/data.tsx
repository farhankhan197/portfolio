import { Skill, SocialLink, WorkExperience, Project, NavItem, SkillCategory } from "./types";
import GithubIcon from "@/components/GithubIcon";
import LinkedinIcon from "@/components/LinkedinIcon";
import TwitterIcon from "@/components/TwitterIcon";
import LeetCodeIcon from "@/components/LeetcodeIcon";
import { Instagram, FileText } from "lucide-react";

export const getSocialIcon = (iconName?: string) => {
  switch (iconName) {
    case "github": return <GithubIcon className="h-5 w-5" />;
    case "twitter": return <TwitterIcon className="h-5 w-5" />;
    case "leetcode": return <LeetCodeIcon className="h-5 w-5" />;
    case "linkedin": return <LinkedinIcon className="h-5 w-5" />;
    case "instagram": return <Instagram className="h-5 w-5" />;
    case "resume": return <FileText className="h-5 w-5" />;
    default: return null;
  }
};

export const getSkillIcon = (skillName?: string) => {
  return <GithubIcon className="h-5 w-5" />;
};

export const navItems: NavItem[] = [
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Skills", path: "/skills" },
  { name: "Contact", path: "/contact" },
];

export const skills: Skill[] = [
  { name: "Javascript", iconName: "javascript" },
  { name: "TypeScript", iconName: "typescript" },
  { name: "Python", iconName: "python" },
  { name: "React", iconName: "react" },
  { name: "Next.js", iconName: "nextjs" },
  { name: "Tailwind CSS", iconName: "tailwind" },
  { name: "Node.js", iconName: "nodejs" },
  { name: "Express", iconName: "express" },
  { name: "MongoDB", iconName: "mongodb" },
];

export const projects: Project[] = [
  {
    title: "Retail Radar",
    description: "A Dashboard for Retail Owners",
    url: "",
    image: "/images/retail-radar.png",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Vizack Enterprises",
    description: "A Next.js Website for Vizack Enterprises.",
    url: "https://vizackenterprises.com",
    image: "/images/vizack.png",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
];

export const projectsPage: Project[] = [
  {
    title: "Starfield Portfolio",
    description: "A personal portfolio website inspired by space. Built with Next.js.",
    url: "https://farhankhan.vercel.app/",
    image: "/images/portfolio-preview.png",
    techStack: ["Next.js", "TypeScript", "Framer Motion"],
  },
  {
    title: "Vizack Enterprises",
    description: "A website for a construction company built with Next.js.",
    url: "https://vizackenterprises.com",
    image: "/images/vizack.png",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Retail Radar",
    description: "A retail analytics dashboard for tracking sales data.",
    url: "https://retail-radar-bice.vercel.app/",
    image: "/images/retail-radar.png",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
];

export const workExperience: WorkExperience[] = [
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

export const socialLinks: SocialLink[] = [
  { name: "GitHub", url: "https://github.com/farhankhan197", iconName: "github" },
  { name: "Twitter", url: "https://twitter.com/Farhankhan_twt", iconName: "twitter" },
  { name: "LeetCode", url: "https://leetcode.com/farhankhan19", iconName: "leetcode" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/farhan-khan-71a857296/", iconName: "linkedin" },
  { name: "Instagram", url: "https://www.instagram.com/musunoa/", iconName: "instagram" },
  { name: "Resume", url: "/Farhan_Khan_Resume.pdf", iconName: "resume" },
];

export const skillCategories: SkillCategory[] = [
  {
    category: "Frontend",
    list: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js"],
  },
  {
    category: "Backend",
    list: ["Node.js", "Express", "Flask", "Django"],
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
    list: ["Python", "SciKit Learn", "Scipy", "nltk", "TensorFlow", "PyTorch", "OpenCV"],
  },
];
