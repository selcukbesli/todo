const initialState = {
  tokenId: null,
  googleId: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH_SUCCESS":
      return {
        ...state,
        tokenId: action.payload.tokenId,
        googleId: action.payload.googleId,
      };
    case "AUTH_LOGOUT":
      return { ...state, tokenId: null, googleId: null };
    default:
      return state;
  }
};

export default reducer;
