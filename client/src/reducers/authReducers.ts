import { EActionTypes, IAction } from "../action/types";

const initialState: IAuthState = {
  isAuth: false,
  user: {}
};

interface IAuthState {
  isAuth: boolean;
  user: {};
}

export default function authReducer(
  state: IAuthState = initialState,
  action: IAction
) {
  switch (action.type) {
    case EActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        isAuth: action.payload,
        user: action.payload
      };
    default:
      return state;
  }
}
