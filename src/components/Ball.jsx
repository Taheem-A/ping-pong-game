import React, { useState, useEffect, useRef } from "react";
import '../styles/ball.css';

export default function Ball({ leftPaddlePosition, rightPaddlePosition, setScore }) {
    const gameWidth = 640;
    const gameHeight = 480;
    const ballSize = 10;
    const paddleWidth = 15;

    const [position, setPosition] = useState({ x: (gameWidth - ballSize) / 2, y: (gameHeight - ballSize) / 2 });
    const [velocity, setVelocity] = useState({ x: 2, y: 2 });
    const useAnimationRef = useRef(null);

    useEffect(() => {
        const moveBall = () => {
            setPosition((prev) => {
                let newX = prev.x + velocity.x;
                let newY = prev.y + velocity.y;

                let updatedVelocity = { ...velocity };

                if (newX <= 10 + paddleWidth && newY >= leftPaddlePosition && newY <= leftPaddlePosition + 80) {
                    const relativeY = (newY - leftPaddlePosition - 40) / 40;
                    updatedVelocity.x = Math.abs(velocity.x);
                    updatedVelocity.y = relativeY * 4; 
                }

                if (newX >= gameWidth - 10 - paddleWidth - ballSize && newY >= rightPaddlePosition && newY <= rightPaddlePosition + 80) {
                    const relativeY = (newY - rightPaddlePosition - 40) / 40;
                    updatedVelocity.x = -Math.abs(velocity.x);
                    updatedVelocity.y = relativeY * 4;
                }

                if (newX <= 0) {
                    setScore((prev) => ({ ...prev, player2: prev.player2 + 1 }));
                    return resetBall(1);
                } else if (newX >= gameWidth - ballSize) {
                    setScore((prev) => ({ ...prev, player1: prev.player1 + 1 }));
                    return resetBall(-1);
                }

                if (newY <= 0 || newY >= gameHeight - ballSize) {
                    updatedVelocity.y = -updatedVelocity.y;
                }

                setVelocity(updatedVelocity);

                return { x: newX, y: newY };
            });

            useAnimationRef.current = requestAnimationFrame(moveBall);
        };

        const resetBall = (xVelocity) => {
            setVelocity({ x: xVelocity * 2, y: 2 });
            return { x: (gameWidth - ballSize) / 2, y: (gameHeight - ballSize) / 2 };
        };

        useAnimationRef.current = requestAnimationFrame(moveBall);

        return () => cancelAnimationFrame(useAnimationRef.current);
    }, [velocity, leftPaddlePosition, rightPaddlePosition]);

    return <div className="ball" style={{ top: position.y, left: position.x }}></div>;
}
