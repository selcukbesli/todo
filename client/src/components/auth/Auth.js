import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, login, loginGoogle } from "../../store/actions/auth";
import { GoogleLogin } from "react-google-login";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./Auth.css";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const { id, msg } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const history = useHistory();

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
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                values.email
              )
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.password) {
              errors.password = "Required";
            } else if (values.password.length < 8) {
              errors.password = "at least 8 char.";
            }
            if (isSignUp & !values.name) {
              errors.name = "Required";
            } else if (isSignUp & (values.name.length < 3)) {
              errors.name = "at least 3 char";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            isSignUp
              ? dispatch(register(values, history))
              : dispatch(
                  login({
                    email: values.email,
                    password: values.password,
                    history,
                  })
                );
            setSubmitting(false);
          }}
        >
          {({ errors }) => (
            <Form>
              <div className="row mx-0">
                <div className="col px-0">
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
                <div className="col px-0">
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
                <div>
                  <Field type="name" name="name" placeholder="Name" />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="ErrorMessage"
                  />
                </div>
              )}
              <Field type="email" name="email" placeholder="Email" />
              <ErrorMessage
                name="email"
                component="div"
                className="ErrorMessage"
              />
              <Field type="password" name="password" placeholder="Password" />
              <ErrorMessage
                name="password"
                component="div"
                className="ErrorMessage"
              />
              <button
                type="submit"
                name="submit"
                disabled={
                  isSignUp
                    ? errors?.email || errors?.password || errors?.name
                    : errors?.email || errors?.password
                }
              >
                {!isSignUp ? "Sign In" : "Sign Up"}
              </button>
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
            </Form>
          )}
        </Formik>
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
