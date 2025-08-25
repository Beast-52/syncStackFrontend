import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../utils/redux/userSlice";
import { BASE_URL } from "../../utils/constants";
import { toast } from "react-toastify";

export const Auth = ({
  fields,
  handleSubmit,
  handleInputChange,
  err,
  formData,
  isLogin,
  setIsLogin,
}) => {
  return (
    <form
      className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 "
      onSubmit={handleSubmit}
    >
      <h3 className="text-2xl text-center font-semibold ">
        {isLogin ? "Login " : "SignUp"}
      </h3>

      {fields.map((field) => (
        <React.Fragment key={field.name}>
          <label className="label text-lg">{field.label}</label>
          <input
            type={field.type}
            className="input"
            name={field.name}
            value={formData[field.name]}
            onChange={handleInputChange}
          />
        </React.Fragment>
      ))}
      {err && <p className="text-red-500">{err?.response.data}</p>}
      <div
        className="text-sm mt-2 cursor-pointer text-blue-500"
        onClick={() => {
          setIsLogin(!isLogin);
        }}
      >
        {isLogin
          ? "Don't have an account? Sign Up"
          : "Already have an account? Login"}
      </div>
      <button className="btn btn-neutral mt-4">Login</button>
    </form>
  );
};
