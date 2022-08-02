import { useEffect, useState, useContext } from "react";
import FirebaseContext from "../contexts/firebase";
const useAuthlistener = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );
  const { firebase } = useContext(FirebaseContext);
  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((authUser) => {
      // if user set it to ls
      if (authUser) {
        localStorage.setItem("authUser", JSON.stringify(authUser));
        setUser(authUser);
      } else {
        // if not user remove from ls
        localStorage.removeItem("authUser");
        setUser(null);
      }
    });
    return () => listener;
  }, [firebase]);
  return { user };
};

export default useAuthlistener;
