import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Header = ({ username, imageSrc, user }) => {
  return (
    <div className="flex border-b border-gray-primary h-4 p-4 py-8">
      <div className="flex items-center">
        <Link to={`/p/${user}`} className="flex items-center">
          <img
            className="rounded-full h-8 w-8 flex mr-3"
            src={imageSrc}
            alt={`${user} profile`}
          />
          <p className="font-bold">{user}</p>
        </Link>
      </div>
    </div>
  );
};

export default Header;

Header.propTypes = {
  username: PropTypes.string.isRequired,
};
