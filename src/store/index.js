import { configureStore } from "@reduxjs/toolkit";
import uiReducer, { createInitialUiState } from "./uiSlice";

const STORAGE_KEY = "drivelah-ui-state";
const hasWindow =
  typeof window !== "undefined" && typeof window.localStorage !== "undefined";

const loadState = () => {
  if (!hasWindow) {
    return undefined;
  }

  try {
    const serializedState = window.localStorage.getItem(STORAGE_KEY);

    if (!serializedState) {
      return undefined;
    }

    const rawStoredState = JSON.parse(serializedState);

    if (!rawStoredState || typeof rawStoredState !== "object") {
      return undefined;
    }

    const defaultState = createInitialUiState();
    const hasLegacyCardDetails =
      typeof rawStoredState.cardNumber === "string" ||
      typeof rawStoredState.expiry === "string" ||
      typeof rawStoredState.cvc === "string";

    const storedCardDetails = hasLegacyCardDetails
      ? {
          cardNumber: rawStoredState.cardNumber || "",
          expiry: rawStoredState.expiry || "",
          cvc: rawStoredState.cvc || "",
        }
      : rawStoredState.cardDetails || {};

    return {
      ui: {
        ...defaultState,
        ...rawStoredState,
        cardDetails: {
          ...defaultState.cardDetails,
          ...storedCardDetails,
        },
        selectedAddOns: {
          ...defaultState.selectedAddOns,
          ...(rawStoredState.selectedAddOns || {}),
        },
      },
    };
  } catch (error) {
    console.warn("Unable to load persisted card details", error);
    return undefined;
  }
};

const saveState = (state) => {
  if (!hasWindow) {
    return;
  }

  try {
    const { ui } = state;

    if (!ui) {
      return;
    }

    const persistableState = {
      selectedPlanId: ui.selectedPlanId,
      selectedAddOns: ui.selectedAddOns,
      cardDetails: ui.cardDetails,
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(persistableState));
  } catch (error) {
    console.warn("Unable to persist card details", error);
  }
};

const store = configureStore({
  reducer: {
    ui: uiReducer,
  },
  preloadedState: loadState(),
});

if (hasWindow) {
  store.subscribe(() => {
    saveState(store.getState());
  });
}

export default store;
