import React from "react";
import ProfileEdit from "../components/Forms/EditProfile";
import Card from "../components/Cards.jsx/Card";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
const Profile = () => {
  const user = useSelector((store) => store.user.user);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (user != null) {
      setData({
        firstName: user?.firstName,
        lastName: user?.lastName,
        photoUrl: user?.photoUrl,
        skill: user?.skills || "",
        gender: user?.gender || "",
        age: user?.age || 13,
        about: user?.about,
      });
    }
  }, [user]);
  return (
    <div className="min-h-[73vh] flex items-center justify-evenly">
      <ProfileEdit data={data} setData={setData} />
      <Card {...data} />
    </div>
  );
};

export default Profile;
