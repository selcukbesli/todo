import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/actions/auth";

const Logout = () => {
  const dispatch = useDispatch();

  return (
    <>
      <h5 onClick={() => dispatch(logout())}>Logout</h5>
    </>
  );
};

export default Logout;
