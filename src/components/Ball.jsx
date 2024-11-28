import React, { useEffect, useRef } from 'react';
import '../styles/ball.css';

export default function Ball({
	leftPaddlePosition,
	rightPaddlePosition,
	setScore,
	ballPosition,
	setBallPosition,
	ballVelocity,
	setBallVelocity,
	setPlayerHitBall,
	setNumberOfCollisions,
}) {
	const gameWidth = 640;
	const gameHeight = 480;
	const ballSize = 10;
	const paddleWidth = 15;
	const paddleHeight = 80;

	const useAnimationRef = useRef(null);

	useEffect(() => {
		const moveBall = () => {
			setBallPosition((prev) => {
				let newX = prev.x + ballVelocity.x;
				let newY = prev.y + ballVelocity.y;

				let updatedVelocity = { ...ballVelocity };

				if (
					newX <= 10 + paddleWidth &&
					newY >= leftPaddlePosition &&
					newY <= leftPaddlePosition + paddleHeight
				) {
					const relativeY =
						(newY - leftPaddlePosition - paddleHeight / 2) /
						(paddleHeight / 2);
					setPlayerHitBall(1);
					setNumberOfCollisions((prev) => prev + 1);
					updatedVelocity.x = Math.abs(ballVelocity.x) + 0.1;
					updatedVelocity.y = relativeY * 4 + 0.1;
				}

				if (
					newX >= gameWidth - 10 - paddleWidth - ballSize &&
					newY >= rightPaddlePosition &&
					newY <= rightPaddlePosition + paddleHeight
				) {
					const relativeY =
						(newY - rightPaddlePosition - paddleHeight / 2) /
						(paddleHeight / 2);
					setPlayerHitBall(0);
					setNumberOfCollisions((prev) => prev + 1);
					updatedVelocity.x = -Math.abs(ballVelocity.x) - 0.1;
					updatedVelocity.y = relativeY * 4 + 0.1;
				}

				if (newX <= 0) {
					setScore((prev) => ({
						...prev,
						player2: prev.player2 + 1,
					}));
					return resetBall(1);
				} else if (newX >= gameWidth - ballSize) {
					setScore((prev) => ({
						...prev,
						player1: prev.player1 + 1,
					}));
					return resetBall(-1);
				}

				if (newY <= 0 || newY >= gameHeight - ballSize) {
					updatedVelocity.y = -updatedVelocity.y;
				}

				setBallVelocity(updatedVelocity);

				return { x: newX, y: newY };
			});

			useAnimationRef.current = requestAnimationFrame(moveBall);
		};

		const resetBall = (xVelocity) => {
			if (xVelocity === 1) setPlayerHitBall(2);
			setBallVelocity({ x: xVelocity * 2, y: 2 });
			return {
				x: (gameWidth - ballSize) / 2,
				y: (gameHeight - ballSize) / 2,
			};
		};

		useAnimationRef.current = requestAnimationFrame(moveBall);

		return () => cancelAnimationFrame(useAnimationRef.current);
	}, [ballVelocity, leftPaddlePosition, rightPaddlePosition]);

	return (
		<div
			className="ball"
			style={{ top: ballPosition.y, left: ballPosition.x }}
		></div>
	);
}
