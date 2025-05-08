'use client'
import Image from "next/image";
// import { assets } from "../../assets/assets";
import { motion } from "framer-motion";

const Main = () => {
  return (
    <div className="relative min-h-screen flex flex-col mx-auto text-center items-center justify-center overflow-hidden">
      {/* Content */}
      <div className="text-center">
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Image src={assets.Natsu} alt="user" className="w-32 rounded-full mx-auto mb-4"/>
        </motion.div> */}
        <motion.h1 
          className="mb-6 text-7xl"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Hi, I'm <strong className="text-[#00A7E1]">Nhan Nguyen</strong>
        </motion.h1>

        {/* Subheading */}
        <motion.p 
          className="mb-6 text-3xl text-gray-500"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          CS Student | Aspiring Software Engineer
        </motion.p>

        <motion.div 
          className="flex flex-col md:flex-row items-center justify-center gap-3 text-xl font-bold"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        > 
          <a 
            href="/projects" 
            className="px-6 py-2 bg-[#007EA7] rounded-lg text-white transition hover:scale-110 duration:200 shadow-md"
          >
            My Projects
          </a>
          <a 
            href="" 
            className="px-6 py-2 bg-violet-500 rounded-lg text-white transition hover:scale-110 duration:200 shadow-md"
          >
            View Resume
          </a>
        </motion.div>
      </div>
    </div>
  );
}

export default Main