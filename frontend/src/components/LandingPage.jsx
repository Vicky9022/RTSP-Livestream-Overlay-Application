import React, { useState } from 'react';
import VideoPlayer from './VideoPlayer';
import './LandingPage.css';

const LandingPage = ({ onStartStream }) => {
  const [rtspUrl, setRtspUrl] = useState('');
  const [showPlayer, setShowPlayer] = useState(false);

  const handleStartStream = () => {
    if (rtspUrl.trim()) {
      onStartStream(rtspUrl);
      setShowPlayer(true);
    }
  };

  return (
    <div className="landing-page">
      {!showPlayer ? (
        <div className="landing-content">
          <div className="hero-section">
            <h1>RTSP Livestream Platform</h1>
            <p>Stream and customize your live video with custom overlays</p>
          </div>
          
          <div className="stream-setup">
            <h2>Enter RTSP URL to Start</h2>
            <div className="url-input-group">
              <input
                type="text"
                placeholder="rtsp://example.com/stream"
                value={rtspUrl}
                onChange={(e) => setRtspUrl(e.target.value)}
                className="rtsp-input"
              />
              <button onClick={handleStartStream} className="start-btn">
                Start Livestream
              </button>
            </div>
            <div className="example-urls">
              <p>Example RTSP URLs (use RTSP.me or similar services):</p>
              <code>rtsp://rtsp.me/test</code>
            </div>
          </div>
        </div>
      ) : (
        <VideoPlayer rtspUrl={rtspUrl} />
      )}
    </div>
  );
};

export default LandingPage;