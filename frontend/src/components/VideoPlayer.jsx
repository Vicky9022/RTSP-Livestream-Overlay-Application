import React, { useState, useEffect, useRef } from 'react';
import ControlPanel from './ControlPanel';
import OverlayEditor from './OverlayEditor';
import OverlayItem from './OverlayItem';
import { startStream, stopStream } from '../services/api';
import './VideoPlayer.css';

const VideoPlayer = ({ rtspUrl }) => {
  const [overlays, setOverlays] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [streamUrl, setStreamUrl] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    initializeStream();
    return () => {
      stopStream().catch(err => console.error('Error stopping stream:', err));
    };
  }, [rtspUrl]);

  const initializeStream = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Starting stream with URL:', rtspUrl);
      const response = await startStream(rtspUrl);
      console.log('Stream started:', response);
      
      // Set the stream URL - adjust based on your backend response
      const fullStreamUrl = `http://localhost:5000${response.stream_url}`;
      setStreamUrl(fullStreamUrl);
      setLoading(false);
    } catch (error) {
      console.error('Failed to start stream:', error);
      setError(error.response?.data?.error || error.message || 'Failed to start stream');
      setLoading(false);
    }
  };

  const handlePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(err => {
          console.error('Error playing video:', err);
          setError('Failed to play video. The stream may not be ready yet.');
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const handleAddOverlay = (overlay) => {
    setOverlays([...overlays, overlay]);
  };

  const handleUpdateOverlay = (id, updates) => {
    setOverlays(overlays.map(o => o._id === id ? { ...o, ...updates } : o));
  };

  const handleDeleteOverlay = (id) => {
    setOverlays(overlays.filter(o => o._id !== id));
  };

  return (
    <div className="video-player-container">
      <div className="video-wrapper">
        {loading && (
          <div className="loading-message">
            <p>Loading stream...</p>
            <p>This may take 5-10 seconds</p>
          </div>
        )}
        
        {error && (
          <div className="error-message">
            <h3>Error Loading Stream</h3>
            <p>{error}</p>
            <button onClick={initializeStream}>Retry</button>
          </div>
        )}
        
        {!loading && !error && (
          <>
            <video
              ref={videoRef}
              className="video-element"
              src={streamUrl}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onError={(e) => {
                console.error('Video error:', e);
                setError('Video playback error. The stream may not be available.');
              }}
            />
            
            <div className="overlays-container">
              {overlays.map(overlay => (
                <OverlayItem
                  key={overlay._id}
                  overlay={overlay}
                  onUpdate={handleUpdateOverlay}
                  onDelete={handleDeleteOverlay}
                />
              ))}
            </div>

            <ControlPanel
              isPlaying={isPlaying}
              volume={volume}
              onPlay={handlePlay}
              onVolumeChange={handleVolumeChange}
            />
          </>
        )}
      </div>

      <OverlayEditor onAddOverlay={handleAddOverlay} />
    </div>
  );
};

export default VideoPlayer;