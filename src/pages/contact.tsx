import { Divider } from "../components/divider";
import { HiOutlineMail } from "react-icons/hi";
import { FaLinkedin } from "react-icons/fa";
import { IoDocumentOutline } from "react-icons/io5";


const links = [
    {
        label: "Email",
        link: "mailto:nnguyen102304@gmail.com",
        icon: HiOutlineMail,
    },
    {
        label: "LinkedIn",
        link: "https://www.linkedin.com/in/nhan-nguyen-281a11294/",
        icon: FaLinkedin,
    },
    {
        label: "Resume", 
        link: "", 
        icon: IoDocumentOutline 
    },
];

export function Contact() {
    return (
        <Divider label="Contact" id="contact">
            <div className="flex flex-col">
                <h2 className="text-lg text-white/70 md:mx-0">
                    I'm open to opportunities or just chatting. You can contact me through these methods:
                </h2>
                <ul className="relative mt-6 flex flex-col">
                    {links.map(({ label, link, icon: Icon }) => {
                        return (
                            <li key={label}>
                                <a className="my-2 py-2 flex items-center gap-2 text-lg text-white/70 hover:text-white duration-200" href={link}>
                                    <Icon
                                        aria-hidden="true"
                                        className="size-5"
                                    />
                                    {label}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </Divider>
    )
}
