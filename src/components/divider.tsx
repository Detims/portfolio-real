import type { ReactNode } from "react";
import { motion } from "motion/react";
import { fadeDrop, viewportOnce } from "../lib/motion";

type DividerProps = {
    id?: string
    label: string;
    children: ReactNode
}

export function Divider({ id, label, children }: DividerProps) {
    return (
        <section
            id={id}
            className="mx-6 my-24 md:ml-56 md:mr-12 lg:ml-64 lg:mr-20"
        >
            <motion.header
                className="mb-16 border-b-2 border-white/15 pb-4"
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={fadeDrop}
            >
                <h2 className="ml-6 text-lg md:text-xl uppercase tracking-widest text-white/80">
                    {label}
                </h2>
            </motion.header>
            {children}
        </section>
    );
}
