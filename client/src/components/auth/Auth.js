import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, login, loginGoogle } from "../../store/actions/auth";
import { GoogleLogin } from "react-google-login";
import { useHistory } from "react-router-dom";
import "./Auth.css";

const Auth = () => {
  const [state, setState] = useState({ name: "", email: "", password: "" });
  const [isSignUp, setIsSignUp] = useState(false);

  const { id, msg } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const history = useHistory();

  const onChangeHandler = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    isSignUp
      ? dispatch(register(state, history))
      : dispatch(
          login({ email: state.email, password: state.password, history })
        );
    setState({ name: "", email: "", password: "" });
  };

  // GOOGLE LOGIN
  const googleLoginSuccess = (res) => {
    const token = res?.tokenId;
    dispatch(loginGoogle(token, history));
  };

  const googleLoginFailure = (err) => {
    console.log(err);
  };

  return (
    <>
      <div className="container-fluid box ">
        <form onSubmit={onSubmitHandler}>
          <div className="row mx-0">
            <div className="col-md-6 px-0">
              <button
                className={!isSignUp ? "active" : ""}
                onClick={(event) => {
                  event.preventDefault();
                  setIsSignUp(false);
                }}
              >
                Sign In
              </button>
            </div>
            <div className="col-md-6 px-0">
              <button
                className={isSignUp ? "active" : ""}
                onClick={(event) => {
                  event.preventDefault();
                  setIsSignUp(true);
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
          {isSignUp && (
            <input
              type="name"
              value={state.name}
              name="name"
              placeholder="Name"
              onChange={onChangeHandler}
            />
          )}
          <input
            type="email"
            value={state.email}
            name="email"
            placeholder="Email"
            onChange={onChangeHandler}
          />
          <input
            type="password"
            value={state.password}
            name="password"
            placeholder="Password"
            onChange={onChangeHandler}
          />
          <input type="submit" name="submit" />
          {!isSignUp && (
            <div>
              <h6>or Sign In with</h6>
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText=""
                onSuccess={googleLoginSuccess}
                onFailure={googleLoginFailure}
                cookiePolicy={"single_host_origin"}
                className="google"
              />
            </div>
          )}
        </form>
      </div>
      {id && (
        <div className="container">
          <div className="alert alert-danger" role="alert">
            {msg.msg}
          </div>
        </div>
      )}
    </>
  );
};

export default Auth;
