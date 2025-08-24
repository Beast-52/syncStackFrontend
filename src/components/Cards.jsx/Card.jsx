import { Check, Cross, X } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFeedUser } from "../../utils/redux/FeedSlice";
import axios from "axios";
import {BASE_URL} from "../../utils/constants";
import { toast } from "react-toastify";
const Card = ({
  firstName,
  lastName,
  age,
  gender,
  skill,
  about,
  photoUrl,
  idx,
  className,
  btn,
  id,
}) => {
  const dispatch = useDispatch()
  const [btnState, setBtnState] = useState([
    {
      title: <Check />,
      onClick: async (id) => {
        try {
          await axios.post(
            BASE_URL + `connection/send/smash/${id}`,
            {},
            { withCredentials: true }
          );
          dispatch(removeFeedUser(id));
          toast.success("Intrested in User!");
        } catch (error) {
          console.error(error);
        }
      },
    },
    {
      title: <X />,
      onClick: async (id) => {
        try {
          await axios.post(
            BASE_URL + `connection/send/pass/${id}`,
            {},
            { withCredentials: true }
          );
          dispatch(removeFeedUser(id));
          toast.success("Ignored the User!");
        } catch (error) {
          console.error(error);
        }
      },
    },
  ]);

  return (
    <div
      style={{
        rotate: idx * -5 + "deg",
      }}
      className={`card bg-base-100 w-1/8 h-96 shadow-sm transition-all ${
        className && className
      } rounded-lg overflow-hidden scale-125 `}
    >
      <img
        src={photoUrl}
        alt="Shoes"
        className="absolute z-10 h-full w-full object-cover mix-blend-difference brightness-75"
      />

      <div className="card-body z-20">
        <h2 className="card-title">
          {firstName} {lastName}
          {age && gender ? (
            <div className="badge badge-primary">{age + ", " + gender}</div>
          ) : null}
        </h2>
        <p className="text-justify">{about}</p>
        <div className="card-actions justify-end">
          {skill?.length > 0
            ? skill.map((skill) => (
                <div className="badge badge-outline">{skill}</div>
              ))
            : null}
        </div>
        <div className="flex justify-between">
          {btn &&
            btnState.map((btn, idx) => (
              <button
                className="btn btn-accent"
                key={idx}
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

export default Card;
