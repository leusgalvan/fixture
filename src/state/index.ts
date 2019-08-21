import React from "react";
import { User } from "firebase";
import { Action, AppActions } from "./actions";
export { AppActions };

interface AppState {
  user: User | null;
  dispatch: React.Dispatch<Action>;
}

export const AppContext = React.createContext<Partial<AppState>>({});

export const initialState = {
  user: null,
  dispatch: () => {},
};

export const reducerApp = (state: AppState, action: Action) => {
  switch (action.type) {
    case AppActions.AUTH_STATE_CHANGED:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
