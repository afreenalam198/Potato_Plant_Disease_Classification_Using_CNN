import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      handlePredict(file);
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      handlePredict(file);
    }
  };

  const handlePredict = async (file) => {

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/predict', { 
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      setPrediction(data);
    } catch (error) {
      console.error('Error:', error);
      setPrediction({ error: '' });
    }
  };

  const handleClear = () => {
    setSelectedImage(null);
    setPrediction(null);
  };
  
  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-container">
          <h1 className="navbar-logo">Potato Disease Classification</h1>
        </div>
      </nav>

      <div className="App-content">
        {selectedImage ? (
            <div className="prediction-card">
              <img src={URL.createObjectURL(selectedImage)} alt="Selected Image" />
              <div className="prediction-details">
                <h2>Prediction:</h2>
                <p><strong>Class:</strong> {prediction?.class ? prediction.class : 'N/A'}</p>
                <p><strong>Confidence:</strong> {prediction?.confidence ? `${prediction.confidence.toFixed(2)}%` : 'N/A'}</p>
                {prediction?.error && <p className="error">{prediction.error}</p>}
              </div>
              <button className="clear-button" onClick={handleClear}>CLEAR</button>
            </div>
          ) : (
            <div className="drop-zone" onDragOver={(e) => e.preventDefault()} onDrop={handleImageDrop}>
              <p>Drag and drop or select an image of a potato plant leaf for prediction</p>
              <button onClick={() => fileInputRef.current.click()}>Select Image</button>
              <input type="file" accept="image/*" onChange={handleImageSelect} ref={fileInputRef} style={{ display: 'none' }} />
            </div>
          )}
      </div>
    </div>
  );
}

export default App;