import React, { useState, useEffect, useRef } from "react";
import '../styles/paddle.css';

export default function Paddle({ side, position, setPosition, ballPosition, targetPosition, numberOfCollisions }) {
	const gameHeight = 480;
	const paddleHeight = 80;

	const [direction, setDirection] = useState(0);
	const animationFrameRef = useRef(null);

	useEffect(() => {
		if (side === "left") {
			const handleKeyDown = (event) => {
				if (event.key === 'w' || event.key === 'ArrowUp') setDirection(-1);
				if (event.key === 's' || event.key === 'ArrowDown') setDirection(1);
			};

			const handleKeyUp = (event) => {
				if (event.key === 'w' || event.key === 's' || event.key === 'ArrowUp' || event.key === 'ArrowDown') setDirection(0);
			};

			window.addEventListener("keydown", handleKeyDown);
			window.addEventListener("keyup", handleKeyUp);

			return () => {
				window.removeEventListener("keydown", handleKeyDown);
				window.removeEventListener("keyup", handleKeyUp);
			};
		}
	}, [side]);

	useEffect(() => {
		const paddleSpeed = 2;

		const movePaddle = () => {
			setPosition((prev) => {
				let newPosition = prev + paddleSpeed * direction;

				if (newPosition < 0) newPosition = 0;
				if (newPosition > gameHeight - paddleHeight) newPosition = gameHeight - paddleHeight;

				return newPosition;
			});

			animationFrameRef.current = requestAnimationFrame(movePaddle);
		};

		if (side === "left" && direction !== 0) animationFrameRef.current = requestAnimationFrame(movePaddle);

		if (side === "right") {
			const paddleCenter = position + paddleHeight / 2;
			const paddleCenterOffsetDifficulty = Math.floor(-100 / (numberOfCollisions + 20 / 3) + 15);
			const paddleCenterOffset = 25 + paddleCenterOffsetDifficulty;
		
			if (targetPosition < (paddleCenter - paddleCenterOffset)) setDirection(-1);
			else if (targetPosition > (paddleCenter + paddleCenterOffset)) setDirection(1);
			else setDirection(0);
		
			animationFrameRef.current = requestAnimationFrame(() => {
				setPosition((prev) => {
					let newPosition = prev + direction * paddleSpeed;
		
					if (newPosition < 0) newPosition = 0;
					if (newPosition > gameHeight - paddleHeight) newPosition = gameHeight - paddleHeight;
		
					return newPosition;
				});
			});
		}

		return () => cancelAnimationFrame(animationFrameRef.current);
	}, [direction, side, ballPosition, position, targetPosition]);

	return <div className={`paddle ${side}`} style={{ top: position }}></div>;
}
