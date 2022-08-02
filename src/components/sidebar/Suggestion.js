import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Skeleton from "react-loading-skeleton";
import { getSuggestedProfile } from "../../services/firebase";
import SuggestedProfile from "./SuggestedProfile";

function Suggestions({ userId, following, loggedInUserDocId }) {
  const [profiles, setProfile] = useState();

  useEffect(() => {
    async function suggestedProfiles() {
      const response = await getSuggestedProfile(userId, following);
      // console.log(response);
      setProfile(response);
    }

    if (userId) {
      suggestedProfiles();
    }
  }, [userId]);

  return !profiles ? (
    <>
      <Skeleton count={1} height={150} className="" />
    </>
  ) : (
    <>
      {profiles.length > 0 ? (
        <div className="flex flex-col rounded w-full">
          <div className="flex items-center justify-between mb-2 text-sm">
            <p className=" font-bold text-gray-base">Suggestions for you</p>
          </div>
          <div className="mt-4 gap-5 grid">
            {profiles.map((profile) => (
              <SuggestedProfile
                key={profile.docId}
                profileDocId={profile.docId}
                username={profile.username}
                profileId={profile.userId}
                userId={userId}
                loggedInUserDocId={loggedInUserDocId}
              />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Suggestions;

Suggestions.propTypes = {
  userId: PropTypes.string,
  following: PropTypes.array,
  loggedInUserDocId: PropTypes.string,
};
