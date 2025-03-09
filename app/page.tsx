"use client"
import Image from "next/image";
import { ModeToggle } from "@/components/ModeToggle";
import Link from "next/link";
import { useState, useEffect } from "react";
import TwitterIcon from "@/components/TwitterIcon";
import { Building2, ChevronRight, LinkIcon, Instagram, Facebook, X, Dribbble } from 'lucide-react'

// Commented out but available for use
// import FallingStarsBackground from "@/components/FallingStars";
// import StarfieldBackground from "@/components/StarField";
import dynamic from "next/dynamic";

const LeetCodeIcon = dynamic(() => import("@/components/LeetcodeIcon"), { ssr: false });

export default function Home() {
  const [showSocials, setShowSocials] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Fade-in effect when page loads
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen text-foreground flex flex-col items-center justify-center p-4">
      {/* <FallingStarsBackground /> */}
      <main className={`max-w-sm w-full transition-opacity duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        {/* Profile Section with subtle float animation */}
        <div className="flex flex-col items-center mb-8 hover:scale-105 transition-transform duration-300 backdrop-blur-sm bg-background/60 p-4 rounded-lg shadow-md animate-float">
          <div className="flex items-center gap-3 text-muted-foreground">
            <div className="relative overflow-hidden rounded-full ring-2 ring-primary/20 hover:ring-primary transition-all duration-300">
              <Image
                src="/images/profile.jpg"
                alt="Profile Picture"
                width={50}
                height={50}
                className="rounded-full hover:brightness-110 transition-all duration-300"
              />
            </div>
            <h1 className="text-sm">
              Welcome to <span className="font-semibold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">my Portfolio</span>
            </h1>
          </div>
          <div className="mt-2">
            <ModeToggle />
          </div>
        </div>

        {/* Name & Role with typing animation */}
        <div className="flex flex-col items-center mb-8 text-center backdrop-blur-sm bg-background/60 p-5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
          <h1 className="text-4xl font-bold animate-fade-in-up bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text">Farhan Khan</h1>
          <p className="text-muted-foreground mt-4 text-lg relative inline-block animate-typing overflow-hidden whitespace-nowrap border-r-2 border-primary">Software Engineer</p>
        </div>

        {/* Navigation Menu with hover effects */}
        <nav className="mb-8 w-full backdrop-blur-sm bg-background/60 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
          <h2 className="text-sm text-muted-foreground mb-4 font-semibold">MENU</h2>
          <ul className="space-y-3">
            {[
              { name: "About", href: "/About" },
              { name: "Projects", href: "/Projects" },
              { name: "Skills", href: "/Skills" },
              { name: "Contact", href: "/Contact" },
            ].map((item, index) => (
              <li key={item.href} className={`transform transition-all duration-300 hover:-translate-y-1 animate-fade-in`} style={{ animationDelay: `${index * 150}ms` }}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all rounded-lg py-3 px-4 w-full group"
                >
                  <span className="text-base group-hover:font-medium">{item.name}</span>
                  <ChevronRight className="h-5 w-5 opacity-70 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* External Links section with hover effects */}
        <section className="mb-6 backdrop-blur-sm bg-background/60 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
          <h2 className="text-sm text-muted-foreground mb-6 font-semibold">ANOTHER LINKS</h2>
          <div className="space-y-4 pl-4">
            <Link 
              href="https://github.com/farhankhan197"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full border rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-all hover:-translate-y-1 transform duration-300"
            >
              <svg className="h-4 w-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>GitHub</span>
            </Link>
            <div className="grid grid-cols-2 gap-1">
              <Link 
                href="https://leetcode.com/farhankhan19"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border rounded-md py-2 hover:bg-accent/60 hover:text-foreground transition-all hover:-translate-y-1 transform duration-300"
              >
                <LeetCodeIcon className="transition-transform group-hover:scale-110" />
                <span>LeetCode</span>
              </Link>
              <Link 
                href="https://www.linkedin.com/in/farhan-khan-71a857296/"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border rounded-md py-2 hover:bg-accent/60 hover:text-foreground transition-all hover:-translate-y-1 transform duration-300"
              >
                <svg className="h-4 w-4 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span>LinkedIn</span>
              </Link>
            </div>
          </div>
        </section>

        <div className="h-px bg-border mb-6 animate-pulse" />

        {/* Social links with animation */}
        <section className="relative h-10 backdrop-blur-sm bg-background/60 p-4 rounded-lg shadow-md">
          <div className={`absolute inset-0 transition-opacity duration-300 ${showSocials ? 'opacity-0 pointer-events-none' : 'opacity-100'} flex items-center`}>
            <div className="flex items-center justify-between w-full">
              <button
                onClick={() => {
                  setShowSocials(true)
                  setIsAvailable(false)
                }}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                <LinkIcon className="h-4 w-4 group-hover:rotate-45 transition-transform" />
                <span className="group-hover:underline">More links</span>
              </button>
              
              {isAvailable ? (
                <button className="flex items-center gap-2 bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium hover:bg-green-200 dark:hover:bg-green-800/60 transition-colors whitespace-nowrap">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  Available
                </button>
              ) : null}
            </div>
          </div>
          <div className={`absolute inset-0 transition-opacity duration-300 ${showSocials ? 'opacity-100' : 'opacity-0 pointer-events-none'} flex items-center`}>
            <div className="flex items-center justify-between w-full">
              <div className="flex gap-2">
                <Link href="https://x.com/Farhankhan_twt" target="_blank" rel="noopener noreferrer" className="p-2 rounded-md hover:bg-accent/80 transition-all hover:scale-110 transform">
                  <TwitterIcon className="text-muted-foreground hover:text-foreground transition-colors" />
                </Link>
                <Link href="https://instagram.com/musunoa" target="_blank" rel="noopener noreferrer" className="p-2 rounded-md hover:bg-accent/80 transition-all hover:scale-110 transform">
                  <Instagram className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                </Link>
              </div>
              <button
                onClick={() => {
                  setShowSocials(false)
                  setIsAvailable(true)
                }}
                className="text-muted-foreground hover:text-foreground transition-colors hover:rotate-90 transform duration-300"
                aria-label="Close social links"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// Add these animations to your global CSS or tailwind.config.js
// @keyframes float {
//   0% { transform: translateY(0px); }
//   50% { transform: translateY(-10px); }
//   100% { transform: translateY(0px); }
// }
// 
// @keyframes typing {
//   from { width: 0 }
//   to { width: 100% }
// }
// 
// @keyframes fade-in-up {
//   0% { opacity: 0; transform: translateY(20px); }
//   100% { opacity: 1; transform: translateY(0); }
// }