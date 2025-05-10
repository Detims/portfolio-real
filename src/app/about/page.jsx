'use client'
import { assets, aboutInfo } from "../../../assets/assets"
import Image from "next/image"
import { motion } from "framer-motion"

const About = () => {
    return(
        <div className="relative min-h-screen overflow-hidden flex justify-center items-center">
            <div className="container py-12 px-12 md:px-32 mt-16 relative flex flex-col lg:flex-row items-center justify-center gap-12">
                {/* Left Profile Picture */}
                <motion.div 
                    className="w-full lg:w-1/3 flex justify-center"
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <Image src={assets.Natsu} alt="me" className="w-64 h-64 rounded-full shadow-lg object-cover md:w-60 md:h-60 lg:w-full lg:h-full lg:rounded-lg"/>
                </motion.div>
                
                {/* Right Word Content */}
                <div className="w-full lg:w-2/3">
                    <motion.h2 
                        className="text-6xl font-bold mb-6 text-center lg:text-left text-[#00A7E1]"
                        initial={{ x: 30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        About Me
                    </motion.h2>
                    <motion.p 
                        className="leading-relaxed mb-6 text-lg"
                        initial={{ x: 30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        I am a passionate Computer Science student dedicated to making innovative and data-driven solutions.
                        I enjoy utilizing my creativity and knowledge to solve real-world problems.
                        I am currently studying Software Development and Machine Learning.
                    </motion.p>
                    <h1 className="mb-6 text-2xl font-bold">
                        Tech Stack
                    </h1>

                    <ul className="flex flex-wrap gap-4">
                       {aboutInfo.map((skill) => (
                            <li 
                                key={skill.name} 
                                className="flex items-center px-4 py-2 gap-2 rounded-full bg-gray-800"
                            >
                                {skill.icon}
                                <span className="text-sm">{skill.name}</span>
                            </li>
                       ))} 
                    </ul>
                </div>
            </div>
        </div>
    )
} 

export default About