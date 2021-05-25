import Axios from "../../Axios";

// export const authSuccess = (tokenId, googleId) => {
//   return {
//     type: "AUTH_SUCCESS",
//     payload: { tokenId, googleId },
//   };
// };

// export const logout = () => {
//   return {
//     type: "AUTH_LOGOUT",
//   };
// };

// export const checkAuthTimeout = (expirationTime) => (dispatch) => {
//   return setTimeout(() => dispatch(logout()), expirationTime * 1000);
// };

// // POST GOOGLE_ID TO SERVER
// // export const postTodoStart = () => {
// //   return {
// //     type: "POST_TODO_START",
// //   };
// // };

// LOGIN USER WITH GOOGLE
export const loginGoogle = (token, history) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  // Request body
  const body = JSON.stringify({ token });

  Axios.post("/auth/google", body, config)
    .then((res) => {
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      history.push(`/todos/${res.data.user.id}`);
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({ type: "LOGIN_FAIL" });
    });
};

// // GOOGLE LOGIN SAVE TO
// export const authGoogle = (result, token) => {
//   return { type: "AUTH_GOOGLE", payload: { result, token } };
// };

//RETURN ERRORS
export const returnErrors = (msg, status, id = null) => {
  return { type: "GET_ERRORS", payload: { msg, status, id } };
};

//CLEAR ERRORS
export const clearErrors = () => {
  return { type: "CLEAR_ERRORS" };
};

//CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
  //User Loading
  dispatch({ type: "USER_LOADING" });
  Axios.get("/auth/user", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: "USER_LOADED",
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: "AUTH_ERROR" });
    });
};

// REGISTER
export const register = ({ name, email, password }, history) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  // Request body
  const body = JSON.stringify({ name, email, password });

  Axios.post("/user", body, config)
    .then((res) => {
      dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
      history.push(`/todos/${res.data.user.id}`);
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({ type: "REGISTER_FAIL" });
    });
};

// Login User
export const login = ({ email, password, history }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  // Request body
  const body = JSON.stringify({ email, password });

  Axios.post("/auth", body, config)
    .then((res) => {
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      history.push(`/todos/${res.data.user.id}`);
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({ type: "LOGIN_FAIL" });
    });
};

// LOGOUT
export const logout = () => {
  return { type: "LOGOUT_SUCCESS" };
};

// HELPER FUNCTION SETUP CONFIG HEADERS AND TOKEN
export const tokenConfig = (getState) => {
  //Get token from state
  const token = getState().auth.token;

  //Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token exist add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
};
