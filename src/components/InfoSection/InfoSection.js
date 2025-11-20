import React from "react";
import "./InfoSection.css";

function InfoSection() {
  return (
    <div className="info-section">
      <span className="info-link">
        Learn more about the plans here -{" "}
        <span className="info-teal-color-text">
          What is the right plan for me?
        </span>
      </span>
      <p className="info-text">
        You will be able to switch between plans easily later as well. Speak to
        our host success team if you need any clarifications.
      </p>
    </div>
  );
}

export default InfoSection;
