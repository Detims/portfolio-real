import type { ReactNode } from "react";

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
            <header className="mb-16 pb-4 border-b-2 border-white/15">
                <h2 className="ml-6 text-lg md:text-xl uppercase tracking-widest text-white/80">
                    {label}
                </h2>
            </header>
            {children}
        </section>
    );
}