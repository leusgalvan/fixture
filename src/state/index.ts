import React from "react";
import { User } from "firebase";
import { Action, AppActions } from "./actions";
import { Team } from "../types";
export { AppActions };

interface AppState {
  user: User | null;
  generatedTeams: Team[];
  dispatch: React.Dispatch<Action>;
}

export const initialState = {
  user: null,
  generatedTeams: [],
  dispatch: () => {},
};

export const AppContext = React.createContext<AppState>(initialState);

export const reducerApp = (state: AppState, action: Action) => {
  switch (action.type) {
    case AppActions.AUTH_STATE_CHANGED:
      return {
        ...state,
        user: action.payload,
      };
    case AppActions.TEAMS_GENERATED:
      return {
        ...state,
        generatedTeams: action.payload,
      };
    default:
      return state;
  }
};
