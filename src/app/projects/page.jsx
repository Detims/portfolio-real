'use client'
import { projectInfo } from "../../../assets/assets"
import { ProjectCard } from "../components/ProjectCard"
import { motion } from "framer-motion"

const Projects = () => {
    return(
        <div className="relative min-h-screen pt-12">
            <div className="relative container mx-auto py-12 px-8 mt-16">
                <motion.h2 
                    className="text-center text-6xl mb-8 font-bold text-[#00A7E1]"
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    Projects
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projectInfo.map((project, index) => (
                        <ProjectCard 
                            key={index}
                            title={project.title}
                            description={project.description}
                            tools={project.tools}
                            image={project.image}
                            demo={project.demo}
                            code={project.code}
                            time={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Projects