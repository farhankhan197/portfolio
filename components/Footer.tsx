"use client";
import Link from "next/link";
import GithubIcon from "@/components/GithubIcon";
import TwitterIcon from "@/components/TwitterIcon";
import LinkedinIcon from "@/components/LinkedinIcon";
import dynamic from "next/dynamic";

const LeetCodeIcon = dynamic(() => import("@/components/LeetcodeIcon"), {
  ssr: false,
});

const socialLinks = [
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
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/farhan-khan-71a857296/",
    icon: <LinkedinIcon className="h-5 w-5" />,
  },
  {
    name: "LeetCode",
    url: "https://leetcode.com/farhankhan19",
    icon: <LeetCodeIcon className="h-5 w-5" />,
  },
];

export default function Footer() {
  return (
    <footer className="w-full py-8 mt-12 border-t border-gray-800">
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-4">
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label={link.name}
            >
              {link.icon}
            </Link>
          ))}
        </div>
        <p className="text-xs text-gray-500">
          Built with ❤️ by Farhan Khan
        </p>
      </div>
    </footer>
  );
}