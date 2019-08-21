export enum AppActions {
  AUTH_STATE_CHANGED,
}

export interface Action {
  type: AppActions;
  payload: any;
}
