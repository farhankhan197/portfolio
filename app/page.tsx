"use client"
import Image from "next/image";
import { ModeToggle } from "@/components/ModeToggle";
import Link from "next/link";
import { useState } from "react";
import  LeetCodeIcon  from "@/components/LeetcodeIcon";
import TwitterIcon from "@/components/TwitterIcon";
import { Building2, ChevronRight, LinkIcon,  Instagram, Facebook, X, Dribbble } from 'lucide-react'

import FallingStarsBackground from "@/components/FallingStars";
import StarfieldBackground from "@/components/StarField";

export default function Home() {
  const [showSocials, setShowSocials] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
     {/* <FallingStarsBackground />  */}
      <StarfieldBackground />
      <main className="max-w-sm w-full">
        {/* Profile Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Image
              src="/images/profile.jpg"
              alt="Profile Picture"
              width={50}
              height={50}
              className="rounded-full"
            />
            <h1 className="text-sm">
              Welcome to <span className="font-semibold">my Portfolio</span>
            </h1>
          </div>
          <div className="mt-2">
            <ModeToggle />
          </div>
        </div>

        {/* Name & Role */}
        <div className="flex flex-col items-center mb-8 text-center">
          <h1 className="text-4xl font-bold">Farhan Khan</h1>
          <p className="text-muted-foreground text-lg">Software Engineer</p>
        </div>

        {/* Navigation Menu */}
        <nav className="mb-8 w-full">
          <h2 className="text-sm text-muted-foreground mb-4">MENU</h2>
          <ul className="space-y-3">
            {[
              { name: "About", href: "/About" },
              { name: "Projects", href: "/Projects" },
              { name: "Skills", href: "/Skills" },
              { name: "Contact", href: "/Contact" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between text-muted-foreground hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors rounded-lg py-3 px-4 w-full"
                >
                  <span className="text-base">{item.name}</span>
                  <ChevronRight className="h-5 w-5 opacity-70 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>


        <section className="mb-6">
          <h2 className="text-sm text-muted-foreground mb-6">ANOTHER LINKS</h2>
          <div className="space-y-4 pl-4">
            <Link 
              href="https://github.com/farhankhan197"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full border rounded-md p-2 text-muted-foreground hover:bg-accent transition-colors"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>GitHub</span>
            </Link>
            <div className="grid grid-cols-2 gap-1">
              <Link 
                href="https://leetcode.com/farhankhan19"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border rounded-md py-2 hover:bg-accent transition-colors"
              >
                <LeetCodeIcon></LeetCodeIcon>
                <span>LeetCode</span>
              </Link>
              <Link 
                href="https://www.linkedin.com/in/farhan-khan-71a857296/"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border rounded-md py-2 hover:bg-accent transition-colors"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span>LinkedIn</span>
              </Link>
            </div>
          </div>
        </section>

        <div className="h-px bg-border mb-6" />

        <section className="relative h-10">
          <div className={`absolute inset-0 transition-opacity duration-300 ${showSocials ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  setShowSocials(true)
                  setIsAvailable(false)
                }}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <LinkIcon className="h-4 w-4" />
                <span>More links</span>
              </button>
              
              {isAvailable ? (
                <button className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-green-200 transition-colors whitespace-nowrap">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  Available
                </button>
              ) : null}
            </div>
          </div>
          <div className={`absolute inset-0 transition-opacity duration-300 ${showSocials ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Link href="https://x.com/Farhankhan_twt" target="_blank" rel="noopener noreferrer" className="p-2 rounded-md hover:bg-accent transition-colors">
                  <TwitterIcon />
                </Link>
                <Link href="https://instagram.com/musunoa" target="_blank" rel="noopener noreferrer" className="p-2 rounded-md hover:bg-accent transition-colors">
                  <Instagram className="h-5 w-5 text-muted-foreground" />
                </Link>
                
              </div>
              <button
                onClick={() => {
                  setShowSocials(false)
                  setIsAvailable(true)
                }}
                className="text-muted-foreground hover:text-foreground transition-colors"
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
