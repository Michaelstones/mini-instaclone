import { useRef, useContext } from "react";
import { PropTypes } from "prop-types";
import Header from "./Header";
import Image from "./Image";
import Actions from "./action";
import Footer from "./footer";
import Comments from "./comment";
import UserContext from "../../contexts/User";

const Post = ({ content, username }) => {
  // const { username, content } = props;
  const { user } = useContext(UserContext);
  // console.log(username);
  const {
    imageSrc,
    caption,
    docId,
    likes,
    userLikedPhoto,
    comments,
    dateCreated,
  } = content;
  const commentId = useRef(null);

  const handleFocus = () => commentId.current.focus();
  return (
    <div className="rounded bg-col-span-4 mb-8 border bg-white border-gray-primary">
      <Header
        username={username}
        user={user.displayName}
        imageSrc={imageSrc}
        caption={caption}
      />
      <Image src={imageSrc} />
      <Actions
        docId={docId}
        totalLikes={likes}
        likedPhoto={userLikedPhoto}
        handleFocus={handleFocus}
      />
      <Footer caption={caption} username={username} />
      <Comments
        comments={comments}
        docId={docId}
        commentId={commentId}
        posted={dateCreated}
      />
    </div>
  );
};

export default Post;

Post.propTypes = {
  content: PropTypes.shape({
    username: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    docId: PropTypes.string.isRequired,
    userLikedPhoto: PropTypes.bool.isRequired,
    likes: PropTypes.array.isRequired,
    comments: PropTypes.array.isRequired,
    dateCreated: PropTypes.number.isRequired,
  }),
};
