import { motion } from "motion/react";
import { Divider } from "./divider";
import { fadeDrop, viewportOnce } from "../lib/motion";

type ExperienceItem = {
    title: string;
    period: string;
    organization: string;
    summary: string;
};

const experiences: ExperienceItem[] = [
    {
        title: "Machine Learning Engineer",
        period: "June 2026 — Present",
        organization: "American Society of Mechanical Engineers",
        summary:
            "Trained a YOLOv8n object detection model on a 15,000+ image custom Pascal and COCO dataset for OpenCV visualization alongside live flight telemetry.",
    },
    {
        title: "Web Developer",
        period: "August 2025 — June 2026",
        organization:
            "Union of Vietnamese Student Associations of Southern California",
        summary:
            "Designed and shipped a responsive platform with Next.js, Typescript, and Tailwind, delivering high-performance web experiences for hundreds of users.",
    },
    {
        title: "Frontend Developer",
        period: "August 2025 — March 2026",
        organization: "Association of Computing Machinery",
        summary:
            "Built event registration and animated hackathon experiences with JavaScript, Tailwind CSS, and GSAP, supporting more than 300 applications and 137 attendees.",
    },
    {
        title: "B.S in Computer Science",
        period: "August 2023 — Present",
        organization: "California State University, Long Beach",
        summary:
            "Studying Software Development and Machine Learning. Minoring in Statistics."
    }
];

export function Experience() {
    return (
        <Divider id="experience" label="Experience">
            <ol
                aria-label="Professional experience timeline"
                className="mx-auto max-w-7xl"
            >
                {experiences.map((experience, index) => {
                    const isLast = index === experiences.length - 1;

                    return (
                        <motion.li
                            key={`${experience.organization}-${experience.title}`}
                            className={`relative grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-5 md:grid-cols-[42%_58%] md:gap-x-0 ${
                                isLast ? "" : "pb-16 md:pb-28"
                            }`}
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewportOnce}
                            variants={fadeDrop}
                        >
                            {!isLast && (
                                <span
                                    aria-hidden="true"
                                    className="absolute bottom-0 left-1.5 top-2 w-px bg-linear-to-b from-indigo-400/80 to-white/15 md:left-[42%]"
                                />
                            )}

                            <span
                                aria-hidden="true"
                                className="absolute left-1.5 top-2 size-3 -translate-x-1/2 rounded-full border-2 border-black bg-indigo-300 shadow-[0_0_18px_rgba(129,140,248,0.8)] md:left-[42%]"
                            />

                            <div className="col-start-2 md:col-start-1 md:row-start-1 md:pr-12 md:text-right">
                                <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/45 md:text-sm">
                                    {experience.period}
                                </p>
                                <h3 className="mt-3 text-2xl font-medium tracking-tight text-white md:text-3xl">
                                    {experience.title}
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-indigo-300 md:text-base">
                                    {experience.organization}
                                </p>
                            </div>

                            <p className="col-start-2 mt-6 max-w-3xl text-base leading-7 text-white/65 md:col-start-2 md:row-start-1 md:mt-0 md:pl-12 md:text-xl md:leading-8">
                                {experience.summary}
                            </p>
                        </motion.li>
                    );
                })}
            </ol>
        </Divider>
    );
}
