import { Divider } from "../components/divider";
import {
    ProjectCard,
    type ProjectCardProps,
} from "../components/project-card";

const placeholderProjects: ProjectCardProps[] = [
    {
        title: "Project title",
        description:
            "Add a concise overview of what you built, who it serves, and the problem or result that makes the project worth exploring.",
        image: "/images/space.png",
        imageAlt:
            "Placeholder illustration of a nervous character with a looming shadow",
        links: [
            { label: "Live site", href: "#project-01" },
            { label: "Github", href: "#project-01" },
        ],
    },
    {
        title: "Project title",
        description:
            "Add a concise overview of what you built, who it serves, and the problem or result that makes the project worth exploring.",
        image: "/images/space.png",
        imageAlt:
            "Placeholder illustration of a nervous character with a looming shadow",
        links: [
            { label: "Live site", href: "#project-02" },
            { label: "Github", href: "#project-02" },
        ],
    },
    {
        title: "Project title",
        description:
            "Add a concise overview of what you built, who it serves, and the problem or result that makes the project worth exploring.",
        image: "/images/space.png",
        imageAlt:
            "Placeholder illustration of a nervous character with a looming shadow",
        links: [
            { label: "Live site", href: "#project-03" },
            { label: "Github", href: "#project-03" },
        ],
    },
];

export function Projects() {
    return (
        <Divider id="projects" label="Projects">
            <ul className="space-y-24 md:space-y-32">
                {placeholderProjects.map((project, index) => (
                    <li key={index}>
                        <ProjectCard {...project} />
                    </li>
                ))}
            </ul>
        </Divider>
    );
}
