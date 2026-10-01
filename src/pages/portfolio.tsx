import Footer from "../components/footer";
import { About } from "./about";
import { Home } from "./home";
import { Projects } from "./projects";

export function Portfolio() {
    return (
        <div className="mx-auto md:max-w-[90%]">
            <Home />
            <About />
            <Projects />
            <Footer />
        </div>
    );
}
