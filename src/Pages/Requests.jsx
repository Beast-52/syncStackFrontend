import React, { useState, useEffect } from "react";
import { BASE_URL } from "../utils/constants";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ConnectionCard from "../components/Cards.jsx/ConnectionCard";
import { addRequest, removeRequest } from "../utils/redux/RequestSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const [requests, setRequests] = useState([]);
  const [err, setErr] = useState(null);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(BASE_URL + "user/requests/received", {
        withCredentials: true,
      });
      setRequests(response.data.requests);
      dispatch(addRequest(response.data));
    } catch (error) {
      console.error(error);
      setErr(error);
    }
  };
  useEffect(() => {
    fetchRequests();
    return () => {
      dispatch(removeRequest());
    };
  }, []);
  if (err) return <div>Error: {err.message}</div>;
  return (
    <div>
      <div className="min-h-[73vh] flex items-center justify-center flex-col gap-3">
        {requests?.map((user, idx) => (
          <ConnectionCard key={user._id} {...user} idx={idx} btns />
        ))}
      </div>
    </div>
  );
};

export default Connections;
