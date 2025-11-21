import { createSlice } from "@reduxjs/toolkit";

export const createInitialUiState = () => ({
  selectedPlanId: 0,
  selectedAddOns: {},
  cardDetails: {
    cardNumber: "",
    expiry: "",
    cvc: "",
  },
});

const uiSlice = createSlice({
  name: "ui",
  initialState: createInitialUiState(),
  reducers: {
    setSelectedPlan(state, action) {
      const newPlanId = action.payload;
      const previousPlanId = state.selectedPlanId;

      // If plan is actually changing (not just setting the same plan), clear related data
      if (newPlanId !== previousPlanId && previousPlanId !== 0) {
        // Clear card details when plan changes
        state.cardDetails = {
          cardNumber: "",
          expiry: "",
          cvc: "",
        };
        // Clear addon selection for the new plan (it will be set fresh)
        delete state.selectedAddOns[newPlanId];
      }

      state.selectedPlanId = newPlanId;
    },
    setSelectedAddOn(state, action) {
      const { planId, addOnId } = action.payload || {};

      if (!planId) {
        return;
      }

      if (addOnId) {
        state.selectedAddOns[planId] = addOnId;
      } else {
        delete state.selectedAddOns[planId];
      }
    },
    setCardDetails(state, action) {
      state.cardDetails = {
        ...state.cardDetails,
        ...action.payload,
      };
    },
    resetSelections() {
      return createInitialUiState();
    },
  },
});

export const {
  setSelectedPlan,
  setSelectedAddOn,
  setCardDetails,
  resetSelections,
} = uiSlice.actions;

export default uiSlice.reducer;
