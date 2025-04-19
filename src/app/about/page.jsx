'use client'
import { assets } from "../../../assets/assets"
import Image from "next/image"

const About = () => {
    return(
        <div className="relative min-h-screen overflow-hidden">
            <div className="container py-12 px-6 mt-16 relative flex flex-col lg:flex-row items-center gap-12">
                {/* Left Profile Picture */}
                <div className="w-full lg:w-1/3 flex justify-center">
                    <Image src={assets.Natsu} alt="me" className="w-64 h-64 rounded-full shadow-lg object-cover md:w-60 md:h-60 lg:w-full lg:h-full lg:rounded-lg"/>
                </div>
                
                {/* Right Word Content */}
                <div className="w-full lg:w-2/3">
                    <h2 className="text-5xl font-bold mb-6 text-center lg:text-left">
                        About Me
                    </h2>
                    <p className="leading-relaxed mb-6 text-lg">
                        These are words on a screen
                    </p>
                    <p className="mb-6 text-lg">
                        This is a second row of text
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