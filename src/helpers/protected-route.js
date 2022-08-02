import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import * as ROUTES from "../constants/route";

function ProctedRoute({ user, children }) {
  if (!user) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return children;
}

export default ProctedRoute;

ProctedRoute.propTypes = {
  user: PropTypes.object,
  children: PropTypes.object.isRequired,
};

//  <Navigate
//               to={{
//                 pathname: ROUTES.LOGIN,
//                 state: { from: location },
//               }}
//             />
