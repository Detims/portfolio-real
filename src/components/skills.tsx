import { motion } from "motion/react";
import {
    fadeDrop,
    softEase,
    staggerFadeDrop,
    viewportOnce,
} from "../lib/motion";
import { Divider } from "./divider";

type SkillGroup = {
    label: string;
    items: string[];
};

const skillGroups: SkillGroup[] = [
    {
        label: "Languages",
        items: [
            "Java",
            "JavaScript",
            "TypeScript",
            "Python",
            "C++",
            "HTML",
            "CSS",
            "GDScript",
        ],
    },
    {
        label: "Frameworks",
        items: [
            "Flask",
            "Next.js",
            "React",
            "Tailwind CSS",
            "Express.js",
            "Pandas",
            "Scikit-learn",
            "PyTorch",
        ],
    },
    {
        label: "Tools",
        items: [
            "Docker",
            "DataGrip",
            "MySQL",
            "PostgreSQL",
            "MongoDB",
            "Figma",
            "Microsoft Office",
            "Azure",
            "Supabase",
        ],
    },
];

export function Skills() {
    return (
        <Divider label="Skills" id="skills">
            <motion.div 
                className="flex flex-col gap-10 md:gap-12"
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={staggerFadeDrop}
            >
                {skillGroups.map((group) => (
                    <motion.div key={group.label} variants={fadeDrop}>
                        <motion.h4 
                            className="mb-4 text-xs font-medium uppercase tracking-[0.24em] text-indigo-300"
                            variants={fadeDrop}
                        >
                            {group.label}
                        </motion.h4>
                        <ul className="flex flex-wrap gap-2.5">
                            {group.items.map((item) => (
                                <motion.li
                                    key={item}
                                    className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/75 shadow-sm shadow-black/25 transition-colors hover:border-indigo-300/50 hover:bg-indigo-300/10 hover:text-white"
                                    whileHover={{ y: -2 }}
                                    transition={{
                                        duration: 0.18,
                                        ease: softEase,
                                    }}
                                >
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </motion.div>
        </Divider>
    );
}
