# Setup Guide - RTSP Livestream Overlay Application

## Table of Contents
1. [System Requirements](#system-requirements)
2. [Installation Steps](#installation-steps)
3. [Database Setup](#database-setup)
4. [Backend Setup](#backend-setup)
5. [Frontend Setup](#frontend-setup)
6. [Running the Application](#running-the-application)
7. [Verification](#verification)
8. [Troubleshooting](#troubleshooting)

---

## System Requirements

### Hardware Requirements
- **CPU**: Dual-core processor or better (Quad-core recommended)
- **RAM**: Minimum 4GB (8GB recommended)
- **Storage**: At least 1GB free space
- **Network**: Stable internet connection for streaming

### Software Requirements
- **Python**: 3.9 or higher
- **Node.js**: 16.x or higher
- **npm**: 8.x or higher (comes with Node.js)
- **MongoDB**: 4.4 or higher
- **FFmpeg**: Latest stable version
- **Git**: For cloning the repository (optional)

### Supported Operating Systems
- Windows 10/11
- macOS 10.15 or later
- Linux (Ubuntu 20.04+, Debian 10+, CentOS 8+)

---

## Installation Steps

### Step 1: Install Python

**Check if Python is installed:**
```bash
python --version
# or
python3 --version
```

**Installation:**

**Windows:**
- Download from https://www.python.org/downloads/
- Run installer and check "Add Python to PATH"

**macOS:**
```bash
brew install python3
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install python3 python3-pip python3-venv
```

### Step 2: Install Node.js and npm

**Check if Node.js is installed:**
```bash
node --version
npm --version
```

**Installation:**

**Windows:**
- Download from https://nodejs.org/
- Run the installer

**macOS:**
```bash
brew install node
```

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs
```

### Step 3: Install MongoDB

**Windows:**
1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Run the installer
3. Choose "Complete" installation
4. Install MongoDB as a Windows service
5. Complete the installation

**macOS:**
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community@6.0

# Start MongoDB
brew services start mongodb-community@6.0
```

**Linux (Ubuntu/Debian):**
```bash
# Import MongoDB public GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Create list file for MongoDB
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Update package database
sudo apt update

# Install MongoDB
sudo apt install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

**Verify MongoDB Installation:**
```bash
mongod --version
```

### Step 4: Install FFmpeg

**Windows:**
```bash
# Using Chocolatey
choco install ffmpeg

# Or download manually from https://ffmpeg.org/download.html
# Extract and add to System PATH
```

**macOS:**
```bash
brew install ffmpeg
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install ffmpeg
```

**Verify FFmpeg Installation:**
```bash
ffmpeg -version
```

### Step 5: Create Project Directory

```bash
mkdir livestream-overlay-app
cd livestream-overlay-app
```

---

## Database Setup

### Step 1: Start MongoDB

**Windows:**
```bash
# MongoDB should start automatically if installed as a service
# To manually start:
net start MongoDB
```

**macOS:**
```bash
brew services start mongodb-community@6.0
```

**Linux:**
```bash
sudo systemctl start mongod
```

### Step 2: Verify MongoDB is Running

```bash
# Connect to MongoDB shell
mongosh

# Or for older versions:
mongo
```

You should see a MongoDB shell prompt. Type `exit` to quit.

### Step 3: Create Database (Optional)

MongoDB will automatically create the database on first use, but you can create it manually:

```bash
mongosh
use livestream_db
db.createCollection("overlays")
exit
```

---

## Backend Setup

### Step 1: Create Backend Directory Structure

```bash
mkdir -p backend/app/{models,routes,services,utils}
mkdir -p backend/streams
cd backend
```

### Step 2: Create Virtual Environment

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

You should see `(venv)` in your terminal prompt.

### Step 3: Create requirements.txt

Create a file `backend/requirements.txt` with the following content:

```txt
Flask==3.0.0
flask-cors==4.0.0
pymongo==4.6.0
python-dotenv==1.0.0
ffmpeg-python==0.2.0
```

### Step 4: Install Python Dependencies

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

**If you encounter errors, install packages individually:**
```bash
pip install Flask==3.0.0
pip install flask-cors==4.0.0
pip install pymongo==4.6.0
pip install python-dotenv==1.0.0
pip install ffmpeg-python==0.2.0
```

### Step 5: Create Environment File

Create `backend/.env`:

```bash
FLASK_APP=run.py
FLASK_ENV=development
MONGO_URI=mongodb://localhost:27017/livestream_db
SECRET_KEY=your-secret-key-change-this
PORT=5000
CORS_ORIGINS=http://localhost:3000
```

**Generate a secure SECRET_KEY:**
```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

Copy the output and replace `your-secret-key-change-this` in the `.env` file.

### Step 6: Copy Backend Files

Copy all backend Python files (1-11) to their respective directories according to the project structure.

### Step 7: Test Backend

```bash
python run.py
```

You should see:
```
 * Running on http://0.0.0.0:5000
 * Debug mode: on
```

Keep this terminal open. The backend is now running.

---

## Frontend Setup

### Step 1: Open New Terminal

Open a new terminal window/tab (keep the backend running in the previous one).

```bash
cd livestream-overlay-app
mkdir -p frontend/{public,src/{components,services}}
cd frontend
```

### Step 2: Initialize React Project

**Option A: Create new React app (if not using provided files)**
```bash
npx create-react-app .
```

**Option B: Create package.json manually**

Create `frontend/package.json`:

```json
{
  "name": "livestream-overlay-frontend",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "axios": "^1.6.0",
    "video.js": "^8.6.0",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "proxy": "http://localhost:5000"
}
```

### Step 3: Install Dependencies

```bash
npm install
```

This may take a few minutes.

### Step 4: Create Environment File

Create `frontend/.env`:

```bash
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STREAM_URL=http://localhost:5000/stream
```

### Step 5: Copy Frontend Files

Copy all frontend files (12-24) to their respective directories:
- Components (13-17) → `src/components/`
- Services (18) → `src/services/`
- Core files (19-22) → `src/`
- Configuration (23-24) → root
- Public (12) → `public/`

### Step 6: Create Component CSS Files

Create the CSS files for each component in the same directory as the component:
- `src/components/LandingPage.css`
- `src/components/VideoPlayer.css`
- `src/components/ControlPanel.css`
- `src/components/OverlayEditor.css`
- `src/components/OverlayItem.css`

Copy the CSS content from the CSS artifact provided earlier.

### Step 7: Test Frontend

```bash
npm start
```

Your browser should automatically open to `http://localhost:3000`.

---

## Running the Application

### Start All Services

You need **three terminals** open:

**Terminal 1: MongoDB (if not running as service)**
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community@6.0

# Linux
sudo systemctl start mongod
```

**Terminal 2: Backend**
```bash
cd livestream-overlay-app/backend
source venv/bin/activate  # Windows: venv\Scripts\activate
python run.py
```

**Terminal 3: Frontend**
```bash
cd livestream-overlay-app/frontend
npm start
```

### Access the Application

Open your browser and go to:
```
http://localhost:3000
```

---

## Verification

### 1. Check Backend API

Open a new terminal and test the API:

```bash
# Check API health
curl http://localhost:5000/api/stream/status

# Expected response:
# {"is_streaming":false,"rtsp_url":null}
```

### 2. Test Overlay Creation

```bash
curl -X POST http://localhost:5000/api/overlays \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Test Overlay",
    "type": "text",
    "position": {"x": 10, "y": 10},
    "size": {"width": 100, "height": 50}
  }'
```

### 3. Verify MongoDB

```bash
mongosh
use livestream_db
db.overlays.find()
exit
```

### 4. Test Frontend

1. Open `http://localhost:3000`
2. You should see the landing page
3. Check browser console (F12) for any errors

---

## Troubleshooting

### Backend Issues

**Problem: ModuleNotFoundError**
```bash
# Solution: Ensure virtual environment is activated
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

**Problem: Port 5000 already in use**
```bash
# Find and kill the process
# macOS/Linux:
lsof -ti:5000 | xargs kill -9

# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change the port in .env file
```

**Problem: MongoDB connection refused**
```bash
# Check if MongoDB is running
# macOS:
brew services list | grep mongodb

# Linux:
sudo systemctl status mongod

# Windows:
net start | findstr MongoDB

# Start if not running
```

### Frontend Issues

**Problem: npm install fails**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

**Problem: Port 3000 already in use**
```bash
# The app will ask if you want to use a different port
# Press 'Y' to use port 3001

# Or kill the process using port 3000
# macOS/Linux:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Problem: CORS errors in browser console**
```bash
# Solution:
# 1. Verify CORS_ORIGINS in backend/.env matches frontend URL
# 2. Restart backend server
# 3. Clear browser cache (Ctrl+Shift+Delete)
```

### FFmpeg Issues

**Problem: FFmpeg not found**
```bash
# Verify installation
which ffmpeg  # macOS/Linux
where ffmpeg  # Windows

# Add to PATH if needed
# macOS/Linux: Add to ~/.bashrc or ~/.zshrc
export PATH=$PATH:/path/to/ffmpeg/bin

# Windows: Add to System Environment Variables
```

### MongoDB Issues

**Problem: MongoDB won't start**
```bash
# Check logs
# macOS:
tail -f /usr/local/var/log/mongodb/mongo.log

# Linux:
sudo tail -f /var/log/mongodb/mongod.log

# Windows:
# Check Event Viewer → Windows Logs → Application

# Common fix: Remove lock file
# Linux:
sudo rm /var/lib/mongodb/mongod.lock
sudo mongod --repair
sudo systemctl start mongod
```

---

## Next Steps

1. ✅ All services are running
2. 📖 Read the [User Guide](USER_GUIDE.md) to learn how to use the application
3. 🔌 Review [API Documentation](API_DOCUMENTATION.md) for integration
4. 🎥 Test with an RTSP stream from RTSP.me
5. 🎨 Customize the application to your needs

---

## Getting Test RTSP Streams

### Using RTSP.me
1. Go to https://rtsp.me
2. Upload a video file
3. Get the RTSP URL provided
4. Use it in the application

### Other Options
- Use VLC to create a local RTSP stream
- Use OBS with RTSP output
- Use IP cameras with RTSP support

---

## Quick Command Reference

```bash
# Start MongoDB
brew services start mongodb-community@6.0  # macOS
sudo systemctl start mongod                 # Linux
net start MongoDB                          # Windows

# Activate Python venv
source venv/bin/activate                   # macOS/Linux
venv\Scripts\activate                      # Windows

# Start Backend
python run.py

# Start Frontend
npm start

# Check if services are running
curl http://localhost:5000/api/stream/status  # Backend
curl http://localhost:3000                     # Frontend
```

---

## Support

If you continue experiencing issues:

1. Check all services are running
2. Review terminal output for error messages
3. Check browser console (F12) for frontend errors
4. Verify all dependencies are installed
5. Ensure firewall isn't blocking ports 3000, 5000, or 27017

For detailed troubleshooting, refer to the error messages in your terminal or browser console.