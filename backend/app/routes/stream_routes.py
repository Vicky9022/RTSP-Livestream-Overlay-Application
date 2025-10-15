from flask import Blueprint, request, jsonify, Response, send_file
from app.services.stream_service import StreamService
import os

bp = Blueprint('stream', __name__, url_prefix='/api/stream')
stream_service = StreamService()

@bp.route('/start', methods=['POST'])
def start_stream():
    try:
        data = request.get_json()
        rtsp_url = data.get('rtsp_url')
        
        if not rtsp_url:
            return jsonify({'error': 'RTSP URL is required'}), 400
        
        stream_url = stream_service.start_stream(rtsp_url)
        return jsonify({'message': 'Stream started', 'stream_url': stream_url}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/stop', methods=['POST'])
def stop_stream():
    try:
        stream_service.stop_stream()
        return jsonify({'message': 'Stream stopped'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/status', methods=['GET'])
def stream_status():
    try:
        status = stream_service.get_status()
        return jsonify(status), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500