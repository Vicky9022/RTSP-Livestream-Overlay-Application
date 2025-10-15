import subprocess
import os
import signal
import shutil
from app.config import Config

class StreamService:
    def __init__(self):
        self.process = None
        self.current_rtsp_url = None
        self.output_dir = Config.STREAM_OUTPUT_DIR
        
        # Create output directory if it doesn't exist
        os.makedirs(self.output_dir, exist_ok=True)
    
    def _check_ffmpeg(self):
        """Check if FFmpeg is installed"""
        if shutil.which('ffmpeg') is None:
            raise Exception("FFmpeg is not installed or not in PATH. Please install FFmpeg.")
        return True
    
    def start_stream(self, rtsp_url):
        """Start streaming from RTSP URL"""
        try:
            # Check FFmpeg
            self._check_ffmpeg()
            
            # Stop existing stream if any
            if self.process:
                self.stop_stream()
            
            self.current_rtsp_url = rtsp_url
            output_path = os.path.join(self.output_dir, 'stream.m3u8')
            
            # FFmpeg command to convert RTSP to HLS
            command = [
                'ffmpeg',
                '-i', rtsp_url,
                '-c:v', 'copy',  # Copy video codec (faster)
                '-c:a', 'aac',
                '-f', 'hls',
                '-hls_time', '2',
                '-hls_list_size', '5',
                '-hls_flags', 'delete_segments+append_list',
                '-hls_segment_filename', os.path.join(self.output_dir, 'segment%03d.ts'),
                output_path
            ]
            
            print(f"Starting FFmpeg with command: {' '.join(command)}")
            
            # Start FFmpeg process
            self.process = subprocess.Popen(
                command,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                creationflags=subprocess.CREATE_NO_WINDOW if os.name == 'nt' else 0
            )
            
            print(f"✅ Stream started successfully from: {rtsp_url}")
            return '/stream/stream.m3u8'
            
        except FileNotFoundError:
            raise Exception("FFmpeg not found. Install FFmpeg: https://ffmpeg.org/download.html")
        except Exception as e:
            print(f"❌ Failed to start stream: {e}")
            raise Exception(f'Failed to start stream: {str(e)}')
    
    def stop_stream(self):
        """Stop the current stream"""
        try:
            if self.process:
                if os.name == 'nt':  # Windows
                    self.process.terminate()
                else:  # Unix/Linux/Mac
                    self.process.send_signal(signal.SIGTERM)
                
                self.process.wait(timeout=5)
                self.process = None
                self.current_rtsp_url = None
                print("✅ Stream stopped successfully")
        except Exception as e:
            print(f"Error stopping stream: {e}")
            self.process = None
            self.current_rtsp_url = None
    
    def get_status(self):
        """Get current stream status"""
        is_streaming = self.process is not None and self.process.poll() is None
        return {
            'is_streaming': is_streaming,
            'rtsp_url': self.current_rtsp_url if is_streaming else None
        }