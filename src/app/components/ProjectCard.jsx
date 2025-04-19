'use client'
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa'
import Image from 'next/image'

export const ProjectCard = ({
    title,
    description,
    tools,
    image,
    demo,
    code,
}) => {
    return(
        <div className='rounded-lg overflow-hidden group flex flex-col h-full'>
            {/* Image */}
            <Image 
                src={image} 
                alt={title}
                width={400}
                height={200}
                priority
                className='w-full overflow-hidden' 
            />

            {/* Content */}
            <div className='p-6 flex flex-col flex-grow'>
                <h3>{title}</h3>
                <p>{description}</p>
                
                {/* Tools and Buttons */}
                <div className='mt-auto'>
                    {/* Tools */}
                    <div className='flex flex-wrap'>
                        {tools.map((tool, i) => (
                            <span
                                key={i}
                                className='rounded'
                            >
                                {tool}
                            </span>
                        ))}
                    </div>

                    {/* Buttons */}
                    <div className='flex gap-4'>
                        {demo && (
                            <a
                                href={demo}
                                target='_blank'
                                className='flex items-center'
                            >
                                <FaExternalLinkAlt /> Link
                            </a>
                        )}

                        {code && (
                            <a
                                href={code}
                                target='_blank'
                                className='flex items-center'
                            >
                                <FaGithub /> Github
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}