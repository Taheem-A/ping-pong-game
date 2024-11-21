import React, { useState } from "react";
import { Analytics } from '@vercel/analytics/react';
import ScoreBoard from "./components/ScoreBoard";
import Paddle from "./components/Paddle";
import Ball from "./components/Ball";

export default function App() {
	const gameHeight = 480;
	const paddleHeight = 80;

	const [score, setScore] = useState({ player1: 0, player2: 0});
	const [leftPaddlePosition, setLeftPaddlePosition] = useState((gameHeight - paddleHeight) / 2);
	const [rightPaddlePosition, setRightPaddlePosition] = useState((gameHeight - paddleHeight) / 2);

	return (
		<>
			<div className="App">
				<div className="gameContainer">
					<ScoreBoard score={score} />
					<div className="gameArea">
						<Paddle side="left" position={leftPaddlePosition} setPosition={setLeftPaddlePosition} />
						<Paddle side="right" position={rightPaddlePosition} setPosition={setRightPaddlePosition} />
						<Ball leftPaddlePosition={leftPaddlePosition} rightPaddlePosition={rightPaddlePosition} setScore={setScore}/>
					</div>
				</div>
			</div>
			<Analytics />
		</>
	);
}
