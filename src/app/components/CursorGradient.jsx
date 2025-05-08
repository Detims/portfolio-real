'use client'
import { useState, useEffect, useRef } from 'react';

const CursorGradient = () => {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const circleRef = useRef(null);

    useEffect(() => {
        const moveCircle = (e) => {
            setCursorPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', moveCircle);

        return () => {
            window.removeEventListener('mousemove', moveCircle);
        };
    }, []);

    useEffect(() => {
        if (circleRef.current) {
            circleRef.current.style.left = `${cursorPosition.x}px`;
            circleRef.current.style.top = `${cursorPosition.y}px`;
        }
    }, [cursorPosition]);

    return (
        <div
            ref={circleRef}
            className="fixed rounded-full bg-gradient-to-br from-[#007EA7] to-[#00A7E1] pointer-events-none -translate-x-1/2 -translate-y-1/2 opacity-5"
            style={{
                left: cursorPosition.x,
                top: cursorPosition.y,
                filter: 'blur(100px)',
                width: '80rem', 
                height: '80rem',
            }}
        />
    );
};

export default CursorGradient;
