import React from "react";
import "./PlanCard.css";

function PlanCard({ plan, isSelected, onSelect }) {
  return (
    <button
      className={`plan-card ${isSelected ? "selected" : ""}`}
      onClick={onSelect}
      aria-pressed={isSelected}
    >
      <div className="plan-card-title">{plan.title}</div>
      <ul className="plan-card-features">
        {plan.features.map((feature, index) => (
          <li key={index} className="feature-item">
            <img
              className="feature-icon"
              src={feature.icon}
              alt={feature.alt}
            />
            <span className="feature-text">{feature.text}</span>
          </li>
        ))}
      </ul>
      <div className="plan-card-price-container">
        <span className="plan-card-price">{plan.price}</span>
        {plan.period && <span className="plan-card-period">{plan.period}</span>}
      </div>
    </button>
  );
}

export default PlanCard;
