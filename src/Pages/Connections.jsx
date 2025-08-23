import React, { useState, useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import {
  addConnections,
  removeConnections,
} from "../utils/redux/ConnectionSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ConnectionCard from "../components/Cards.jsx/ConnectionCard";

const Connections = () => {
  const dispatch = useDispatch();
  const [connections, setConnections] = useState([]);
  const [err, setErr] = useState(null);

  const fetchConnections = async () => {
    try {
      const response = await axios.get(BASE_URL + "user/connections", {
        withCredentials: true,
      });
      setConnections(response.data.connections);
      dispatch(addConnections(response.data));
    } catch (error) {
      console.error(error);
      setErr(error);
    }
  };
  useEffect(() => {
    fetchConnections();
    return () => {
      dispatch(removeConnections());
    };
  }, []);
  if (err) return <div>Error: {err.message}</div>;
  return (
    <div>
      <div className="min-h-[73vh] flex items-center justify-center flex-col gap-3">
        {connections?.map((user, idx) => (
          <ConnectionCard key={user._id} {...user} idx={idx}  />
        ))}
       
      </div>
    </div>
  );
};

export default Connections;
