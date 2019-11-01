import axios from "axios";

import { GET_ERRORS } from "./types";

// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      window.alert("Welcome to SimpFleet Apps. you are logged.");
      window.location.href = "/";
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      if (err.response.data.isApproved) {
        window.alert(
          "Account not yet Approved. Please check your email or contact us."
        );
      }
    });
};

// Log user out
export const logoutUser = () => {
  axios.post("/api/users/logout").then(res => {
    window.location.href = "/";
  });
};
