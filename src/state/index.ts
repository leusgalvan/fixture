import React from "react";
import { User } from "firebase";
import { Action, AppActions } from "./actions";
import { Team } from "../types";
export { AppActions };

interface AppState {
  user: User | null;
  generatedTeams: Team[];
  dispatch: React.Dispatch<Action>;
  isDarkModeEnabled: boolean;
}

export const initialState = {
  user: null,
  generatedTeams: [],
  dispatch: () => {},
  isDarkModeEnabled: false
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
    case AppActions.TOURNAMENT_CREATED:
      return {
        ...state,
        generatedTeams: [],
      };
      case AppActions.TOGGLE_DARK_MODE:
        return {
          ...state,
          isDarkModeEnabled: !state.isDarkModeEnabled
        };
    default:
      return state;
  }
};
