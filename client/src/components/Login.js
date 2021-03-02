import React from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import {
  authSuccess,
  checkAuthTimeout,
  logout,
  postLoginData,
} from "../store/actions/auth";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const tokenId = useSelector((state) => state.auth.tokenId);

  const isLoggedIn = Boolean(tokenId);

  const onSuccessGoogle = (response) => {
    console.log(response);
    dispatch(postLoginData(response.tokenId));
    dispatch(authSuccess(response.tokenId, response.googleId));
    dispatch(checkAuthTimeout(response.tokenObj.expires_in));
  };

  const onFailureGoogle = (res) => {
    console.log(res);
  };

  const logoutGoogle = () => {
    dispatch(logout());
  };

  return (
    <>
      <h1 style={{ color: "white" }}>{isLoggedIn ? "TRUE" : "FALSE"} </h1>
      {isLoggedIn ? (
        <GoogleLogout
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          // buttonText="Logout"
          onLogoutSuccess={logoutGoogle}
        ></GoogleLogout>
      ) : (
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Log in with Google"
          onSuccess={onSuccessGoogle}
          onFailure={onFailureGoogle}
          cookiePolicy={"single_host_origin"}
          // isSignedIn={true}
        />
      )}
    </>
  );
};

export default Login;
