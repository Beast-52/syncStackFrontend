import React, { useEffect, useState } from "react";
import Card from "../components/Cards.jsx/Card";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/redux/FeedSlice";

const Feed = () => {
  const feedUsers = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [err, setErr] = useState("");
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7777/user/feed?page=1&limit=10",
        {
          withCredentials: true,
        }
      );
      dispatch(addFeed(response.data));
    } catch (error) {
      console.error(error);
      setErr(error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="min-h-[73vh] flex items-center justify-center relative">
      {feedUsers?.feed
        ?.slice()

        .map((user, idx) => (
          <Card key={user._id} {...user} idx={idx} className="absolute" />
        ))
        .reverse()}
    </div>
  );
};

export default Feed;
