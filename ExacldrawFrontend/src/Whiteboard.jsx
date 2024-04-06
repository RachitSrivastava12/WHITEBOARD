// Whiteboard.jsx
import React, { useEffect, useRef } from 'react';

const Whiteboard = ({ selectedTool, penColor }) => {
    const canvasRef = useRef(null);
    const isDrawing = useRef(false);
    const lastX = useRef(0);
    const lastY = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const handleMouseDown = (e) => {
            isDrawing.current = true;
            lastX.current = e.clientX - canvas.offsetLeft;
            lastY.current = e.clientY - canvas.offsetTop;
        };

        const handleMouseMove = (e) => {
            if (!isDrawing.current) return;

            const x = e.clientX - canvas.offsetLeft;
            const y = e.clientY - canvas.offsetTop;

            ctx.strokeStyle = selectedTool === 'pen' ? penColor : 'black';
            ctx.lineWidth = selectedTool === 'eraser' ? 10 : 5;
            ctx.lineCap = 'round';

            ctx.beginPath();
            ctx.moveTo(lastX.current, lastY.current);
            ctx.lineTo(x, y);
            ctx.stroke();

            lastX.current = x;
            lastY.current = y;
        };

        const handleMouseUp = () => {
            isDrawing.current = false;
        };

        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseup', handleMouseUp);

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseup', handleMouseUp);
        };
    }, [selectedTool, penColor]);

    return (
        <canvas
            ref={canvasRef}
            width={window.innerWidth}
            height={window.innerHeight - 40} // Adjust to leave space for the toolbar
            style={{ background: 'black' }}
        ></canvas>
    );
};

export default Whiteboard;
