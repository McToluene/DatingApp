import { EActionTypes } from "./types";
import { Dispatch } from "react";
import Axios from "axios";
import ILogin from "../components/login/ILogin";
import jwt_decode from "jwt-decode";
import { History } from "history";

const baseUrl: string = "http://localhost:5000/api/auth/";

export const loginUser = async (
  userData: ILogin,
  dispatch: Dispatch<any>,
  history: History
) => {
  await Axios.post(baseUrl + "login", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("token", token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
      history.push("/matches");
    })
    .catch(err =>
      dispatch({
        payload: err.response.data,
        type: EActionTypes.GET_ERRORS
      })
    );
};

export const setCurrentUser = (decode: any) => {
  return {
    payload: decode,
    type: EActionTypes.SET_CURRENT_USER
  };
};

export const logoutUser = (dispatch: Dispatch<any>, history: History) => {
  localStorage.removeItem("token");
  dispatch(setCurrentUser({}));
  history.push("/");
};
