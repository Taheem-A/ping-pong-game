import React, { useState } from "react";
import { Analytics } from '@vercel/analytics/react';
import ScoreBoard from "./components/ScoreBoard";
import Paddle from "./components/Paddle";
import Ball from "./components/Ball";

export default function App() {
  const [score, setScore] = useState({ player1: 0, player2: 0});

  return (
    <>
      <div className="App">
        <div className="gameContainer">
          <ScoreBoard score={score} />
          <div className="gameArea">
            <Paddle side="left" />
            <Paddle side="right" />
            <Ball />
          </div>
        </div>
      </div>
      <Analytics />
    </>
  );
}
