export enum AppActions {
  AUTH_STATE_CHANGED,
  TEAMS_GENERATED,
  TOURNAMENT_CREATED,
  TOGGLE_DARK_MODE
}

export interface Action {
  type: AppActions;
  payload?: any;
}
