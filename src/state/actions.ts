export enum AppActions {
  AUTH_STATE_CHANGED,
  TEAMS_GENERATED,
  TOURNAMENT_CREATED,
}

export interface Action {
  type: AppActions;
  payload: any;
}
