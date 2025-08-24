import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import { removeRequest } from "../../utils/redux/RequestSlice";
import axios from "axios";
import { toast } from "react-toastify";

const ConnectionCard = ({
  className,
  btns,
  photoUrl,
  firstName,
  lastName,
  about,
  skill,
  id,
}) => {
  console.log(id)
  const dispatch = useDispatch();
  const [btnState, setBtnState] = useState([
    {
      title: "Accept",
      onClick: async (id) => {
        try {
          await axios.post(
            BASE_URL + `connection/review/accepted/${id}`,
            {},
            { withCredentials: true }
          );
          dispatch(removeRequest(id));
          toast.success("Connection Request Accepted!");
        } catch (error) {
          console.error(error);
        }
      },
    },
    {
      title: "Reject",
      onClick: async (id) => {
        try {
          await axios.post(
            BASE_URL + `connection/review/rejected/${id}`,
            {},
            { withCredentials: true }
          );
          dispatch(removeRequest(id));
          toast.success("Connection Request Rejected!");
        } catch (error) {
          console.error(error);
        }
      },
    },
  ]);

  return (
    <div
      className={`card card-border bg-base-200 w-lg ${className && className} `}
    >
      <div className="card-body flex flex-row items-center justify-between">
        <div className="img w-20 h-20 rounded-full overflow-hidden">
          <img src={photoUrl} className="w-full h-full object-cover" alt="" />
        </div>
        <div className="heading flex flex-col gap-2">
          <h2 className="card-title shrink-0 leading-none">
            {firstName + " " + lastName}
          </h2>
          <p>{about}</p>
          <div className="flex flex-wrap gap-1">
            {skill?.map((skill, idx) => (
              <div
                class={`badge badge-secondary ${
                  btns ? "badge-xs" : "badge-md"
                }`}
                key={idx}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
        <div className=" flex  gap-2">
          {btns &&
            btnState.map((btn, idx) => (
              <button
                key={idx}
                className={`btn ${
                  idx === 0 ? "btn-secondary" : "btn-accent"
                } btn-md`}
                onClick={() => btn.onClick(id)}
              >
                {btn.title}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ConnectionCard;
