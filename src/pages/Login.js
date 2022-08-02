import React, { useContext, useState, useReducer, useEffect } from "react";
import FirebaseContext from "../contexts/firebase";
import { useNavigate, Link } from "react-router-dom";
import * as ROUTES from "../constants/route";

const initialState = {
  email: "",
  password: "",
  isLoading: false,
  error: "",
  isLoggedIn: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "field": {
      return {
        ...state,
        [action.fieldName]: action.payload,
      };
    }
    case "login": {
      return {
        ...state,
        error: "",
        isLoading: true,
      };
    }
    case "success": {
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
      };
    }
    case "error": {
      return {
        ...state,
        error: "Incorrect email or password!",
        isLoggedIn: false,
        isLoading: false,
        email: "",
        password: "",
      };
    }
    case "logOut": {
      return {
        ...state,
        isLoggedIn: false,
      };
    }
    default:
      return state;
  }
};
const Login = () => {
  const { firebase } = useContext(FirebaseContext);
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { error, isLoading, isLoggedIn, email, password } = state;
  useEffect(() => {
    document.title = "Login- Instagram";
  }, []);
  const handleSignUp = async (e) => {
    e.preventDefault();
    dispatch({ type: "login" });
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      navigate(ROUTES.DASHBOARD);
      dispatch({ type: "success" });
    } catch (error) {
      dispatch({ type: "error" });
    }
  };
  const isValid = password === "" || email === "";
  return (
    <div className="container flex items-center h-screen mx-auto max-w-md">
      <div className="w-3/5 flex">
        <img src="/images/iphone-with-profile.jpg" alt="iphone" />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center rounded mb-4 p-4 bg-white border border-gray-primary ">
          <h1 className="flex justify-center w-full">
            <img
              src="/images/logo.png"
              alt="Instagram"
              className="mt-2 w-6/12 mb-4"
            />{" "}
          </h1>

          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
          <form onSubmit={handleSignUp} type="POST">
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email address"
              autoComplete="false"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              value={email || ""}
              onChange={(e) =>
                dispatch({
                  type: "field",
                  fieldName: "email",
                  payload: e.currentTarget.value,
                })
              }
            />
            <input
              aria-label="Enter your email Address"
              placeholder="Email Password"
              type="password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              value={password || ""}
              onChange={(e) =>
                dispatch({
                  type: "field",
                  fieldName: "password",
                  payload: e.currentTarget.value,
                })
              }
            />
            <button
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold
                ${isValid && "opacity-50"}`}
              disabled={isValid}
            >
              Log In
            </button>
          </form>
        </div>
        <div className="flex rounded flex-col justify-center items-center w-full bg-white p-4 border border-gray-primary-">
          <p className="text-sm">
            Don't have an account? {``}
            <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
