import React, { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import ScoreBoard from './components/ScoreBoard';
import Paddle from './components/Paddle';
import Ball from './components/Ball';

export default function App() {
	const gameWidth = 640;
	const gameHeight = 480;
	const ballSize = 10;
	const paddleHeight = 80;

	const [score, setScore] = useState({ player1: 0, player2: 0 });
	const [ballPosition, setBallPosition] = useState({
		x: (gameWidth - ballSize) / 2,
		y: (gameHeight - ballSize) / 2,
	});
	const [trail, setTrail] = useState([]);
	const [ballVelocity, setBallVelocity] = useState({ x: 2, y: 2 });
	const [playerHitBall, setPlayerHitBall] = useState(0);
	const [numberOfCollisions, setNumberOfCollisions] = useState(0);
	const [targetPosition, setTargetPosition] = useState(417);
	const [leftPaddlePosition, setLeftPaddlePosition] = useState(
		(gameHeight - paddleHeight) / 2
	);
	const [rightPaddlePosition, setRightPaddlePosition] = useState(
		(gameHeight - paddleHeight) / 2
	);

	useEffect(() => {
		if (playerHitBall === 1) {
			const newTargetPosition = calculateNewPosition(
				ballPosition,
				ballVelocity
			);
			setTargetPosition(newTargetPosition);
			console.log(`TARGET POSITION VAR: ${targetPosition}`);
		} else if (playerHitBall === 2) setTargetPosition(417);
	}, [playerHitBall]);

	const calculateNewPosition = (pos, ballVelocity) => {
		let newX = pos.x;
		let newY = pos.y;
		let xVel = ballVelocity.x;
		let yVel = ballVelocity.y;

		while (newX < 605) {
			if (newY < 0 || newY > gameHeight - 10) yVel = -yVel;
			newX += xVel;
			newY += yVel;
		}

		return newY;
	};

	return (
		<>
			<div className="App">
				<div className="gameContainer">
					<ScoreBoard score={score} />
					<div className="gameArea">
						<Paddle
							side="left"
							position={leftPaddlePosition}
							setPosition={setLeftPaddlePosition}
							ballPosition={ballPosition}
							ballVelocity={ballVelocity}
							targetPosition={targetPosition}
							numberOfCollisions={numberOfCollisions}
						/>
						<Paddle
							side="right"
							position={rightPaddlePosition}
							setPosition={setRightPaddlePosition}
							ballPosition={ballPosition}
							ballVelocity={ballVelocity}
							targetPosition={targetPosition}
							numberOfCollisions={numberOfCollisions}
						/>
						<Ball
							leftPaddlePosition={leftPaddlePosition}
							rightPaddlePosition={rightPaddlePosition}
							setScore={setScore}
							ballPosition={ballPosition}
							setBallPosition={setBallPosition}
							trail={trail}
							setTrail={setTrail}
							ballVelocity={ballVelocity}
							setBallVelocity={setBallVelocity}
							setPlayerHitBall={setPlayerHitBall}
							setNumberOfCollisions={setNumberOfCollisions}
						/>
					</div>
				</div>
			</div>
			<Analytics />
		</>
	);
}
