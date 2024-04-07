// App.jsx
import React, { useState, useEffect } from 'react';
import DrawingTools from './DrawingTools';
import Whiteboard from './Whiteboard';
import './App.css'; // Import styles.css

const App = () => {
  const [selectedTool, setSelectedTool] = useState(null);
  const [penColor, setPenColor] = useState('white');
  const [ws, setWs] = useState(null);

  useEffect(() => {
    // Establish WebSocket connection when component mounts
    const newWs = new WebSocket('ws://localhost:3001');
   newWs.onopen = () => {    
    console.log('Websocket connection established')
    setWs(newWs);};
    newWs.onerror = (error) => {
        console.error ('WebSocket error:', error);
    };
    return () => {
      // Close WebSocket connection when component unmounts
      newWs.close();
    };
  }, []);

  const sendMessage = (message) => {
    // Send message over WebSocket connection
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    }
  };

  const handlePenColorChange = (color) => {
    // Change pen color and send message
    setPenColor(color);
    sendMessage({ type: 'color', color });
  };

  const handleToolSelect = (tool) => {
    // Set selected tool and send message
    setSelectedTool(tool);
    sendMessage({ type: tool }); // Include the type of tool in the message
  };

  return (
    <div className="app">
      <div className="toolbar">
        <DrawingTools
          selectedTool={selectedTool} // Pass selectedTool to DrawingTools
          onSelectTool={handleToolSelect}
          onColorChange={handlePenColorChange}
        />
      </div>
      <div className="whiteboard-container">
        <Whiteboard selectedTool={selectedTool} penColor={penColor} />
      </div>
    </div>
  );
};

export default App;
