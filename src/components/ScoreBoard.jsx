import React, { useState, useEffect } from "react";
import '../styles/scoreBoard.css';

export default function ScoreBoard({ score }) {
    const [animationClass, setAnimationClass] = useState({ player1: "", player2: "" });

    useEffect(() => {
        setAnimationClass((prev) => ({ ...prev, player1: "score-up" }));
        
        const timer = setTimeout(() => {
            setAnimationClass((prev) => ({ ...prev, player1: "" }));
        }, 1000);

        return () => clearTimeout(timer);
    }, [score.player1]);

    useEffect(() => {
        setAnimationClass((prev) => ({ ...prev, player2: "score-up" }));
        
        const timer = setTimeout(() => {
            setAnimationClass((prev) => ({ ...prev, player2: "" }));
        }, 1000);

        return () => clearTimeout(timer);
    }, [score.player2])

    return (
        <div className="scoreBoard">
            <p className={animationClass.player1}>Player: {score.player1}</p>
            <p className={animationClass.player2}>Computer: {score.player2}</p>
        </div>
    );
}