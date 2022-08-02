import { useState, useEffect, useContext } from "react";
import { getUserByUserId } from "../services/firebase";
import UserContext from "../contexts/User";

export default function useUser(userId) {
  const [activeUser, setActiveUser] = useState({});
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function getUserObjByUserId() {
      const [resp] = await getUserByUserId(user.uid);

      setActiveUser(resp);
    }

    if (user?.uid) {
      getUserObjByUserId();
    }
  }, [user]);

  return { user: activeUser, setActiveUser };
}
