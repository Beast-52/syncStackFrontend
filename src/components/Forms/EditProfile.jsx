import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../utils/redux/userSlice";
import { BASE_URL } from "../../utils/constants";
import { toast } from "react-toastify";

// Input fields config
const fields = [
  { label: "firstname", type: "input", state: "firstName" },
  { label: "lastname", type: "input", state: "lastName" },
  { label: "photoUrl", type: "url", state: "photoUrl" },
  { label: "skills", type: "input", state: "skill" }, // fix: keep it "skill"
  { label: "gender", type: "input", state: "gender" },
  { label: "age", type: "number", state: "age" },
];

// Gender options
const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "prefer_not", label: "Prefer not to say" },
];

// Skills input component
export const SkillsInput = ({ prevSkills, setData }) => {
  const [skills, setSkills] = useState(() =>
    prevSkills ? [...prevSkills] : []
  );
  const [inputValue, setInputValue] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    setData((prev) => ({ ...prev, skill: skills }));
  }, [skills, setData]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      if (skills.length < 5 && !skills.includes(inputValue)) {
        setSkills((prevSkills) => [...prevSkills, inputValue]);
        setInputValue("");
        setErr("");
      } else if (skills.includes(inputValue)) {
        setErr("You can't add the same skill twice!");
      } else {
        setErr("You can't add more than 5 skills!");
      }
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills((prevSkills) =>
      prevSkills.filter((skill) => skill !== skillToRemove)
    );
  };

  return (
    <div className="w-full max-w-md">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Skills: Type and Press Enter"
        className="input"
      />
      {err && <p className="text-red-600 text-sm">{err}</p>}
      <div className="flex flex-wrap my-4">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="bg-neutral text-white px-3 py-1 rounded-full flex items-center gap-2"
          >
            {skill}
            <button
              onClick={() => removeSkill(skill)}
              className="text-xs font-bold"
            >
              ✕
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

// Main profile edit form
const ProfileEdit = ({ data, setData }) => {
  const user = useSelector((store) => store.user.user);
  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(data);

      const response = await axios.patch(`${BASE_URL}profile/edit`, data, {
        withCredentials: true,
      });
      dispatch(
        login({
          user: response.data.updatedUser,
        })
      );
      navigate("/profile");
      setErr("");
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      setErr(error);
    }
  };

  return (
    data != null && (
      <div className="h-[77vh] flex items-center justify-center">
        <form
          className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 "
          onSubmit={handleSubmit}
        >
          <h3 className="text-2xl text-center font-semibold ">Edit Profile</h3>

          {fields.map(({ label, type, state }) => (
            <div key={state}>
              {label === "skills" ? (
                <SkillsInput prevSkills={user?.skill} setData={setData} />
              ) : label === "gender" ? (
                <select
                  className="select"
                  name={state}
                  onChange={handleChange}
                  value={data[state] || ""}
                >
                  <option value="" disabled>
                    Pick a gender
                  </option>
                  {genderOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  placeholder={label}
                  type={type}
                  className="input"
                  name={state}
                  value={data[state] || ""}
                  onChange={handleChange}
                />
              )}
            </div>
          ))}

          <textarea
            name="about"
            className="textarea h-24"
            placeholder="Bio"
            value={data?.about || ""}
            onChange={handleChange}
          />

          {err && <p className="text-red-500">{err?.response?.data}</p>}
          <button className="btn btn-neutral mt-4">Save</button>
        </form>
      </div>
    )
  );
};

export default ProfileEdit;
