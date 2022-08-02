import React, { useContext, useState, useReducer, useEffect } from "react";
import FirebaseContext from "../contexts/firebase";
import { useNavigate, Link } from "react-router-dom";
import * as ROUTES from "../constants/route";
import { doesUsernameExist } from "../services/firebase";

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
        error: action.payload,
        isLoggedIn: false,
        isLoading: false,
        email: "",
        password: "",
        fullname: "",
        username: "",
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
  const [la, setLa] = useState("");
  const { firebase } = useContext(FirebaseContext);
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { error, isLoading, isLoggedIn, email, password, username, fullname } =
    state;

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "login" });
    const userExist = await doesUsernameExist(username);

    if (!userExist) {
      try {
        // create user
        const createUser = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        //   authenticate user
        await createUser.user.updateProfile({
          displayName: username,
        });
        //   send to firestore DB
        await firebase.firestore().collection("users").add({
          userId: createUser.user.uid,
          fullname,
          username: username.toLowerCase(),
          email: email.toLowerCase(),
          following: [],
          dateCreated: Date.now(),
        });
        navigate(ROUTES.DASHBOARD);
        dispatch({ type: "success" });
      } catch (error) {
        dispatch({ type: "error", payload: error.message });
      }
    } else {
      console.log("already exist");
    }
  };
  useEffect(() => {
    document.title = "Sign Up Instagram";
  }, []);
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
            />
          </h1>

          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
          <form onSubmit={handleLogin} type="POST">
            <input
              aria-label="Enter your username"
              type="text"
              placeholder="Enter  username"
              autoComplete="false"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              value={username || ""}
              onChange={(e) =>
                dispatch({
                  type: "field",
                  fieldName: "username",
                  payload: e.currentTarget.value,
                })
              }
            />
            <input
              aria-label="Enter Full name"
              type="text"
              autoComplete="false"
              placeholder="Enter full name"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              value={fullname || ""}
              onChange={(e) =>
                dispatch({
                  type: "field",
                  fieldName: "fullname",
                  payload: e.currentTarget.value,
                })
              }
            />
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email address"
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
              placeholder="Enter Password"
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
            Have an account? {``}
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
