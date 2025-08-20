import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../utils/redux/userSlice";
import { BASE_URL } from "../utils/constants";
const Body = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const fetchUser = async () => {
    try {
      if (!user?.user) {
        const result = await axios.get(BASE_URL + "profile/view", {
          withCredentials: true,
        });

        dispatch(login(result.data));
      }
    } catch (error) {
      if ((error.status = 401)) {
        return navigate("/login");
      }
      console.error(error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
