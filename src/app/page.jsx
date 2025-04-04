'use client'
import { motion } from "framer-motion";

const Main = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Content */}
      <div className="text-center">
        <h1 className="mb-6 text-5xl">Hi, I'm Nhan Nguyen</h1>

        {/* Subheading */}
        <p className="mb-2">CS Student | Aspiring Software Engineer</p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-2"> 
          <a href="/projects" className="px-6 py-2 bg-gray-300 rounded-lg text-black">
            Projects
          </a>
          <a href="" className="px-6 py-2 bg-gray-700 rounded-lg text-white">
            Resume
          </a>
        </div>
        
      </div>
    </div>
  );
}

export default Main