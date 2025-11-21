import React from "react";
import "./SkeletonLoader.css";

function SkeletonLoader() {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-container">
        {/* Sidebar skeleton - hidden on mobile */}
        <div className="skeleton-sidebar">
          {[...Array(11)].map((_, index) => (
            <div key={index} className="skeleton-sidebar-item">
              <div className="skeleton-line skeleton-sidebar-line"></div>
            </div>
          ))}
        </div>

        {/* Main content skeleton */}
        <div className="skeleton-main-content">
          {/* Title skeleton */}
          <div className="skeleton-section">
            <div className="skeleton-line skeleton-title"></div>
            <div className="skeleton-line skeleton-description"></div>
          </div>

          <div className="skeleton-divider"></div>

          {/* Plan cards skeleton */}
          <div className="skeleton-section">
            <div className="skeleton-line skeleton-subtitle"></div>
            <div className="skeleton-cards">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="skeleton-card">
                  <div className="skeleton-line skeleton-card-title"></div>
                  <div className="skeleton-card-features">
                    {[...Array(3)].map((_, idx) => (
                      <div key={idx} className="skeleton-feature-item">
                        <div className="skeleton-circle"></div>
                        <div className="skeleton-line skeleton-feature-text"></div>
                      </div>
                    ))}
                  </div>
                  <div className="skeleton-line skeleton-card-price"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer skeleton */}
      <div className="skeleton-footer">
        <div className="skeleton-footer-buttons">
          <div className="skeleton-button"></div>
          <div className="skeleton-button"></div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonLoader;
