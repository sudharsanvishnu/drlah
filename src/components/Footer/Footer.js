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
  const selectedPlan = useSelector((state) => state.ui.selectedPlanId);
  const selectedAddOn = useSelector(
    (state) => state.ui.selectedAddOns[state.ui.selectedPlanId]
  );

  // Plans 1, 2, 3 require addon selection
  const shouldShowAddOns = [1, 2, 3].includes(Number(selectedPlan));
  const isAddonSelectionRequired = shouldShowAddOns && selectedPlan !== 0;

  const hasCardDetails = useMemo(() => {
    if (!cardDetails) {
      return false;
    }

    const { cardNumber, expiry, cvc } = cardDetails;
    
    // Validate card number: should have 16 digits (after removing spaces)
    const cardNumberDigits = cardNumber?.replace(/\s/g, "") || "";
    const isValidCardNumber = cardNumberDigits.length === 16 && /^\d+$/.test(cardNumberDigits);
    
    // Validate expiry: should be in MM/YY format (5 characters)
    const isValidExpiry = expiry?.trim()?.length === 5 && 
      /^\d{2}\/\d{2}$/.test(expiry?.trim() || "");
    
    // Validate CVC: should be 3 or 4 digits
    const isValidCvc = cvc?.trim()?.length >= 3 && 
      cvc?.trim()?.length <= 4 && 
      /^\d+$/.test(cvc?.trim() || "");
    
    return isValidCardNumber && isValidExpiry && isValidCvc;
  }, [cardDetails]);

  const hasAddonSelection = useMemo(() => {
    if (!isAddonSelectionRequired) {
      return true; // Addon not required for this plan
    }
    return Boolean(selectedAddOn);
  }, [isAddonSelectionRequired, selectedAddOn]);

  const isNextDisabled = !hasCardDetails || !hasAddonSelection || !canGoNext;
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
