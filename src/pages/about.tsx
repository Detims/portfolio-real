import { motion } from "motion/react";
import { Divider } from "../components/divider";
import { Experience } from "../components/experience";
import {
    fadeDrop,
    softEase,
    staggerFadeDrop,
    viewportOnce,
} from "../lib/motion";

export function About() {
    return(
        <>
            <Divider label="About" id="about">
                <motion.div
                    className="flex flex-col items-center justify-center gap-12 lg:flex-row"
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    variants={staggerFadeDrop}
                >
                    <motion.div
                        className="mx-auto w-64 shrink-0 md:mx-0 md:w-80"
                        variants={fadeDrop}
                        whileHover={{ y: -3 }}
                        transition={{ duration: 0.2, ease: softEase }}
                    >
                        <div className="relative aspect-3/4 overflow-hidden rounded-md">
                            <img 
                                src="/images/profile.jpg"
                                alt="Nhan Nguyen"
                                className="size-full object-cover"
                            /> 
                        </div>
                    </motion.div>
                    <motion.p
                        className="mx-12 text-xl leading-relaxed text-white/85 md:mx-0"
                        variants={fadeDrop}
                    >
                        I'm a Computer Science student at California State University, Long Beach, and also
                        pursuing a minor in Statistics. I have a deep passion for artificial intelligence and 
                        machine learning, with a focus on tackling real-world problems with data-driven solutions.
                        I'm always eager to build my skills and connect with likewise passionate individuals to grow 
                        as a developer and person.
                    </motion.p>
                </motion.div>
            </Divider>
            <Experience />
        </>
    );
}
