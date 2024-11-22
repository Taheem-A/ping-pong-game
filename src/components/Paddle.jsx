import React, { useState, useEffect, useRef } from "react";
import '../styles/paddle.css';

export default function Paddle({ side, position, setPosition }) {
    const gameHeight = 480;
    const paddleHeight = 80;

    const [direction, setDirection] = useState(0);
    const animationFrameRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (side === 'left') {
                if (event.key === 'w') setDirection(-1);
                if (event.key === 's') setDirection(1);
            } else if (side === 'right') {
                if (event.key === 'ArrowUp') setDirection(-1);
                if (event.key === 'ArrowDown') setDirection(1);
            };
        };

        const handleKeyUp = (event) => {
            if (event.key === 'ArrowUp' || event.key === 'ArrowDown'|| event.key === 'w' || event.key === 's') setDirection(0);
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [side]);

    useEffect(() => {
        const paddleSpeed = 3;

        const movePaddle = () => {
            setPosition((prev) => {
                let newPosition = prev + paddleSpeed * direction;

                if (newPosition < 0) newPosition = 0;
                if (newPosition > gameHeight - paddleHeight) newPosition = gameHeight - paddleHeight;

                return newPosition;
            });

            animationFrameRef.current = requestAnimationFrame(movePaddle);
        };

        if (direction !== 0 && !animationFrameRef.current) {
            animationFrameRef.current = requestAnimationFrame(movePaddle);
        };

        if (direction === 0 && animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
        };
        
        return () => cancelAnimationFrame(animationFrameRef.current);
    }, [direction]);

    return <div className={`paddle ${side}`} style={{ top: position }}></div>;
}