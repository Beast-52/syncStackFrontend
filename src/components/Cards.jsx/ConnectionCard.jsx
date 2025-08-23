import React from "react";
import { Link } from "react-router-dom";

const ConnectionCard = ({
  className,
  btns,
  photoUrl,
  firstName,
  lastName,
  about,
  skill,
}) => {
  const [btnState, setBtnState] = React.useState([
    { title: "Accept", onClick: () => console.log("accepted") },
    { title: "Reject", onClick: () => console.log("rejected") },
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
                  idx == 0 ? "btn-secondary" : "btn-accent"
                } btn-md`}
                onClick={btn.onClick}
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
