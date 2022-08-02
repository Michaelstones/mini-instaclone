import PropTypes from "prop-types";
import { memo } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const User = ({ fullname, username }) => {
  return !username || !fullname ? (
    <Skeleton count={1} height={61} />
  ) : (
    <Link
      className="grid  gap-4 mb-6 items-center w-full "
      to={`/p/${username}`}
    >
      <div className="flex items-center w-full h-full mr-3">
        {" "}
        <div className="flex items-center justify-between col-span-1">
          <img
            src={`/images/avatars/orwell.jpg` || `/p/avatars/${username}`}
            alt="user profile"
            className="rounded-full w-16 flex mr-3"
          />
        </div>
        <div className="col-span-4 flex flex-col ">
          <p className="font-bold text-sm mr-2">{username}</p>
          <p className=" text-sm">{fullname}</p>
        </div>
      </div>
    </Link>
  );
};

export default memo(User);

User.propTypes = {
  username: PropTypes.string,
  fullName: PropTypes.string,
};
