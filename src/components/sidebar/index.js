import useUser from "../../hooks/useUser";
import User from "./User";
import Suggestions from "./Suggestion";

const Sidebar = () => {
  const {
    user: { fullname, username, userId, following, docId },
  } = useUser();

  // console.log(username, userId, following);

  return (
    <div className="p-4  w-3/12 ">
      <User fullname={fullname} username={username} />
      <Suggestions
        userId={userId}
        following={following}
        loggedInUserDocId={docId}
      />
    </div>
  );
};

export default Sidebar;
