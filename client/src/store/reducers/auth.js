const initialState = {
  googleId: null,
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: null,
  msg: {},
  status: null,
  id: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    //GOOGLE
    // case "AUTH_GOOGLE":
    //   console.log(action.payload);
    //   localStorage.setItem("token", action.payload.token);
    //   return {
    //     ...state,
    //     user: {
    //       ...state.user,
    //       email: action.payload.result.email,
    //       name: action.payload.result.name,
    //       id: action.payload.result.googleId,
    //     },
    //     isAuthenticated: true,
    //     isLoading: false,
    //   };
    // case "AUTH_SUCCESS":
    //   return {
    //     ...state,
    //     tokenId: action.payload.tokenId,
    //     googleId: action.payload.googleId,
    //   };
    // case "AUTH_LOGOUT":
    //   return { ...state, tokenId: null, googleId: null };
    // JWT
    case "GET_ERRORS":
      return {
        ...state,
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id,
      };
    case "CLEAR_ERRORS":
      return {
        ...state,
        msg: {},
        status: null,
        id: null,
      };
    case "USER_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "USER_LOADED":
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      console.log(action.payload);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case "AUTH_ERROR":
    case "LOGIN_FAIL":
    case "LOGOUT_SUCCESS":
    case "REGISTER_FAIL":
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;

/*
USER_LOADING
USER_LOADED
AUTH_ERROR
LOGIN_SUCCESS
LOGIN_FAIL
LOGOUT_SUCCESS
REGISTER_SUCCESS
REGISTER_FAIL

GET_ERRORS
CLEAR_ERRORS
*/
