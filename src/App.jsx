import React, { useState } from "react";
import { Analytics } from '@vercel/analytics/react';
import ScoreBoard from "./components/ScoreBoard";
import Paddle from "./components/Paddle";
import Ball from "./components/Ball";

export default function App() {
    const gameWidth = 640;
    const gameHeight = 480;
    const ballSize = 10;
    const paddleHeight = 80;

    const [score, setScore] = useState({ player1: 0, player2: 0 });
    const [ballPosition, setBallPosition] = useState({ x: (gameWidth - ballSize) / 2, y: (gameHeight - ballSize) / 2 });
    const [ballVelocity, setBallVelocity] = useState({ x: 2, y: 2 });
    const [leftPaddlePosition, setLeftPaddlePosition] = useState((gameHeight - paddleHeight) / 2);
    const [rightPaddlePosition, setRightPaddlePosition] = useState((gameHeight - paddleHeight) / 2);

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
                        />
                        <Paddle
                            side="right"
                            position={rightPaddlePosition}
                            setPosition={setRightPaddlePosition}
                            ballPosition={ballPosition}
                        />
                        <Ball
                            leftPaddlePosition={leftPaddlePosition}
                            rightPaddlePosition={rightPaddlePosition}
                            setScore={setScore}
                            ballPosition={ballPosition}
                            setBallPosition={setBallPosition}
                            ballVelocity={ballVelocity}
                            setBallVelocity={setBallVelocity}
                        />
                    </div>
                </div>
            </div>
            <Analytics />
        </>
    );
}
