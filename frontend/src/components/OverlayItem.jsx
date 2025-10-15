import React, { useState } from 'react';
import './OverlayItem.css';

const OverlayItem = ({ overlay, onUpdate, onDelete }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (e.target.className === 'resize-handle') {
      setIsResizing(true);
    } else {
      setIsDragging(true);
    }
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      onUpdate(overlay._id, {
        position: {
          x: overlay.position.x + deltaX,
          y: overlay.position.y + deltaY
        }
      });
      setDragStart({ x: e.clientX, y: e.clientY });
    } else if (isResizing) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      onUpdate(overlay._id, {
        size: {
          width: Math.max(50, overlay.size.width + deltaX),
          height: Math.max(30, overlay.size.height + deltaY)
        }
      });
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  React.useEffect(() => {
    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing]);

  const style = {
    left: `${overlay.position.x}px`,
    top: `${overlay.position.y}px`,
    width: `${overlay.size.width}px`,
    height: `${overlay.size.height}px`
  };

  return (
    <div 
      className="overlay-item" 
      style={style}
      onMouseDown={handleMouseDown}
    >
      {overlay.type === 'text' ? (
        <div className="overlay-text">{overlay.content}</div>
      ) : (
        <img src={overlay.content} alt="overlay" className="overlay-image" />
      )}
      <button 
        className="overlay-delete" 
        onClick={() => onDelete(overlay._id)}
      >
        ×
      </button>
      <div className="resize-handle"></div>
    </div>
  );
};

export default OverlayItem;