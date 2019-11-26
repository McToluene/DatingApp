import { EActionTypes } from "./types";
import { Dispatch } from "redux";
import Axios from "axios";
import ILogin from "../components/login/ILogin";

const baseUrl: string = "http://localhost:5000/api/";

export const loginUser = (userData: ILogin) => (dispatch: Dispatch) => {
  Axios.post(baseUrl + "login", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("token", token);
    })
    .catch(err =>
      dispatch({
        payload: err.response.data,
        type: EActionTypes.GET_ERRORS
      })
    );
};
