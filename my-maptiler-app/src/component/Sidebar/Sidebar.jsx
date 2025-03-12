import React, { useState } from "react";
import "./Sidebar.css";

export default function Sidebar({ location, onClose }) {
  const [activeTab, setActiveTab] = useState('overview');
  
  if (!location) return null;

  return (
    <div className="sidebar">
      <button className="close-btn" onClick={onClose}>
        ✕
      </button>
      
      <div className="location-header">
        {location.image ? (
          <img src={location.image} alt={location.name} />
        ) : (
          <img 
            src="https://maps.gstatic.com/tactile/pane/default_geocode_hero_2x.png" 
            alt="Default location" 
          />
        )}
      </div>

      <div className="location-content">
        <h2 className="location-name">{location.name}</h2>
        
        {location.rating && (
          <div className="location-rating">
            <span className="rating-value">{location.rating}</span>
            <div className="star-container">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="star">
                  {i < Math.floor(location.rating) ? "★" : "☆"}
                </span>
              ))}
            </div>
            <span className="review-count">
              {location.reviewCount ? `(${location.reviewCount})` : ''}
            </span>
          </div>
        )}
        
        <div className="location-type">
          <span>
            {location.type || "Điểm thu hút khách du lịch"}
          </span>
        </div>

        <div className="action-buttons">
          <button className="action-button">
            <div className="action-button-icon">
              <span>↗</span>
            </div>
            <span>Đường đi</span>
          </button>
          
          <button className="action-button">
            <div className="action-button-icon">
              <span>★</span>
            </div>
            <span>Lưu</span>
          </button>
          
          <button className="action-button">
            <div className="action-button-icon">
              <span>⊕</span>
            </div>
            <span>Gần đó</span>
          </button>
          
          <button className="action-button">
            <div className="action-button-icon">
              <span>✉</span>
            </div>
            <span>Gửi</span>
          </button>
          
          <button className="action-button">
            <div className="action-button-icon">
              <span>⇆</span>
            </div>
            <span>Chia sẻ</span>
          </button>
        </div>
        
        <div className="tabs">
          <div 
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Tổng quan
          </div>
          <div 
            className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Bài đánh giá
          </div>
          <div 
            className={`tab ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            Giới thiệu
          </div>
        </div>
        
        {activeTab === 'overview' && (
          <>
            <div className="location-address">
              <div className="location-address-icon">📍</div>
              <div className="location-address-text">
                {location.address || `Thọ Quang, Sơn Trà, Đà Nẵng, Việt Nam`}
              </div>
            </div>
            
            <div className="coordinates">
              <div className="coordinates-icon">📌</div>
              <div>
                Tọa độ: {location.coordinates[1]}, {location.coordinates[0]}
              </div>
            </div>
            
            {location.description && (
              <p>{location.description}</p>
            )}
          </>
        )}
        
        {activeTab === 'reviews' && (
          <p>Chưa có đánh giá.</p>
        )}
        
        {activeTab === 'about' && (
          <p>{location.description || "Chưa có thông tin chi tiết."}</p>
        )}
      </div>
    </div>
  );
}