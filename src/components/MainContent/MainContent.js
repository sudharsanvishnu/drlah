import React from "react";
import "./MainContent.css";
import PlanSelection from "../PlanSelection/PlanSelection";
import AddOnsSelection from "../AddOnsSection/AddOnsSection";
import InfoSection from "../InfoSection/InfoSection";
import { useSelector } from "react-redux";
import CardDetailsInput from "../AddCardDetails/CardDetails";

function MainContent({ plans }) {
  const selectedPlan = useSelector((state) => state.ui.selectedPlanId);
  const shouldShowAddOns = [1, 2, 3].includes(Number(selectedPlan));
  const selectedAddOn = useSelector(
    (state) => state.ui.selectedAddOns[state.ui.selectedPlanId]
  );

  return (
    <div className="subscription-main-content">
      <div className="subs-padding">
        <div className="sub-title">Subscription plan</div>
        <div className="sub-description">
          Select the ideal subscription plan for your listing.
        </div>
      </div>
      <div className="subs-line" />
      <div className="subs-padding-2">
        <PlanSelection plans={plans} />
      </div>
      <div
        className={`add-ons-transition ${
          shouldShowAddOns ? "add-ons-visible" : ""
        }`}
        aria-hidden={!shouldShowAddOns}
      >
        <div className="subs-line" />
        <AddOnsSelection />
      </div>

      <div
        className={`add-ons-transition ${
          selectedAddOn ? "add-ons-visible" : ""
        }`}
        aria-hidden={!selectedAddOn}
      >
        <div className="subs-line" />
        <CardDetailsInput />
      </div>

      <div className="subs-line" />
      <InfoSection />
    </div>
  );
}

export default MainContent;
