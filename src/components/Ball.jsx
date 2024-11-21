import React, { useState, useEffect, useRef } from "react";
import '../styles/ball.css';

export default function Ball({ leftPaddlePosition, rightPaddlePosition, setScore }) {
    const gameWidth = 640;
    const gameHeight = 480;
    const ballSize = 10;
    const paddleWidth = 15;

    const [position, setPosition] = useState({ x: (gameWidth - ballSize) / 2, y: (gameHeight - ballSize) / 2 });
    const [direction, setDirection] = useState({ x: 1, y: 1 });
    const useAnimationRef = useRef(null);

    useEffect(() => {
        const moveBall = () => {
            setPosition((prev) => {
                let newX = prev.x + direction.x;
                let newY = prev.y + direction.y;

                let updatedDirection = { ...direction }

                if (newX <= 10 + paddleWidth && newY >= leftPaddlePosition && newY <= leftPaddlePosition + 80) {
                    updatedDirection.x = -direction.x;
                    newX = 10 + paddleWidth;
                    newY = Math.min(Math.max(newY, leftPaddlePosition), leftPaddlePosition + 80);
                }

                if (newX >= gameWidth - 10 - paddleWidth - ballSize && newY >= rightPaddlePosition && newY <= rightPaddlePosition + 80) {
                    updatedDirection.x = -direction.x;
                    newX = gameWidth - 10 - paddleWidth - ballSize;
                    newY = Math.min(Math.max(newY, rightPaddlePosition), rightPaddlePosition + 80);
                }

                if (newX <= 0) {
                    setScore((prev) => ({ ...prev, player2: prev.player2 + 1 }));
                    newX = (gameWidth - ballSize) / 2;
                    newY = (gameHeight - ballSize) / 2;
                    updatedDirection.x = -updatedDirection.x;
                } else if (newX >= gameWidth - ballSize) {
                    setScore((prev) => ({ ...prev, player1: prev.player1 + 1 }));
                    newX = (gameWidth - ballSize) / 2;
                    newY = (gameHeight - ballSize) / 2;
                    updatedDirection.x = -updatedDirection.x;
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
    }, [direction, leftPaddlePosition, rightPaddlePosition]);

    return <div className="ball" style={{ top: position.y, left: position.x }}></div>;
}
