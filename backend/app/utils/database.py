from pymongo import MongoClient
from flask import g
import os

_client = None
_db = None

def init_db(app):
    """Initialize MongoDB connection"""
    global _client, _db
    try:
        mongo_uri = app.config.get('MONGO_URI', 'mongodb://localhost:27017/livestream_db')
        _client = MongoClient(mongo_uri, serverSelectionTimeoutMS=5000)
        
        # Test the connection
        _client.server_info()
        
        # Get database name from URI
        db_name = mongo_uri.split('/')[-1].split('?')[0]
        if not db_name:
            db_name = 'livestream_db'
        
        _db = _client[db_name]
        print(f"✅ MongoDB connected successfully to database: {db_name}")
        
    except Exception as e:
        print(f"❌ MongoDB connection failed: {e}")
        print(f"Make sure MongoDB is running: net start MongoDB")
        # Don't raise exception, allow app to start
        _db = None

def get_db():
    """Get database instance"""
    global _db
    if _db is None:
        print("⚠️ Database not initialized. Check MongoDB connection.")
        raise Exception("Database not connected. Make sure MongoDB is running.")
    return _db

def close_db():
    """Close database connection"""
    global _client
    if _client:
        _client.close()
        print("MongoDB connection closed")