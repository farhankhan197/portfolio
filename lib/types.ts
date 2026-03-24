import { JSX } from "react";

export interface Skill {
  name: string;
  icon?: JSX.Element;
  iconName?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon?: JSX.Element;
  iconName?: string;
}

export interface WorkExperience {
  company: string;
  logo: string;
  jobTitle: string;
  duration: string;
  url: string;
}

export interface Project {
  title: string;
  description: string;
  url: string;
  image: string;
  techStack?: string[];
}

export interface NavItem {
  name: string;
  path: string;
}

export interface SkillCategory {
  category: string;
  list: string[];
}
