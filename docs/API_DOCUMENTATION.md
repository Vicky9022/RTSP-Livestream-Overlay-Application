API Documentation
Base URL
http://localhost:5000/api
Authentication
Currently, no authentication is required. User identification can be done via optional user_id parameter.

Overlay Endpoints
1. Create Overlay
Create a new overlay configuration.
Endpoint: POST /api/overlays
Request Body:
json{
  "content": "My Logo Text",
  "type": "text",
  "position": {
    "x": 50,
    "y": 50
  },
  "size": {
    "width": 200,
    "height": 100
  },
  "user_id": "user123"
}
Parameters:

content (string, required): The overlay content (text or image URL)
type (string, required): Type of overlay - "text" or "logo"
position (object, required): Position coordinates

x (number): X coordinate in pixels
y (number): Y coordinate in pixels


size (object, required): Dimensions

width (number): Width in pixels
height (number): Height in pixels


user_id (string, optional): User identifier

Response: 201 Created
json{
  "message": "Overlay created successfully",
  "overlay": {
    "_id": "507f1f77bcf86cd799439011",
    "content": "My Logo Text",
    "type": "text",
    "position": { "x": 50, "y": 50 },
    "size": { "width": 200, "height": 100 },
    "user_id": "user123",
    "created_at": "2024-10-13T10:30:00.000Z",
    "updated_at": "2024-10-13T10:30:00.000Z"
  }
}

2. Get All Overlays
Retrieve all saved overlays, optionally filtered by user.
Endpoint: GET /api/overlays
Query Parameters:

user_id (string, optional): Filter overlays by user

Example Request:
GET /api/overlays?user_id=user123
Response: 200 OK
json{
  "overlays": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "content": "My Logo Text",
      "type": "text",
      "position": { "x": 50, "y": 50 },
      "size": { "width": 200, "height": 100 },
      "user_id": "user123",
      "created_at": "2024-10-13T10:30:00.000Z",
      "updated_at": "2024-10-13T10:30:00.000Z"
    }
  ]
}

3. Get Single Overlay
Retrieve a specific overlay by ID.
Endpoint: GET /api/overlays/:overlay_id
Parameters:

overlay_id (string, required): MongoDB ObjectId of the overlay

Example Request:
GET /api/overlays/507f1f77bcf86cd799439011
Response: 200 OK
json{
  "overlay": {
    "_id": "507f1f77bcf86cd799439011",
    "content": "My Logo Text",
    "type": "text",
    "position": { "x": 50, "y": 50 },
    "size": { "width": 200, "height": 100 },
    "user_id": "user123",
    "created_at": "2024-10-13T10:30:00.000Z",
    "updated_at": "2024-10-13T10:30:00.000Z"
  }
}
Error Response: 404 Not Found
json{
  "error": "Overlay not found"
}

4. Update Overlay
Update an existing overlay's properties.
Endpoint: PUT /api/overlays/:overlay_id
Parameters:

overlay_id (string, required): MongoDB ObjectId of the overlay

Request Body: (all fields optional)
json{
  "content": "Updated Text",
  "type": "text",
  "position": {
    "x": 100,
    "y": 150
  },
  "size": {
    "width": 250,
    "height": 120
  }
}
Response: 200 OK
json{
  "message": "Overlay updated successfully",
  "overlay": {
    "_id": "507f1f77bcf86cd799439011",
    "content": "Updated Text",
    "type": "text",
    "position": { "x": 100, "y": 150 },
    "size": { "width": 250, "height": 120 },
    "user_id": "user123",
    "created_at": "2024-10-13T10:30:00.000Z",
    "updated_at": "2024-10-13T11:45:00.000Z"
  }
}
Error Response: 404 Not Found
json{
  "error": "Overlay not found"
}

5. Delete Overlay
Remove an overlay from the database.
Endpoint: DELETE /api/overlays/:overlay_id
Parameters:

overlay_id (string, required): MongoDB ObjectId of the overlay

Example Request:
DELETE /api/overlays/507f1f77bcf86cd799439011
Response: 200 OK
json{
  "message": "Overlay deleted successfully"
}
Error Response: 404 Not Found
json{
  "error": "Overlay not found"
}

Stream Endpoints
6. Start Stream
Start streaming from an RTSP URL.
Endpoint: POST /api/stream/start
Request Body:
json{
  "rtsp_url": "rtsp://example.com/stream"
}
Parameters:

rtsp_url (string, required): Valid RTSP stream URL

Response: 200 OK
json{
  "message": "Stream started",
  "stream_url": "/stream/stream.m3u8"
}
Error Response: 400 Bad Request
json{
  "error": "RTSP URL is required"
}

7. Stop Stream
Stop the currently running stream.
Endpoint: POST /api/stream/stop
Response: 200 OK
json{
  "message": "Stream stopped"
}

8. Get Stream Status
Check if a stream is currently active.
Endpoint: GET /api/stream/status
Response: 200 OK
json{
  "is_streaming": true,
  "rtsp_url": "rtsp://example.com/stream"
}

Error Responses
All endpoints may return the following error responses:
400 Bad Request
json{
  "error": "Missing required fields"
}
404 Not Found
json{
  "error": "Resource not found"
}
500 Internal Server Error
json{
  "error": "Internal server error message"
}

Example Usage with cURL
Create an Overlay
bashcurl -X POST http://localhost:5000/api/overlays \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Live Stream",
    "type": "text",
    "position": {"x": 10, "y": 10},
    "size": {"width": 150, "height": 50}
  }'
Get All Overlays
bashcurl http://localhost:5000/api/overlays
Update an Overlay
bashcurl -X PUT http://localhost:5000/api/overlays/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "position": {"x": 20, "y": 20}
  }'
Delete an Overlay
bashcurl -X DELETE http://localhost:5000/api/overlays/507f1f77bcf86cd799439011
Start Stream
bashcurl -X POST http://localhost:5000/api/stream/start \
  -H "Content-Type: application/json" \
  -d '{
    "rtsp_url": "rtsp://example.com/live"
  }'

Rate Limiting
Currently, no rate limiting is implemented. Consider implementing rate limiting for production use.
CORS
CORS is enabled for origins specified in the .env file (default: http://localhost:3000).