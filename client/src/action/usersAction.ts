import { EActionTypes } from "./types";
import Axios from "axios";
import { Dispatch } from "react";

const baseUrl: string = "http://localhost:5000/api/users/";

export const getUsers = async (dispatch: Dispatch<any>) => {
  dispatch(setUsersLoading());
  await Axios.get(baseUrl)
    .then(response => {
      dispatch({
        payload: response.data,
        type: EActionTypes.GET_USERS
      });
    })
    .catch(error =>
      dispatch({
        payload: null,
        type: EActionTypes.GET_ERRORS
      })
    );
};

export const getUser = async (id: number, dispatch: Dispatch<any>) => {
  dispatch(setUsersLoading());
  await Axios.get(baseUrl + `${id}`)
    .then(response => {
      dispatch({
        payload: response.data,
        type: EActionTypes.GET_USER
      });
    })
    .catch(error =>
      dispatch({
        payload: null,
        type: EActionTypes.GET_ERRORS
      })
    );
};

// set loading state
export const setUsersLoading = () => {
  return {
    type: EActionTypes.USERS_LOADING
  };
};
