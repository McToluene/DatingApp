import combineReducers from "./combineReducers";
import authReducer from "./authReducers";
import usersReducer from "./usersReducers";

export default combineReducers({
  auth: authReducer,
  users: usersReducer
});
