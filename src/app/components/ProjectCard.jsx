'use client'
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa'
import Image from 'next/image'
import { motion } from 'framer-motion'

export const ProjectCard = ({
    title,
    description,
    tools,
    image,
    demo,
    code,
    time,
}) => {
    return(
        <motion.div 
            className='rounded-lg overflow-hidden group flex flex-col h-full bg-gray-800'
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: time * 0.2 }}
        >
            {/* Image */}
            <div className='relative w-full aspect-[2/1] overflow-hidden'>
                <Image 
                    src={image} 
                    alt={title}
                    fill
                    priority
                    className='object-cover rounded-t-lg transform group-hover:scale-110 transition-transform duration-300' 
                />
            </div>

            {/* Content */}
            <div className='p-6 pb-4 flex flex-col flex-grow'>
                <h2 className='text-2xl font-bold mb-4'>{title}</h2>
                <p className='mb-4 flex-grow text-gray-300'>{description}</p>
                
                {/* Tools and Buttons */}
                <div className='mt-auto'>
                    {/* Tools */}
                    <div className='flex flex-wrap gap-2 mb-4'>
                        {tools.map((tool, i) => (
                            <span
                                key={i}
                                className='text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded'
                            >
                                {tool}
                            </span>
                        ))}
                    </div>

                    {/* Buttons */}
                    <div className={`flex justify-between gap-4 ${!demo && 'justify-end'} text-gray-300`}>
                        {demo && (
                            <a
                                href={demo}
                                target='_blank'
                                className='flex items-center gap-1 hover:text-[#00A7E1]'
                            >
                                <FaExternalLinkAlt /> Link
                            </a>
                        )}

                        {code && (
                            <a
                                href={code}
                                target='_blank'
                                className='flex items-center gap-1 hover:text-[#00A7E1]'
                            >
                                <FaGithub /> Github
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}