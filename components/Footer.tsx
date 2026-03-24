"use client";
import Link from "next/link";
import { socialLinks, getSocialIcon } from "@/lib/data";

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
              {getSocialIcon(link.iconName)}
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