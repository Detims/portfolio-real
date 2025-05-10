'use client'
import { assets } from "../../../assets/assets"
import Image from "next/image"
import { motion } from "framer-motion"

const About = () => {
    return(
        <div className="relative min-h-screen overflow-hidden">
            <div className="container py-12 px-12 md:px-32 mt-16 relative flex flex-col lg:flex-row items-center gap-12">
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
                    <h2 className="text-6xl font-bold mb-6 text-center lg:text-left text-[#00A7E1]">
                        About Me
                    </h2>
                    <p className="leading-relaxed mb-6 text-lg">
                        I am a passionate Computer Science student dedicated to making innovative and data-driven solutions.
                        I enjoy utilizing my creativity and knowledge to solve real-world problems.
                        I am currently studying Software Development and Machine Learning.
                    </p>
                    <p className="mb-6 text-sm">
                        Hobbies:
                    </p>

                    {/* Put a list here */}
                </div>
            </div>
        </div>
    )
} 

export default About