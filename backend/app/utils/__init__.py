from flask import Flask
from flask_cors import CORS
from app.config import Config
from app.utils.database import init_db

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Enable CORS
    CORS(app, resources={
        r"/api/*": {
            "origins": app.config['CORS_ORIGINS'],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type"]
        }
    })
    
    # Initialize database
    try:
        init_db(app)
    except Exception as e:
        print(f"Database initialization error: {e}")
    
    # Register blueprints
    try:
        from app.routes import overlay_routes, stream_routes
        app.register_blueprint(overlay_routes.bp)
        app.register_blueprint(stream_routes.bp)
    except Exception as e:
        print(f"Blueprint registration error: {e}")
        raise
    
    @app.route('/')
    def index():
        return {'message': 'RTSP Livestream API is running'}
    
    @app.route('/health')
    def health():
        return {'status': 'healthy'}
    
    return app