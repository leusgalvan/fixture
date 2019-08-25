export enum AppActions {
  AUTH_STATE_CHANGED,
  TEAMS_GENERATED,
}

export interface Action {
  type: AppActions;
  payload: any;
}
