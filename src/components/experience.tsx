import { motion } from "motion/react";
import { Divider } from "./divider";
import { fadeDrop, viewportOnce } from "../lib/motion";

type ExperienceItem = {
    title: string;
    period: string;
    organization: string;
    summary?: string;
    bullets?: string[];
};

const experiences: ExperienceItem[] = [
    {
        title: "Machine Learning Engineer",
        period: "June 2026 — Present",
        organization: "American Society of Mechanical Engineers",
        bullets: [
            "Contributed to the construction of an autonomous glider for iAM3D through a Raspberry Pi 4-based computer vision pipeline using OpenCV-based visualization, distance measurement, gyroscope, and GPS telemetry.",
            "Trained a YOLOv8n object detection model on a 15,000+ image custom Pascal and COCO-based dataset using ClearML across 10 epochs with a batch size of 8 images and 6 classes, achieving 0.77 and 0.87 F1 scores on person and building detection.",
            "Integrated a ground control user interface with Python sockets to display bounding boxes, roll, pitch, and GPS telemetry with an average latency of 0.3 seconds.",
        ],
    },
    {
        title: "Web Developer",
        period: "August 2025 — June 2026",
        organization:
            "Union of Vietnamese Student Associations of Southern California",
        bullets: [
            "Designed and developed a large-scale community platform from scratch through the Agile development framework, executing weekly sprint cycles to deliver iterative design and features under 1–2 week constraints.",
            "Implemented responsive front-end architecture using TypeScript, React, and Tailwind CSS, increasing cross-device compatibility and reducing page load times by up to 200%.",
            "Opened and received approval for 15 pull requests concerning major features and issues, including site-wide mobile responsiveness, new pages, and component implementation and styling fixes.",
        ],
    },
    {
        title: "Frontend Developer",
        period: "August 2025 — March 2026",
        organization: "Association of Computing Machinery",
        bullets: [
            "Contributed to front-end event infrastructure and registration systems using JavaScript, Tailwind CSS, and GSAP, processing 300+ applications and supporting seamless experiences for 137 attendees.",
            "Designed and implemented a dynamic website section with animated GSAP components showcasing 6 hackathon tracks and 12 sponsors within a 1-week development constraint.",
            "Integrated Firebase to support weekly newsletter distributions reaching 300+ recipients through the organization\’s email workflow.",
        ],
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

                            <div className="col-start-2 mt-6 max-w-3xl text-sm leading-6 text-white/65 md:col-start-2 md:row-start-1 md:mt-0 md:pl-12 md:text-base md:leading-7">
                                {experience.bullets ? (
                                    <ul className="list-disc space-y-3 pl-5 marker:text-indigo-300/80">
                                        {experience.bullets.map((bullet) => (
                                            <li key={bullet}>{bullet}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>{experience.summary}</p>
                                )}
                            </div>
                        </motion.li>
                    );
                })}
            </ol>
        </Divider>
    );
}
