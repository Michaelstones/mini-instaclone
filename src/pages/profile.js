import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserByUsername } from "../services/firebase";
import * as ROUTES from "../constants/route";
import Header from "../components/Header";
import UserProfile from "../components/profile";

export default function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [userExist, setUserExist] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkUserExists() {
      const user = await getUserByUsername(username);
      if (user) {
        setUser(user[0]);
        setUserExist(true);
      } else {
        navigate(ROUTES.NOT_FOUND);
      }
    }

    checkUserExists();
  }, [username, navigate]);

  return userExist ? (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <UserProfile user={user} />
      </div>
    </div>
  ) : null;
}
