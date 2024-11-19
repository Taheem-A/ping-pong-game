import React, { useState, useEffect } from "react";
import '../styles/ball.css';

export default function Ball() {
    const [position, setPosition] = useState({ x: 320, y: 240 });

    return <div className="ball" style={{ top: position.y, left: position.x }}></div>;
}