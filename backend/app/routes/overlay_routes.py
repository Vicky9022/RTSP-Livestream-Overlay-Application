from flask import Blueprint, request, jsonify
from app.services.overlay_service import OverlayService

bp = Blueprint('overlays', __name__, url_prefix='/api/overlays')
overlay_service = OverlayService()

@bp.route('', methods=['POST'])
def create_overlay():
    try:
        data = request.get_json()
        
        if not data or not all(k in data for k in ['content', 'type', 'position', 'size']):
            return jsonify({'error': 'Missing required fields'}), 400
        
        overlay = overlay_service.create_overlay(data)
        return jsonify({'message': 'Overlay created successfully', 'overlay': overlay}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('', methods=['GET'])
def get_all_overlays():
    try:
        user_id = request.args.get('user_id')
        overlays = overlay_service.get_all_overlays(user_id)
        return jsonify({'overlays': overlays}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/<overlay_id>', methods=['GET'])
def get_overlay(overlay_id):
    try:
        overlay = overlay_service.get_overlay_by_id(overlay_id)
        if not overlay:
            return jsonify({'error': 'Overlay not found'}), 404
        return jsonify({'overlay': overlay}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/<overlay_id>', methods=['PUT'])
def update_overlay(overlay_id):
    try:
        data = request.get_json()
        overlay = overlay_service.update_overlay(overlay_id, data)
        if not overlay:
            return jsonify({'error': 'Overlay not found'}), 404
        return jsonify({'message': 'Overlay updated successfully', 'overlay': overlay}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/<overlay_id>', methods=['DELETE'])
def delete_overlay(overlay_id):
    try:
        success = overlay_service.delete_overlay(overlay_id)
        if not success:
            return jsonify({'error': 'Overlay not found'}), 404
        return jsonify({'message': 'Overlay deleted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
