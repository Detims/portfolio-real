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
        <div className='rounded-lg overflow-hidden group flex flex-col h-full bg-gray-800'>
            {/* Image */}
            <div className='relative w-full aspect-[2/1] overflow-hidden'>
                <Image 
                    src={image} 
                    alt={title}
                    fill
                    priority
                    className='object-cover rounded-t-lg' 
                />
            </div>

            {/* Content */}
            <div className='p-6 flex flex-col flex-grow'>
                <h2 className='text-2xl font-bold mb-2'>{title}</h2>
                <p className='mb-4 flex-grow'>{description}</p>
                
                {/* Tools and Buttons */}
                <div className='mt-auto'>
                    {/* Tools */}
                    <div className='flex flex-wrap gap-2 mb-4'>
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