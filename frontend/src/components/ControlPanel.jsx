import React from 'react';
import './ControlPanel.css';

const ControlPanel = ({ isPlaying, volume, onPlay, onVolumeChange }) => {
  return (
    <div className="control-panel">
      <button className="control-btn play-btn" onClick={onPlay}>
        {isPlaying ? '⏸' : '▶'}
      </button>
      
      <div className="volume-control">
        <span className="volume-icon">🔊</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
          className="volume-slider"
        />
        <span className="volume-value">{Math.round(volume * 100)}%</span>
      </div>
    </div>
  );
};

export default ControlPanel;