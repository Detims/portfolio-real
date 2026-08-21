import { motion } from "motion/react";
import { Divider } from "../components/divider";
import {
    ProjectCard,
    type ProjectCardProps,
} from "../components/project-card";
import { fadeDrop, viewportOnce } from "../lib/motion";

const placeholderProjects: ProjectCardProps[] = [
    {
        title: "Desktop Job Sim",
        description:
            "A desktop pet with complex job trees, housing, and Gmail integration using Electron.",
        image: "/images/desktop-pet.png",
        imageAlt:
            "Sprite sheet of the desktop pet",
        links: [
            { label: "Github", href: "https://github.com/Detims/desktop-job-sim" },
        ],
    },
    {
        title: "OceanGuesser",
        description:
            "A Geoguessr-like game focused entirely on oceans and coastlines with Next.js and Google Maps API.",
        image: "/images/oceanguesser.png",
        imageAlt:
            "Home page of the OceanGuesser game",
        links: [
            { label: "Link", href: "https://ocean-guesser.vercel.app/" },
            { label: "Github", href: "https://github.com/ahpham123/ocean-guesser" },
            { label: "Devpost", href: "https://devpost.com/software/ocean-guesser" }
        ],
    },
    {
        title: "Facebook Clone",
        description:
            "A social network prototype to replicate core features of Facebook.",
        image: "/images/facebook.png",
        imageAlt:
            "Facebook logo",
        links: [
            { label: "Github", href: "https://github.com/Detims/facebook-clone" },
        ],
    },
    {
        title: "Space Debris Cleanup",
        description:
            "A space invaders-style game made using Godot.",
        image: "/images/space.png",
        imageAlt:
            "Main menu of the Space Debris Cleanup game",
        links: [
            { label: "Link", href: "https://ahpham123.itch.io/space-cleanup" },
            { label: "Github", href: "https://github.com/Detims/space-debris" },
            { label: "Devpost", href: "https://devpost.com/software/space-debris-cleaning-game" }
        ],
    },
    {
        title: "Gambling Bot!",
        description:
            "A Discord application with sentiment analysis, logging, and moderation tools using Discord API, NLTK library, and Supabase.",
        image: "/images/discord.svg",
        imageAlt:
            "Discord logo",
        links: [
            { label: "Github", href: "https://github.com/Detims/discord-bot" },
        ],
    },
    {
        title: "Arknights Recruitment Calculator",
        description:
            "An Arknights recruitment utility for quickly narrowing down compatible operators using Vite and HellaAPI.",
        image: "/images/recruitment.png",
        imageAlt:
            "Preview of the home page of the recruitment calculator site",
        links: [
            { label: "Link", href: "https://recruitment-calculator-sigma.vercel.app/" },
            { label: "Github", href: "https://github.com/Detims/recruitment-calculator" },
        ],
    },
];

export function Projects() {
    return (
        <Divider id="projects" label="Projects">
            <ul className="space-y-24 md:space-y-32">
                {placeholderProjects.map((project) => (
                    <motion.li
                        key={project.title}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        variants={fadeDrop}
                    >
                        <ProjectCard {...project} />
                    </motion.li>
                ))}
            </ul>
        </Divider>
    );
}
