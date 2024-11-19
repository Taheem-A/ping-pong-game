import React, { useState } from "react";
import '../styles/scoreBoard.css';

export default function ScoreBoard({ score }) {
    return (
        <div className="scoreBoard">
            <p>Player 1: {score.player1}</p>
            <p>Player 2: {score.player2}</p>
        </div>
    );
}