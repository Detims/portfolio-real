'use client'
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component"
import 'react-vertical-timeline-component/style.min.css';
import { assets } from "../../../assets/assets";
import Image from "next/image";



const Experience = () => {
    return(
        <div className="relative min-h-screen overflow-hidden text-black pt-12">
            <h1 className="relative container mx-auto py-12 px-6 mt-16 text-white text-center text-3xl">Experience</h1>
            <VerticalTimeline>
            {/* <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                date="2011 - present"
                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                // icon={}
            >
                <h3 className="vertical-timeline-element-title">Creative Director</h3>
                <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
                <p>
                Creative Direction, User Experience, Visual Design, Project Management, Team Leading
                </p>
            </VerticalTimelineElement> */}
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                date="2023 - present"
                iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                // icon={}
            >
                <h3 className="vertical-timeline-element-title">Walgreens</h3>
                <h4 className="vertical-timeline-element-subtitle">Customer Service Associate</h4>
                <ul className="list-disc list-inside space-y-2">
                    <li>Managed inventory levels and minimized loss, following company systems and guidelines</li>
                    <li>Created or maintained database of customer accounts</li>
                    <li>Assisted customers with inquiries, orders, and complaints with a 100% customer satisfaction rate</li>
                </ul>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element--education"
                date="2023 - present"
                iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                // icon={}
            >
                <h3 className="vertical-timeline-element-title">Bachelor of Science in Computer Science</h3>
                <h4 className="vertical-timeline-element-subtitle">California State University, Long Beach</h4>
                <ul className="list-disc list-inside space-y-2">
                    <li>Studying Software Development and Machine Learning</li>
                </ul>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                date="2022 - 2022"
                iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                // icon={}
            >
                <h3 className="vertical-timeline-element-title">Librarian Assistant</h3>
                <h4 className="vertical-timeline-element-subtitle">OC Public Libraries</h4>
                <ul className="list-disc list-inside space-y-2">
                    <li>Trained volunteers in various aspects of library operations including shelving techniques and cataloging processes</li>
                    <li>Created reports on usage statistics, circulation patterns, and budget expenditures</li>
                </ul>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
                // icon={}
            />
            </VerticalTimeline>
        </div>
    )
}

export default Experience