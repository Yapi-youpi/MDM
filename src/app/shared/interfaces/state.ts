export interface IState {
  success: boolean;
  error: string;
}

export interface IAuthState extends IState {
  id: string;
  token: string;
}
