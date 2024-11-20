import React, { useState, useEffect, useRef } from "react";
import '../styles/ball.css';

export default function Ball() {
    const gameWidth = 640;
    const gameHeight = 480;
    const ballSize = 10;

    const [position, setPosition] = useState({ x: (gameWidth - ballSize) / 2, y: (gameHeight - ballSize) / 2 });
    const [direction, setDirection] = useState({ x: 2, y: 2 });
    const useAnimationRef = useRef(null);

    useEffect(() => {
        const moveBall = () => {
            setPosition((prev) => {
                let newX = prev.x + direction.x;
                let newY = prev.y + direction.y;

                let updatedDirection = { ...direction }

                if (newX <= 0 || newX >= gameWidth - ballSize) {
                    updatedDirection.x = -direction.x;
                    newX = Math.max(0, Math.min(gameWidth - ballSize, newX));
                }
                if (newY <= 0 || newY >= gameHeight - ballSize) {
                    updatedDirection.y = -direction.y;
                    newY = Math.max(0, Math.min(gameHeight - ballSize, newY));
                }

                setDirection(updatedDirection);

                return { x: newX, y: newY };
            });

            useAnimationRef.current = requestAnimationFrame(moveBall);
        };

        useAnimationRef.current = requestAnimationFrame(moveBall);

        return () => cancelAnimationFrame(useAnimationRef.current);
    }, [direction]);

    return <div className="ball" style={{ top: position.y, left: position.x }}></div>;
}