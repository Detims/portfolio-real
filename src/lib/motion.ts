import type { Variants } from "motion/react";

export const softEase: [number, number, number, number] = [
    0.22, 1, 0.36, 1,
];

export const fadeDrop: Variants = {
    hidden: {
        opacity: 0,
        y: -16,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.42,
            ease: softEase,
        },
    },
};

export const fadeOnly: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.38,
            ease: softEase,
        },
    },
};

export const staggerFadeDrop: Variants = {
    hidden: {},
    visible: {
        transition: {
            delayChildren: 0.05,
            staggerChildren: 0.08,
        },
    },
};

export const viewportOnce = {
    amount: 0.2,
    once: true,
} as const;
