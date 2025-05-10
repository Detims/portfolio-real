'use client'
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component"
import 'react-vertical-timeline-component/style.min.css';
import { experienceInfo } from "../../../assets/assets";

const Experience = () => {
    return(
        <div className="relative min-h-screen overflow-hidden text-white pt-12">
            <h1 className="relative container mx-auto py-12 px-6 mt-16 text-center text-6xl font-bold text-[#00A7E1]">Experience</h1>
            <VerticalTimeline>

                {/* Map experience from assets file to the timeline */}

                {experienceInfo.map((item, index) => (
                    <VerticalTimelineElement
                        key={index}
                        contentStyle={{
                            background: '#1e2939',
                            color: '#fff',
                            borderRadius: '10px',
                        }}
                        contentArrowStyle={{borderRight: '7px solid #1e2939'}}
                        date={<span className="text-lg font-bold">{item.duration}</span>}
                        iconStyle={{ background: '#00A7E1' }}
                        icon={item.logo}
                    >
                        <h3 className="font-bold text-2xl">{item.company}</h3>
                        <h4 className="text-gray-300 italic mb-4">{item.position}</h4>
                        <ul className="list-disc list-inside space-y-2">
                            {item.description.map((desc, idx) => (
                                <li key={idx}>{desc}</li>
                            ))}
                        </ul>
                    </VerticalTimelineElement>
                ))}
            </VerticalTimeline>
        </div>
    )
}

export default Experience