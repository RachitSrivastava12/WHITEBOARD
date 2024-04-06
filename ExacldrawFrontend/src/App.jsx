// App.jsx
import React, { useState } from 'react';
import Whiteboard from './Whiteboard';
import DrawingTools from './DrawingTools';
import './App.css'; // Import styles.css

const App = () => {
    const [selectedTool, setSelectedTool] = useState(null);
    const [penColor, setPenColor] = useState('white');

    return (
        <div className="app">
            <div className="toolbar">
                <DrawingTools
                    selectedTool={selectedTool}
                    onSelectTool={setSelectedTool}
                    onColorChange={setPenColor}
                />
            </div>
            <div className="whiteboard-container">
                <Whiteboard selectedTool={selectedTool} penColor={penColor} />
            </div>
        </div>
    );
};

export default App;
