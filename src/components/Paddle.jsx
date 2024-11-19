import React, { useState, useEffect, useRef } from "react";
import '../styles/paddle.css';

export default function Paddle({ side }) {
    const gameHeight = 480;
    const paddleHeight = 80;

    const [position, setPosition] = useState((gameHeight - paddleHeight) / 2);

    return <div className={`paddle paddle${side.toUpperCase()}`} style={{ top: position }}></div>;
}