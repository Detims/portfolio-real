'use client'
import { projectInfo } from "../../../assets/assets"
import { ProjectCard } from "../components/ProjectCard"

const Projects = () => {
    return(
        <div className="relative min-h-screen pt-12">
            <div className="relative container mx-auto py-12 px-8 mt-16">
                <h2 className="text-center text-6xl mb-8 font-bold text-[#00A7E1]">
                    Projects
                </h2>
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
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Projects