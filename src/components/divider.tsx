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
            className="mx-auto my-24 max-w-7xl px-6 md:my-32 md:px-10"
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
