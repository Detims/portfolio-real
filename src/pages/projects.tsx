import { Divider } from "../components/divider";

type ProjectLink = {
    label: string;
    href: string;
};

type Project = {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    links: ProjectLink[];
};

const placeholderProjects: Project[] = [
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
                        <div
                            className="grid scroll-mt-8 items-start gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.9fr)] lg:gap-12 xl:gap-16"
                        >
                            <div className="group relative aspect-16/10 overflow-hidden rounded-sm border border-white/15 bg-white/5">
                                <img
                                    src={project.image}
                                    alt={project.imageAlt}
                                    className="size-full object-cover transition duration-500 ease-out group-hover:scale-[1.02]"
                                />
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-white/5"
                                />
                            </div>

                            <div className="pt-1 lg:pt-0">
                                <h3 className="text-4xl font-normal tracking-tight text-white md:text-5xl lg:text-6xl">
                                    {project.title}
                                </h3>

                                <p className="mt-6 max-w-xl text-base leading-7 text-white/60 md:text-lg md:leading-8">
                                    {project.description}
                                </p>

                                <ul
                                    aria-label={`${project.title} links`}
                                    className="mt-8 flex flex-wrap gap-x-7 gap-y-4"
                                >
                                    {project.links.map((link) => (
                                        <li key={link.label}>
                                            <a
                                                href={link.href}
                                                className="group/link inline-flex items-center gap-2 border-b border-white/30 pb-1 text-xs font-medium uppercase tracking-[0.22em] text-white/75 transition-colors hover:border-indigo-300 hover:text-indigo-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-300 md:text-sm"
                                            >
                                                {link.label}
                                                <svg
                                                    aria-hidden="true"
                                                    viewBox="0 0 16 16"
                                                    className="size-3 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                                                >
                                                    <path
                                                        d="M4 12 12 4m-6 0h6v6"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="1.5"
                                                    />
                                                </svg>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </Divider>
    );
}
