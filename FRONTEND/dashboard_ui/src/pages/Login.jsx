import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        // Save tokens and user info in localStorage
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        localStorage.setItem("firstName", data.user.first_name);
        localStorage.setItem("lastName", data.user.last_name);
        localStorage.setItem("username", data.user.username);
        localStorage.setItem("role", data.user.role || "");
        localStorage.setItem("subrole", data.user.subrole || "");

        toast.success("Login successful! Redirecting...", { autoClose: 2000 });

        setTimeout(() => navigate("/landing"), 2000);
      } else {
        toast.error(data.error || "Login failed", { autoClose: 3000 });
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Something went wrong!", { autoClose: 3000 });
    }
  };

  const particlesInit = async (main) => await loadFull(main);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      {/* Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute inset-0 -z-10"
        options={{
          background: { color: "#111827" },
          fpsLimit: 60,
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" }, onClick: { enable: true, mode: "push" } },
            modes: { repulse: { distance: 100 }, push: { quantity: 4 } },
          },
          particles: {
            color: { value: "#ff0000" },
            links: { enable: true, color: "#ff0000", distance: 150 },
            move: { enable: true, speed: 2 },
            number: { value: 60 },
            opacity: { value: 0.7 },
            size: { value: { min: 1, max: 4 } },
          },
        }}
      />

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md text-white z-10"
      >
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl font-bold text-red-500 text-center mb-6"
        >
          Login
        </motion.h1>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <motion.input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            whileFocus={{ scale: 1.02, boxShadow: "0 0 8px rgba(255,0,0,0.5)" }}
            className="p-3 border border-gray-700 rounded-md bg-gray-900 text-white focus:outline-none"
            required
          />
          <motion.input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            whileFocus={{ scale: 1.02, boxShadow: "0 0 8px rgba(255,0,0,0.5)" }}
            className="p-3 border border-gray-700 rounded-md bg-gray-900 text-white focus:outline-none"
            required
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-md font-semibold transition"
          >
            Sign In
          </motion.button>

          <p className="text-sm text-center mt-2">
            Don't have an account?{" "}
            <span
              className="text-red-500 cursor-pointer hover:underline"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Login;
