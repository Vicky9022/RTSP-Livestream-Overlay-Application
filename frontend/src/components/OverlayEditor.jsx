import React, { useState, useEffect } from 'react';
import { createOverlay, getAllOverlays, deleteOverlay } from '../services/api';
import './OverlayEditor.css';

const OverlayEditor = ({ onAddOverlay }) => {
  const [overlayType, setOverlayType] = useState('text');
  const [content, setContent] = useState('');
  const [savedOverlays, setSavedOverlays] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSavedOverlays();
  }, []);

  const loadSavedOverlays = async () => {
    try {
      setError(null);
      const data = await getAllOverlays();
      setSavedOverlays(data.overlays || []);
    } catch (error) {
      console.error('Failed to load overlays:', error);
      setError('Could not load saved overlays');
      setSavedOverlays([]);
    }
  };

  const handleCreateOverlay = async () => {
    if (!content.trim()) {
      alert('Please enter content for the overlay');
      return;
    }

    const overlayData = {
      content,
      type: overlayType,
      position: { x: 50, y: 50 },
      size: { width: 200, height: 100 }
    };

    try {
      setError(null);
      const response = await createOverlay(overlayData);
      onAddOverlay(response.overlay);
      setSavedOverlays([...savedOverlays, response.overlay]);
      setContent('');
    } catch (error) {
      console.error('Failed to create overlay:', error);
      setError('Failed to create overlay. Check backend connection.');
    }
  };

  const handleDeleteSaved = async (id) => {
    try {
      setError(null);
      await deleteOverlay(id);
      setSavedOverlays(savedOverlays.filter(o => o._id !== id));
    } catch (error) {
      console.error('Failed to delete overlay:', error);
      setError('Failed to delete overlay');
    }
  };

  const handleLoadOverlay = (overlay) => {
    onAddOverlay(overlay);
  };

  return (
    <div className="overlay-editor">
      <h3>Overlay Manager</h3>
      
      {error && (
        <div className="error-banner">
          <p>{error}</p>
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}
      
      <div className="overlay-creator">
        <select 
          value={overlayType} 
          onChange={(e) => setOverlayType(e.target.value)}
          className="overlay-type-select"
        >
          <option value="text">Text</option>
          <option value="logo">Logo/Image</option>
        </select>

        <input
          type="text"
          placeholder={overlayType === 'text' ? 'Enter text...' : 'Enter image URL...'}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleCreateOverlay()}
          className="overlay-content-input"
        />

        <button onClick={handleCreateOverlay} className="create-btn">
          Add Overlay
        </button>
      </div>

      <div className="saved-overlays">
        <h4>Saved Overlays ({savedOverlays.length})</h4>
        <div className="overlay-list">
          {savedOverlays.length === 0 ? (
            <p className="no-overlays">No saved overlays yet</p>
          ) : (
            savedOverlays.map(overlay => (
              <div key={overlay._id} className="saved-overlay-item">
                <span title={overlay.content}>
                  {overlay.type === 'text' ? '📝' : '🖼️'} {overlay.content.substring(0, 20)}
                  {overlay.content.length > 20 ? '...' : ''}
                </span>
                <div className="overlay-actions">
                  <button onClick={() => handleLoadOverlay(overlay)} className="load-btn">
                    Load
                  </button>
                  <button onClick={() => handleDeleteSaved(overlay._id)} className="delete-btn">
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OverlayEditor;