import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import "./Footer.css";

const Footer = ({
  onNext = () => {},
  onBack = () => {},
  canGoNext = true,
  canGoBack = false,
}) => {
  const cardDetails = useSelector((state) => state.ui.cardDetails);

  const hasCardDetails = useMemo(() => {
    if (!cardDetails) {
      return false;
    }

    const { cardNumber, expiry, cvc } = cardDetails;
    return Boolean(
      cardNumber?.trim()?.length &&
        expiry?.trim()?.length &&
        cvc?.trim()?.length
    );
  }, [cardDetails]);

  const isNextDisabled = !hasCardDetails || !canGoNext;
  const isBackDisabled = !canGoBack;

  const handleNext = () => {
    if (!isNextDisabled) {
      onNext();
    }
  };

  const handleBack = () => {
    if (!isBackDisabled) {
      onBack();
    }
  };

  return (
    <div className="footer-container">
      <div className="footer-buttons">
        <button
          className="footer-button back-button"
          onClick={handleBack}
          disabled={isBackDisabled}
        >
          Go back
        </button>
        <button
          className="footer-button next-button"
          onClick={handleNext}
          disabled={isNextDisabled}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Footer;
