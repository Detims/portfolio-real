import { NavLink } from "react-router";

export function Home() {
    return(
        <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden bg-black">
            <div className="relative z-10 text-center">
                <h1 className="text-white text-5xl md:text-6xl lg:text-8xl">
                    Nhan Nguyen
                </h1>
                <h2 className="mt-8 text-2xl">
                    Software Engineer
                </h2>
                <div className="mt-10">
                    <NavLink 
                        to="/projects"
                        className="relative rounded-full border-2 border-white/60 bg-white/10 px-8 py-3 font-medium text-white"
                    >
                        Projects
                    </NavLink>
                </div>
            </div>
        </section>
    )
}