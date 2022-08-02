import { useContext, useState, useEffect } from "react";

import userContext from "../contexts/User";

import { getPhotos, getUserByUserId } from "../services/firebase";
const usePhoto = () => {
  const [photos, setPhotos] = useState(null);

  const {
    user: { uid: userId = "" },
  } = useContext(userContext);

  useEffect(() => {
    async function getTimeLinePhotos() {
      const [{ following }] = await getUserByUserId(userId);
      // console.log(following);
      let followedUserPhoto = [];
      if (following.length > 0) {
        followedUserPhoto = await getPhotos(userId, following);
      }
      followedUserPhoto.sort((a, b) => b.dateCreated - a.dateCreated);
      setPhotos(followedUserPhoto);
    }

    getTimeLinePhotos();
  }, [userId]);
  // console.log(photos);
  return { photos };
};

export default usePhoto;
