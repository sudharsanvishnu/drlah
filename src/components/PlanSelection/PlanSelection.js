import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedAddOn, setSelectedPlan } from "../../store/uiSlice";
import "./PlanSelection.css";
import PlanCard from "./PlanCard";

function PlanSelection({ plans }) {
  const dispatch = useDispatch();
  const selectedPlan = useSelector((state) => state.ui.selectedPlanId);

  return (
    <div className="plan-selection-section">
      <div className="section-title">Select your plan</div>
      <div className="plan-cards-container">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            isSelected={selectedPlan === plan.id}
            onSelect={() => {
              dispatch(setSelectedPlan(plan.id));
              dispatch(
                setSelectedAddOn({
                  planId: plan.id,
                  addOnId: undefined,
                })
              );
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default PlanSelection;
