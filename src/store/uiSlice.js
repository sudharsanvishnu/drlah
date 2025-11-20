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
      state.selectedPlanId = action.payload;
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
