import { Link } from "react-router-dom";
import { useContext } from "react";
import FirebaseContext from "../contexts/firebase";
import UserContext from "../contexts/User";
import * as ROUTES from "../constants/route";
const Header = () => {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  return (
    <header className="bg-white border-b border-gray-primary mb-8 h-16">
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full">
          <div className="flex items-center text-center text-gray-700 align-items cursor-pointer">
            <h1 className="flex justify-center w-full">
              <Link to={ROUTES.DASHBOARD}>
                <img
                  src="/images/logo.png"
                  alt="instagram"
                  aria-label="instagram logo"
                  className="mt-2 w-6/12"
                />
              </Link>
            </h1>
          </div>
          <div className="flex items-center text-center text-gray-700 align-items ">
            {user ? (
              <>
                <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 cursor-pointer mr-6 text-black-light w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </Link>
                <button
                  type="button"
                  title="sign out"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      firebase.auth().signOut();
                    }
                  }}
                  onClick={() => firebase.auth().signOut()}
                >
                  <svg
                    className="w-8 mr-6 text-black-light cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
                <div className="flex items-center cursor-pointer">
                  <Link to={`/p/${user.displayName}`}>
                    <img
                      className="flex rounded-full h-8 w-8 flex"
                      src={`/images/avatars/orwell.jpg`}
                      alt={`${user.displayName} profile`}
                    />
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}>
                  <button
                    type="button"
                    className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                  >
                    Log in
                  </button>
                </Link>
                <Link to={ROUTES.SIGN_UP}>
                  <button
                    type="button"
                    className="text-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                  >
                    Sign up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
