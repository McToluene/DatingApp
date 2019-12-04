import { EActionTypes, IAction } from "../action/types";
import { User } from "../model/User";

const initialState: IUsersState = {
  loading: false,
  user: {} as User,
  users: []
};

interface IUsersState {
  loading: boolean;
  user: User;
  users: User[];
}

export default function usersReducer(
  state: IUsersState = initialState,
  action: IAction
) {
  switch (action.type) {
    case EActionTypes.USERS_LOADING:
      return {
        ...state,
        loading: true
      };
    case EActionTypes.GET_USERS:
      return {
        ...state,
        loading: false,
        users: [...action.payload]
      };
    case EActionTypes.GET_USER:
      return {
        ...state,
        loading: false,
        user: action.payload
      };
    default:
      return state;
  }
}
