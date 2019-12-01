import combineReducers from "./combineReducers";
import authReducer from "./authReducers";

export default combineReducers({
  auth: authReducer
});
