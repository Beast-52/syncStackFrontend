import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../utils/redux/userSlice";
import { BASE_URL } from "../../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("elonmusk12@gmail.com");
  const [password, setPassword] = useState("Elon@123");
  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        BASE_URL + "auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(login(result.data));
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      setErr(error);
    }
  };

  return (
    <div className="h-[77vh] flex items-center justify-center">
      <form
        className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 "
        onSubmit={handleSubmit}
      >
        <h3 className="text-2xl text-center font-semibold ">Login</h3>

        <label className="label text-lg">Email</label>
        <input
          type="email"
          className="input"
          value={email}
          onChange={handleEmailChange}
        />

        <label className="label text-lg">Password</label>
        <input
          type="password"
          className="input"
          value={password}
          onChange={handlePasswordChange}
        />
        {err && <p className="text-red-500">{err?.response.data}</p>}
        <button className="btn btn-neutral mt-4">Login</button>
      </form>
    </div>
  );
};

export default Login;
