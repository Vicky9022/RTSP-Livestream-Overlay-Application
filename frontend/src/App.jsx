import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import './App.css';

function App() {
  const [rtspUrl, setRtspUrl] = useState('');

  const handleStartStream = (url) => {
    setRtspUrl(url);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>RTSP Livestream Platform</h1>
      </header>
      <main className="app-main">
        <LandingPage onStartStream={handleStartStream} />
      </main>
    </div>
  );
}

export default App;