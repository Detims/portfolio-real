import { Divider } from "../components/divider";
import { Experience } from "../components/experience";

export function About() {
    return(
        <>
            <Divider label="About" id="about">
                <div className="flex flex-col lg:flex-row gap-12 items-center justify-center">
                    <div className="mx-auto w-64 shrink-0 md:mx-0 md:w-80">
                        <div className="relative aspect-3/4 overflow-hidden rounded-md">
                            <img 
                                src="/images/profile.jpg"
                                alt="Nhan Nguyen"
                                className=""
                            /> 
                        </div>
                    </div>
                    <p className="text-xl mx-12 md:mx-0 leading-relaxed text-white/85">
                        I'm a Computer Science student at California State University, Long Beach, and also
                        pursuing a minor in Statistics. I have a deep passion for artificial intelligence and 
                        machine learning, with a focus on tackling real-world problems with data-driven solutions.
                        I'm always eager to build my skills and connect with likewise passionate individuals to grow 
                        as a developer and person.
                    </p>
                </div>
            </Divider>
            <Experience />
        </>
    );
}
