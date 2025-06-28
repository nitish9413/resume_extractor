import type { StaticImageData } from "next/image";
export interface Experience {
    company: string;
    position: string;
    start_date?: string | null;
    end_date?: string | null;
    description?: string | null;
}
export interface Education {
    institution: string;
    degree?: string | null;
    start_year?: string | null;
    end_year?: string | null;
}
export interface Project {
    title: string;
    description?: string | null;
    technologies?: string[] | null;
}
export interface Course {
    name: string;
    provider?: string | null;
    year?: string | null;
}
export interface Publication {
    title: string;
    journal_or_conference?: string | null;
    year?: string | null;
    link?: string | null;
}
export interface ResumeSchema {
    name: string;
    email?: string | null;
    phone?: string | null;
    skills: string[];
    education: Education[];
    experience: Experience[];
    projects: Project[];
    courses: Course[];
    publications: Publication[];
}