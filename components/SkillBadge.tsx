"use client";
import { Skill } from "@/lib/types";
import GithubIcon from "@/components/GithubIcon";
import { JSX } from "react";

const skillIcons: Record<string, JSX.Element> = {
  javascript: <GithubIcon className="h-4 w-4" />,
  typescript: <GithubIcon className="h-4 w-4" />,
  python: <GithubIcon className="h-4 w-4" />,
  react: <GithubIcon className="h-4 w-4" />,
  nextjs: <GithubIcon className="h-4 w-4" />,
  tailwind: <GithubIcon className="h-4 w-4" />,
  nodejs: <GithubIcon className="h-4 w-4" />,
  express: <GithubIcon className="h-4 w-4" />,
  mongodb: <GithubIcon className="h-4 w-4" />,
};

interface SkillBadgeProps {
  skill: Skill;
}

export default function SkillBadge({ skill }: SkillBadgeProps) {
  const icon = skill.iconName ? skillIcons[skill.iconName] : <GithubIcon className="h-4 w-4" />;

  return (
    <div className="flex items-center gap-2 bg-gray-300 dark:bg-gray-800 rounded-full px-4 py-2 transition-transform hover:scale-105">
      {icon}
      <span className="text-sm font-medium">{skill.name}</span>
    </div>
  );
}
