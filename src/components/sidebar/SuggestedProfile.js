import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  updateFolloweUserFollower,
  updateLoggedInUserFollower,
} from "../../services/firebase";
const SuggestedProfile = (props) => {
  const { username, profileDocId, profileId, userId, loggedInUserDocId } =
    props;
  // console.log(props);

  const [following, setFollowed] = useState(false);

  async function handleFollowUser() {
    setFollowed(true);
    await updateLoggedInUserFollower(loggedInUserDocId, profileId, false);
    await updateFolloweUserFollower(profileDocId, userId, false);
  }
  return !following ? (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        <img
          src={`/images/avatars/${username}.jpg`}
          alt={username}
          className="rounded-full w-8 flex mr-2"
        />
        <Link to={`/p/${username}`} className="text-sm font-bold">
          {username}
        </Link>
      </div>
      <div>
        <button
          onClick={handleFollowUser}
          type="button"
          className="text-xs text-blue-medium font-bold"
        >
          follow
        </button>
      </div>
    </div>
  ) : null;
};

export default SuggestedProfile;

SuggestedProfile.propTypes = {
  profileDocId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  loggedInUserDocId: PropTypes.string.isRequired,
};
