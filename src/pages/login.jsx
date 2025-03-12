import { Link, useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { connection } from "../config/getConnection";

function Login() {
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");

  if (isAuthenticated) {
    return <Navigate to="/admin" />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const [logginIn, setLoggingIn] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoggingIn(true)
      const response = await axios.post(
        `${connection()}/api/login`,
        userDetails
      );
      localStorage.setItem("token", response.data.token);
      navigate("/admin");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoggingIn(false)
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded border border-gray-200 flex flex-col gap-4 w-full max-w-sm"
      >
        <h1 className="text-center text-2xl font-medium">
          Welcome Back Admin!
        </h1>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="text-xl">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={userDetails.username}
            onChange={handleChange}
            placeholder="Enter email"
            className="border border-gray-500 rounded pl-2 h-10"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-xl">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={userDetails.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="border border-gray-500 rounded pl-2 h-10"
          />
        </div>
        <button
          type="submit"
          className={`bg-slate-900 text-white py-1 rounded text-lg mt-2 ${logginIn && 'animate-pulse'}`}
          disabled={logginIn}
        >
          {logginIn ? 'Logging in...' : 'Login'}
        </button>
        <Link to="" className="hover:underline">
          Forgot password?
        </Link>
      </form>
    </div>
  );
}

export default Login;
