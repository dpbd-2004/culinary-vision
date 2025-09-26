// src/components/ImageUploader.jsx

import React, { useState } from 'react';
import './ImageUploader.css';

function ImageUploader() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  
  // --- ADDED NEW STATE VARIABLES ---
  // To store the results from our API
  const [detections, setDetections] = useState([]); 
  // To show a "Loading..." message while we wait for the API
  const [isLoading, setIsLoading] = useState(false);
  // To display any errors that might happen
  const [error, setError] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      // Reset previous results when a new image is selected
      setDetections([]);
      setError(null);
    }
  };

  // --- UPDATED THE handleUpload FUNCTION ---
  const handleUpload = async () => {
    if (!selectedImage) {
      alert("Please select an image first!");
      return;
    }
    
    // Start loading and clear previous errors
    setIsLoading(true);
    setError(null);

    // FormData is the standard way to send files in an HTTP request
    const formData = new FormData();
    // The key 'file' MUST match the name of the argument in our FastAPI endpoint
    formData.append('file', selectedImage);

    try {
      // We use 'fetch' to make the request to our backend
      const response = await fetch('http://127.0.0.1:8000/detect/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        // If the server response is not 200 OK, throw an error
        throw new Error('Something went wrong on the server.');
      }

      // Parse the JSON response from the server
      const data = await response.json();
      setDetections(data); // Update our state with the detection results

    } catch (error) {
      console.error("Error during detection:", error);
      setError("Failed to analyze the image. Please try again.");
    } finally {
      // This block runs whether the request succeeded or failed
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="uploader-container">
      <input 
        type="file" 
        id="file-input" 
        accept="image/*" 
        onChange={handleImageChange} 
        style={{ display: 'none' }}
      />
      <label htmlFor="file-input" className="uploader-button">
        Choose Image
      </label>

      {previewUrl && (
        <div className="preview-container">
          <p>Image Preview:</p>
          <img src={previewUrl} alt="Selected preview" className="image-preview" />
        </div>
      )}

      {/* Disable the button while loading OR if no image is selected */}
      <button onClick={handleUpload} className="detect-button" disabled={!selectedImage || isLoading}>
        {isLoading ? 'Analyzing...' : 'Detect Objects'}
      </button>

      {/* --- ADDED NEW JSX FOR DISPLAYING RESULTS --- */}
      {error && <p className="error-message">{error}</p>}

      {/* Only show the results container if there are detections */}
      {detections.length > 0 && (
        <div className="results-container">
          <h3>Detection Results:</h3>
          <ul>
            {/* Map over the detections array and create a list item for each */}
            {detections.map((detection, index) => (
              <li key={index}>
                {detection.object}: {(detection.confidence * 100).toFixed(0)}% confidence
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;