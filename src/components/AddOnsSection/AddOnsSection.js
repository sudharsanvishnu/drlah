import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedAddOn } from "../../store/uiSlice";
import "./AddOnsSection.css";

function AddOnsSelection() {
  const dispatch = useDispatch();
  const selectedPlan = useSelector((state) => state.ui.selectedPlanId);
  const selectedAddOn = useSelector(
    (state) => state.ui.selectedAddOns[selectedPlan]
  );

  const addOnOptionsByPlan = {
    1: [
      {
        id: "secondary-gps",
        label: "BYO secondary GPS - $5/month",
      },
    ],
    2: [
      {
        id: "secondary-gps",
        label: "BYO secondary GPS - $5/month",
      },
      {
        id: "lockbox",
        label: "BYO lockbox - $10/month",
      },
    ],
    3: [
      {
        id: "secondary-gps",
        label: "BYO secondary GPS - $5/month",
      },
      {
        id: "between-trip-insurance",
        label: "Between trip insurance",
        comingSoon: true,
      },
    ],
  };

  const addOnOptions = addOnOptionsByPlan[selectedPlan] || [];

  const handleSelect = (addOnId) => {
    if (!selectedPlan) return;
    dispatch(
      setSelectedAddOn({
        planId: selectedPlan,
        addOnId,
      })
    );
  };

  return (
    <div className="add-ons-section">
      <div className="section-title">Select add-ons for your subscription</div>
      <div className="add-ons-flex">
        {addOnOptions.map((option) => (
          <label className="add-on-label" key={option.id}>
            {option.comingSoon && (
              <span className="add-on-coming-soon">Coming soon</span>
            )}
            <input
              type="radio"
              name={`add-on-${selectedPlan}`}
              value={option.id}
              checked={selectedAddOn === option.id}
              onChange={() => handleSelect(option.id)}
              className="add-on-radio"
              disabled={option.comingSoon}
            />
            <span className="add-on-text">{option.label}</span>
            <span className="custom-radio"></span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default AddOnsSelection;
