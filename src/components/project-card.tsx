import { motion } from "motion/react";
import { softEase } from "../lib/motion";

type ProjectLink = {
    label: string;
    href: string;
};

export type ProjectCardProps = {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    links: ProjectLink[];
};

export function ProjectCard({
    title,
    description,
    image,
    imageAlt,
    links,
}: ProjectCardProps) {
    return (
        <article className="grid scroll-mt-8 items-start gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.9fr)] lg:gap-12 xl:gap-16">
            <motion.div
                className="group relative aspect-16/10 overflow-hidden rounded-sm border border-white/15 bg-white/5"
                initial="rest"
                animate="rest"
                whileHover="hover"
                variants={{
                    rest: { y: 0 },
                    hover: { y: -3 },
                }}
                transition={{ duration: 0.22, ease: softEase }}
            >
                <motion.img
                    src={image}
                    alt={imageAlt}
                    className="size-full object-cover"
                    variants={{
                        rest: { scale: 1 },
                        hover: { scale: 1.02 },
                    }}
                    transition={{ duration: 0.45, ease: softEase }}
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-white/5"
                />
            </motion.div>

            <div className="pt-1 lg:pt-0">
                <h3 className="text-4xl font-normal tracking-tight text-white md:text-5xl lg:text-6xl">
                    {title}
                </h3>

                <p className="mt-6 max-w-xl text-base leading-7 text-white/60 md:text-lg md:leading-8">
                    {description}
                </p>

                <ul
                    aria-label={`${title} links`}
                    className="mt-8 flex flex-wrap gap-x-7 gap-y-4"
                >
                    {links.map((link) => (
                        <li key={link.label}>
                            <motion.a
                                href={link.href}
                                className="group/link inline-flex items-center gap-2 border-b border-white/30 pb-1 text-xs font-medium uppercase tracking-[0.22em] text-white/75 transition-colors hover:border-indigo-300 hover:text-indigo-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-300 md:text-sm"
                                whileHover={{ y: -2 }}
                                transition={{ duration: 0.18, ease: softEase }}
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
                            </motion.a>
                        </li>
                    ))}
                </ul>
            </div>
        </article>
    );
}
