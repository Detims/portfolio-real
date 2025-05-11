import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import CursorGradient from "./components/CursorGradient";
import { Montserrat } from 'next/font/google';

export const metadata = {
  title: "Nhan Nguyen - Portfolio",
  description: "My Portfolio Website",
};

const montserrat = Montserrat({
  weight: ['400', '600'],
  subsets: ['latin'],
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className}`}>
        <CursorGradient />
        <Navbar />
        <main className="relative overflow-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
