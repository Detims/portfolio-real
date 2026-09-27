import type { Variants } from "motion/react";

export const softEase: [number, number, number, number] = [
    0.22, 1, 0.36, 1,
];

export const fadeDrop: Variants = {
    hidden: {
        opacity: 0,
        y: -20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 2,
            ease: softEase,
        },
    },
};

export const fadeOnly: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 2,
            ease: softEase,
        },
    },
};

export const staggerFadeDrop: Variants = {
    hidden: {},
    visible: {
        transition: {
            delayChildren: 0.15,
            staggerChildren: 0.30,
        },
    },
};

export const viewportOnce = {
    amount: 0.2,
    once: true,
} as const;
