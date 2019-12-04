import Axios from "axios";
import { isEmpty } from "./isEmpty";

const setAuthToken = (token: string) => {
  if (!isEmpty(token))
    Axios.defaults.headers.common.Authorization = "Bearer " + token;
  else delete Axios.defaults.headers.Authorization;
};

export default setAuthToken;
