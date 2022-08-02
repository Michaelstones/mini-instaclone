import { firebase, FieldValue } from "../lib/firebase";

export async function doesUsernameExist(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username.toLowerCase())
    .get();

  return result.docs.length > 0;
}

export async function getUserByUsername(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username.toLowerCase())
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
}

export async function getUserByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", userId)
    .get();
  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
  return user;
}
export async function getSuggestedProfile(userId, following) {
  let result = await firebase.firestore().collection("users").limit(10).get();

  return result.docs
    .map((user) => ({ ...user.data(), docId: user.id }))
    .filter((profile) => {
      return profile.userId !== userId && !following.includes(profile.userId);
    });
}

export async function updateLoggedInUserFollower(
  loggedInUserDocId,
  profileId,
  isFollowing
) {
  return await firebase
    .firestore()
    .collection("users")
    .doc(loggedInUserDocId)
    .update({
      following: isFollowing
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId),
    });
}

export async function updateFolloweUserFollower(
  profileDocId,
  loggedInUserDocId,
  isFollowing
) {
  return await firebase
    .firestore()
    .collection("users")
    .doc(profileDocId)
    .update({
      followers: isFollowing
        ? FieldValue.arrayRemove(loggedInUserDocId)
        : FieldValue.arrayUnion(loggedInUserDocId),
    });
}

export async function getPhotos(userId, following) {
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "in", following)
    .get();
  const userFollowedPhoto = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));

  const photoWithUserDetails = await Promise.all(
    userFollowedPhoto.map(async (photo) => {
      let userLikedphoto = false;
      if (photo.likes.includes(userId)) {
        userLikedphoto = true;
      }
      const user = await getUserByUserId(photo.userId);
      const { username } = user;
      return { username, userLikedphoto, ...photo };
    })
  );
  return photoWithUserDetails;
}

export async function getUserPhotosByUserId(username) {
  const [user] = await getUserByUsername(username);
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "==", user.userId)
    .get();

  return result.docs.map((item) => ({ ...item.data(), docId: item.id }));
}

export async function isUserFollowingProfile(loggedInUsername, profileUserId) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", loggedInUsername)
    .where("following", "array-contains", profileUserId)
    .get();
  const [response = {}] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
  return response;
}

export async function toggleFollow(
  isFollowingProfile,
  activeUserDocId,
  profileDocId,
  profileUserId,
  followingUserId
) {
  // 1st param: karl's doc id
  // 2nd param: raphael's user id
  // 3rd param: is the user following this profile? e.g. does karl follow raphael? (true/false)
  await updateLoggedInUserFollower(
    activeUserDocId,
    profileUserId,
    isFollowingProfile
  );

  // 1st param: karl's user id
  // 2nd param: raphael's doc id
  // 3rd param: is the user following this profile? e.g. does karl follow raphael? (true/false)
  await updateFolloweUserFollower(
    profileDocId,
    followingUserId,
    isFollowingProfile
  );
}
