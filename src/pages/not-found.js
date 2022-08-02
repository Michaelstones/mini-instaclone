import React, { useEffect } from "react";
import Header from "../components/profile/header";

const NotFound = () => {
  useEffect(() => {
    document.title = "404- page not found";
  }, []);
  return (
    <div className="bg-gray-background ">
      <Header />
      <div className="mx-auto max-w-scree-lg  flex justify-center items-center max-h-screen ">
        <p className="text-center text-2xl"> Oops!! page not found!</p>
      </div>
    </div>
  );
};

export default NotFound;
