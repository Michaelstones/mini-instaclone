import Skeleton from "react-loading-skeleton";
import usePhotos from "../hooks/usePhoto";
import Post from "./post";
import useUser from "./../hooks/useUser";

const Timeline = () => {
  const { photos } = usePhotos();
  const {
    user: { fullname, username, userId, following, docId },
  } = useUser();
  // console.log(username);
  return (
    <div className="container col-span-2">
      {!photos ? (
        <>
          {[...new Array(4)].map((_, i) => (
            <Skeleton
              key={i}
              count={1}
              width={320}
              height={400}
              className="mb-5"
            />
          ))}
        </>
      ) : photos?.length > 0 ? (
        photos
          .map((content) => (
            <Post key={content.docId} content={content} username={username} />
          ))
          .slice(0, 5)
      ) : (
        <p className="text-center text-2xl">follow people to see photos</p>
      )}
    </div>
  );
};

export default Timeline;
