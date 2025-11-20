import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCardDetails } from "../../store/uiSlice";
import "./CardDetails.css";

function CardDetailsInput() {
  const dispatch = useDispatch();
  const { cardNumber, expiry, cvc } = useSelector(
    (state) => state.ui.cardDetails
  );

  // Basic formatting for card number (adds spaces)
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    value = value.replace(/(\d{4})(?=\d)/g, "$1 "); // Add space after every 4 digits
    if (value.length > 19) {
      // Max 16 digits + 3 spaces
      value = value.substring(0, 19);
    }
    dispatch(setCardDetails({ cardNumber: value }));
  };

  // Basic formatting for expiry (MM/YY)
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    if (value.length > 2) {
      value = value.substring(0, 2) + "/" + value.substring(2, 4);
    }
    if (value.length > 5) {
      // Max MM/YY length
      value = value.substring(0, 5);
    }
    dispatch(setCardDetails({ expiry: value }));
  };

  const handleCvcChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    if (value.length > 4) {
      // CVC/CVV is typically 3 or 4 digits
      value = value.substring(0, 4);
    }
    dispatch(setCardDetails({ cvc: value }));
  };

  return (
    <div className="add-ons-section">
      <div className="section-title">Add card details</div>
      <div className="card-input-container">
        <div className="card-number-wrapper">
          <span className="card-icon">💳</span>
          <input
            type="text"
            placeholder="1234 5678 1234 5678"
            value={cardNumber}
            onChange={handleCardNumberChange}
            className="card-input-field card-number-field"
            maxLength="19"
            aria-label="Card Number"
          />
        </div>
        <input
          type="text"
          placeholder="MM/YY"
          value={expiry}
          onChange={handleExpiryChange}
          className="card-input-field expiry-field"
          maxLength="5"
          aria-label="Expiration Date"
        />
        <input
          type="text"
          placeholder="CVC"
          value={cvc}
          onChange={handleCvcChange}
          className="card-input-field cvc-field"
          maxLength="4"
          aria-label="CVC"
        />
      </div>
      <p className="card-disclaimer">
        You will not be charged right now. Subscription will only start once
        your listing is published and live.
      </p>
    </div>
  );
}

export default CardDetailsInput;
