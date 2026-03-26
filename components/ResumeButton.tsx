"use client";
import { Download } from "lucide-react";
import Link from "next/link";
import { socialLinks } from "@/lib/data";

export default function ResumeButton() {
  const resumeLink = socialLinks.find((link) => link.name === "Resume")?.url;

  if (!resumeLink) return null;

  return (
    <Link
      href={resumeLink}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg transition-colors text-sm font-medium hover:bg-primary/90"
    >
      <Download className="h-4 w-4" />
      Download Resume
    </Link>
  );
}