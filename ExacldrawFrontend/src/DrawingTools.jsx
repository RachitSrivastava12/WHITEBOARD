// DrawingTools.jsx
import React from 'react';
import './DrawingTools.css'; // Import DrawingTools.css

const DrawingTools = ({ selectedTool, onSelectTool, onColorChange }) => {
    const handlePenColorChange = (color) => {
        onColorChange(color);
        onSelectTool('pen');
    };

    return (
        <div className="drawing-tools">
            <button className={`tool ${selectedTool === 'pen' && 'active'}`} onClick={() => onSelectTool('pen')}>
                Pen
            </button>
            <button className={`tool ${selectedTool === 'eraser' && 'active'}`} onClick={() => onSelectTool('eraser')}>
                Eraser
            </button>
            <div className="color-picker">
                <input type="color" onChange={(e) => handlePenColorChange(e.target.value)} />
            </div>
        </div>
    );
};

export default DrawingTools;
