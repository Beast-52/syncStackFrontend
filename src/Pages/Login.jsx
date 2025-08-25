import React from "react";
import { Auth } from "../components/Forms/Auth";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { toast } from "react-toastify";
import { login } from "../utils/redux/userSlice";
const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({});
  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(BASE_URL + "auth/signup", formData, {
        withCredentials: true,
      });
      dispatch(login(result.data));
      toast.success("Signup successful!");
      setIsLogin(true);
    
    } catch (error) {
      console.error("Signup failed:", error);
      setErr(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(BASE_URL + "auth/login", formData, {
        withCredentials: true,
      });
      dispatch(login(result.data));
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      setErr(error);
    }
  };
  return (
    <div className="min-h-[73vh] flex items-center justify-center">
      <Auth
        setIsLogin={setIsLogin}
        isLogin={isLogin}
        formData={formData}
        setFormData={setFormData}
        err={err}
        setErr={setErr}
        handleInputChange={handleInputChange}
        handleSubmit={isLogin ? handleSubmit : handleSignUpSubmit}
        fields={
          isLogin
            ? [
                { label: "Email", name: "email", type: "email" },
                { label: "Password", name: "password", type: "password" },
              ]
            : [
                { label: "First Name", name: "firstName", type: "text" },
                { label: "Last Name", name: "lastName", type: "text" },
                { label: "Email", name: "email", type: "email" },
                { label: "Password", name: "password", type: "password" },
              ]
        }
      />
    </div>
  );
};

export default LoginPage;
