from datetime import datetime
from bson import ObjectId

class Overlay:
    def __init__(self, content, overlay_type, position, size, user_id=None, _id=None, created_at=None, updated_at=None):
        self._id = _id or ObjectId()
        self.content = content
        self.overlay_type = overlay_type
        self.position = position
        self.size = size
        self.user_id = user_id
        self.created_at = created_at or datetime.utcnow()
        self.updated_at = updated_at or datetime.utcnow()
    
    def to_dict(self):
        return {
            '_id': str(self._id),
            'content': self.content,
            'type': self.overlay_type,
            'position': self.position,
            'size': self.size,
            'user_id': self.user_id,
            'created_at': self.created_at.isoformat() if isinstance(self.created_at, datetime) else self.created_at,
            'updated_at': self.updated_at.isoformat() if isinstance(self.updated_at, datetime) else self.updated_at
        }
    
    @staticmethod
    def from_dict(data):
        return Overlay(
            content=data.get('content'),
            overlay_type=data.get('type'),
            position=data.get('position'),
            size=data.get('size'),
            user_id=data.get('user_id'),
            _id=ObjectId(data['_id']) if '_id' in data else None,
            created_at=data.get('created_at'),
            updated_at=data.get('updated_at')
        )