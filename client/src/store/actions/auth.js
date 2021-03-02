import Axios from "../../Axios";

export const authSuccess = (tokenId, googleId) => {
  return {
    type: "AUTH_SUCCESS",
    payload: { tokenId, googleId },
  };
};

export const logout = () => {
  return {
    type: "AUTH_LOGOUT",
  };
};

export const checkAuthTimeout = (expirationTime) => (dispatch) => {
  return setTimeout(() => dispatch(logout()), expirationTime * 1000);
};

// POST GOOGLE_ID TO SERVER
// export const postTodoStart = () => {
//   return {
//     type: "POST_TODO_START",
//   };
// };

export const postLoginData = (token) => (dispatch) => {
  // dispatch(postTodoStart());
  Axios.post("/user", { token });
  // .then((response) => {
  //   dispatch({ type: "POST_TODO_SUCCESS", payload: response.data });
  // })
  // .catch((error) => {
  //   dispatch({ type: "POST_TODO_FAIL", payload: error.message });
  // });
};
