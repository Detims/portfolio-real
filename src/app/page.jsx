'use client'
import { motion } from "framer-motion";

const Main = () => {
  return (
    <div className="relative flex flex-col overflow-hidden">
      {/* Content */}
      <div className="text-center">
        <h1>Hi, I'm Nhan Nguyen</h1>

        {/* Subheading */}
        <p>CS Student | Aspiring Software Engineer</p>

        <div className="flex flex-col md:flex-row items-center justify-center"> 
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