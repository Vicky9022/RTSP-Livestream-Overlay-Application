from app.models.overlay import Overlay
from app.utils.database import get_db
from bson import ObjectId
from datetime import datetime

class OverlayService:
    def __init__(self):
        self.collection = None
    
    def _get_collection(self):
        """Get MongoDB collection with error handling"""
        if not self.collection:
            try:
                db = get_db()
                self.collection = db['overlays']
            except Exception as e:
                print(f"Error getting database collection: {e}")
                raise Exception("Database connection error. Make sure MongoDB is running.")
        return self.collection
    
    def create_overlay(self, data):
        """Create a new overlay"""
        try:
            collection = self._get_collection()
            overlay = Overlay(
                content=data['content'],
                overlay_type=data['type'],
                position=data['position'],
                size=data['size'],
                user_id=data.get('user_id')
            )
            result = collection.insert_one(overlay.to_dict())
            overlay._id = result.inserted_id
            return overlay.to_dict()
        except Exception as e:
            print(f"Error creating overlay: {e}")
            raise
    
    def get_all_overlays(self, user_id=None):
        """Get all overlays, optionally filtered by user"""
        try:
            collection = self._get_collection()
            query = {'user_id': user_id} if user_id else {}
            overlays = list(collection.find(query))
            for overlay in overlays:
                overlay['_id'] = str(overlay['_id'])
            return overlays
        except Exception as e:
            print(f"Error getting overlays: {e}")
            raise
    
    def get_overlay_by_id(self, overlay_id):
        """Get a specific overlay by ID"""
        try:
            collection = self._get_collection()
            overlay = collection.find_one({'_id': ObjectId(overlay_id)})
            if overlay:
                overlay['_id'] = str(overlay['_id'])
            return overlay
        except Exception as e:
            print(f"Error getting overlay by ID: {e}")
            raise
    
    def update_overlay(self, overlay_id, data):
        """Update an existing overlay"""
        try:
            collection = self._get_collection()
            data['updated_at'] = datetime.utcnow()
            result = collection.find_one_and_update(
                {'_id': ObjectId(overlay_id)},
                {'$set': data},
                return_document=True
            )
            if result:
                result['_id'] = str(result['_id'])
            return result
        except Exception as e:
            print(f"Error updating overlay: {e}")
            raise
    
    def delete_overlay(self, overlay_id):
        """Delete an overlay"""
        try:
            collection = self._get_collection()
            result = collection.delete_one({'_id': ObjectId(overlay_id)})
            return result.deleted_count > 0
        except Exception as e:
            print(f"Error deleting overlay: {e}")
            raise