import { FaCss3Alt, FaDocker, FaGitAlt, FaGithub, FaHtml5, FaNodeJs, FaPython, FaReact } from "react-icons/fa"
import Natsu from "./natsu.jpg"
import { SiCplusplus, SiFlask, SiJavascript, SiSupabase, SiTypescript, SiVite } from "react-icons/si"
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri"
import { BiLogoPostgresql } from "react-icons/bi"

export const assets = {
    Natsu,
}

export const aboutInfo = [
    { name: 'Python', icon: <FaPython className="text-blue-400" /> },
    { name: 'Javascript', icon: <SiJavascript className="text-yellow-300" /> },
    { name: 'Typescript', icon: <SiTypescript className="text-blue-400" />},
    { name: 'C++', icon: <SiCplusplus className="text-blue-500" /> },
    { name: 'HTML5', icon: <FaHtml5 className="text-orange-500" /> },
    { name: 'CSS3', icon: <FaCss3Alt className="text-blue-400" /> },
    { name: 'React', icon: <FaReact className="text-blue-400" /> },
    { name: 'Tailwind CSS', icon: <RiTailwindCssFill className="text-blue-300" /> },
    { name: 'Node.js', icon: <FaNodeJs className="text-green-400" /> },
    { name: 'Flask', icon: <SiFlask /> },
    { name: 'Next.js', icon: <RiNextjsFill /> },
    { name: 'Vite', icon: <SiVite className="text-fuchsia-300" /> },
    { name: 'PostgreSQL', icon: <BiLogoPostgresql className="text-blue-400" /> },
    { name: 'Supabase', icon: <SiSupabase className="text-green-500" /> },
    { name: 'Docker', icon: <FaDocker className="text-blue-600" /> },
    { name: 'Git', icon: <FaGitAlt className="text-orange-500" /> },
    { name: 'Github', icon: <FaGithub />},
]

export const experienceInfo = [
    {
        company: 'Walgreens',
        logo: '',
        position: 'Customer Service Associate',
        duration: 'July 2023 - present',
        description: [
            'Managed inventory levels and minimized loss, following company systems and guidelines.',
            'Created or maintained database of customer accounts.',
            'Assisted customers with inquiries, orders, and complaints in a timely manner.',
            'Communicated with team team members to ensure quick response times and store operation.',
        ],
    },
    {
        company: 'B.S. in Computer Science',
        logo: '',
        position: 'California State University, Long Beach',
        duration: 'August 2023 - present',
        description: [
            'Studying Software Development and Machine Learning',
            'Working toward a minor in Applied Statistics',
        ],
    }
]

export const projectInfo = [
    {
        title: 'Title',
        description: 'Description',
        tools: ['Python'],
        image: Natsu,
        demo: '',
        code: '',
    },
]
