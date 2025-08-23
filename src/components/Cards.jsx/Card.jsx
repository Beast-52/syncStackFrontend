import React from "react";
import { useSelector } from "react-redux";

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
}) => {
  return (
    <div
      style={{
        rotate: idx * -5 + "deg",
      }}
      className={`card bg-base-100 w-1/8 h-96 shadow-sm ${
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
      </div>
    </div>
  );
};

export default Card;
