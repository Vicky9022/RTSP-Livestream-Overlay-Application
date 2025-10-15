# User Guide - RTSP Livestream Overlay Application

## Table of Contents
1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Using the Application](#using-the-application)
4. [Managing Overlays](#managing-overlays)
5. [Video Controls](#video-controls)
6. [Tips and Best Practices](#tips-and-best-practices)
7. [Troubleshooting](#troubleshooting)

---

## Introduction

The RTSP Livestream Overlay Application allows you to:
- Stream video from any RTSP source
- Add custom text and image overlays to your livestream
- Control playback with play, pause, and volume controls
- Save and reuse overlay configurations

---

## Getting Started

### Prerequisites
Before using the application, ensure you have:
- A valid RTSP stream URL (you can use services like RTSP.me to create temporary streams)
- Modern web browser (Chrome, Firefox, Safari, or Edge)
- Active internet connection

### Accessing the Application
1. Open your web browser
2. Navigate to `http://localhost:3000` (or your configured URL)
3. You'll see the landing page with the RTSP URL input

---

## Using the Application

### Starting a Livestream

1. **Enter RTSP URL**
   - On the landing page, you'll see an input field labeled "Enter RTSP URL to Start"
   - Type or paste your RTSP stream URL
   - Example format: `rtsp://example.com/stream`

2. **Creating a Test Stream**
   - Use RTSP.me or similar services to create a temporary RTSP stream
   - Upload a video file to get an RTSP URL
   - Copy the provided RTSP URL

3. **Start Streaming**
   - Click the "Start Livestream" button
   - Wait a few seconds for the stream to initialize
   - The video player will appear with your livestream

### Video Player Interface

Once streaming starts, you'll see:
- **Main Video Area**: Center area showing your livestream
- **Control Panel**: Bottom overlay with playback controls
- **Overlay Editor**: Right sidebar for managing overlays

---

## Managing Overlays

### Creating a New Overlay

1. **Choose Overlay Type**
   - In the Overlay Editor sidebar, select the overlay type:
     - **Text**: For adding text overlays
     - **Logo/Image**: For adding image overlays

2. **Enter Content**
   - For Text: Type the text you want to display
   - For Logo: Enter the URL of your image

3. **Add Overlay**
   - Click the "Add Overlay" button
   - The overlay will appear on the video

### Positioning Overlays

1. **Drag to Move**
   - Click and hold anywhere on the overlay
   - Drag it to your desired position
   - Release to place

2. **Resize Overlays**
   - Look for the small circle handle at the bottom-right corner of the overlay
   - Click and hold the resize handle
   - Drag to increase or decrease the size
   - Release when satisfied with the size

### Editing Overlays

1. **Modify Position and Size**
   - Use drag and resize features described above
   - Changes are updated in real-time

2. **Delete an Overlay**
   - Click the "×" button at the top-right corner of any overlay
   - The overlay will be removed immediately

### Saving and Loading Overlays

1. **Automatic Saving**
   - When you create an overlay, it's automatically saved to the database
   - Saved overlays appear in the "Saved Overlays" section

2. **Loading Saved Overlays**
   - Scroll to the "Saved Overlays" section in the Overlay Editor
   - Click the "Load" button next to any saved overlay
   - The overlay will appear on the video

3. **Deleting Saved Overlays**
   - Click the "Delete" button next to a saved overlay
   - This permanently removes it from the database

---

## Video Controls

### Play/Pause
- Click the play button (▶) to start playback
- Click the pause button (⏸) to pause
- Located in the control panel at the bottom of the video

### Volume Control
1. **Adjust Volume**
   - Use the volume slider in the control panel
   - Drag left to decrease, right to increase
   - Volume percentage is displayed next to the slider

2. **Mute/Unmute**
   - Drag the volume slider all the way to the left to mute
   - The volume icon shows the current audio status

---

## Tips and Best Practices

### RTSP Stream Tips
- **Use Reliable Sources**: Ensure your RTSP stream is stable and has good bandwidth
- **Test URLs**: Test your RTSP URL with VLC or another player before using in the app
- **Network**: Use a wired connection for best streaming performance
- **Formats**: Most standard RTSP formats are supported (H.264, AAC)

### Overlay Design Tips
- **Contrast**: Use colors that contrast well with your video background
- **Size**: Keep overlays reasonably sized (not too large to block content)
- **Position**: Place overlays in corners or edges to avoid blocking important content
- **Text**: Use clear, readable fonts and sizes
- **Images**: Use PNG images with transparent backgrounds for best results

### Performance Tips
- **Limit Overlays**: Don't use more than 5-10 overlays simultaneously
- **Image Size**: Use optimized images (compress before using)
- **Browser**: Use Chrome or Firefox for best performance
- **Close Tabs**: Close unnecessary browser tabs to free up resources

---

## Troubleshooting

### Stream Not Loading

**Problem**: Video doesn't start after entering RTSP URL

**Solutions**:
- Verify the RTSP URL is correct and accessible
- Check if the RTSP server is online
- Ensure FFmpeg is installed on the backend server
- Check browser console for errors (F12 → Console tab)
- Try a different RTSP stream to isolate the issue

### Video Stuttering or Buffering

**Problem**: Video playback is choppy or keeps buffering

**Solutions**:
- Check your internet connection speed
- Reduce the number of overlays
- Close other applications using bandwidth
- Try lowering the stream quality at the source
- Restart the stream

### Overlays Not Appearing

**Problem**: Created overlays don't show on the video

**Solutions**:
- Refresh the page and try again
- Check if MongoDB is running
- Verify the API is responding (check Network tab in browser dev tools)
- Ensure the overlay content is valid (text not empty, image URL accessible)

### Cannot Move or Resize Overlays

**Problem**: Overlay drag/resize doesn't work

**Solutions**:
- Ensure you're clicking directly on the overlay, not the video
- Try clicking and holding for a moment before dragging
- Check if browser zoom is set to 100%
- Clear browser cache and reload

### Saved Overlays Not Loading

**Problem**: Saved overlays list is empty

**Solutions**:
- Check MongoDB connection
- Verify backend API is running (`http://localhost:5000`)
- Check browser console for API errors
- Ensure overlays were created with "Add Overlay" button

### Audio Not Working

**Problem**: No sound from the stream

**Solutions**:
- Check volume slider is not at zero
- Verify system volume is turned up
- Check if the RTSP stream contains audio
- Try clicking play button again
- Check browser audio permissions

### CORS Errors

**Problem**: Browser shows CORS policy errors

**Solutions**:
- Verify backend `.env` has correct CORS_ORIGINS setting
- Ensure frontend and backend URLs match configuration
- Restart both frontend and backend servers
- Clear browser cache

---

## Keyboard Shortcuts

Currently, the application uses mouse controls. Future versions may include:
- Spacebar: Play/Pause
- Arrow Up/Down: Volume control
- Delete: Remove selected overlay

---

## Browser Compatibility

**Supported Browsers**:
- ✅ Google Chrome (recommended)
- ✅ Mozilla Firefox
- ✅ Microsoft Edge
- ✅ Safari (macOS)

**Minimum Versions**:
- Chrome 90+
- Firefox 88+
- Edge 90+
- Safari 14+

---

## Getting Help

If you continue to experience issues:

1. **Check Logs**
   - Backend: Check terminal where Flask is running
   - Frontend: Check browser console (F12)

2. **Restart Services**
   - Stop and restart the backend server
   - Refresh the frontend in your browser

3. **Verify Installation**
   - Ensure all dependencies are installed
   - Check MongoDB is running
   - Verify FFmpeg is installed and in PATH

4. **Documentation**
   - Review the SETUP_GUIDE.md for installation steps
   - Check API_DOCUMENTATION.md for API details

---

## Feature Roadmap

Upcoming features:
- Multiple simultaneous RTSP streams
- Advanced overlay animations
- Recording functionality
- Stream scheduling
- User authentication
- Preset overlay templates
- Real-time collaboration

---

## Feedback

We welcome your feedback! If you have suggestions or encounter bugs, please document:
- What you were trying to do
- What happened instead
- Browser and OS information
- Screenshots if applicable