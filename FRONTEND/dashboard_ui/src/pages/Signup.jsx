import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    roleId: "",      // store Role ID
    subroleId: "",   // store SubRole ID
    requestAccess: false,
  });

  const [roles, setRoles] = useState([]);
  const [subroles, setSubroles] = useState([]);

  // Fetch roles and subroles from backend
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/users/roles/")
      .then((res) => res.json())
      .then((data) => setRoles(data))
      .catch((err) => toast.error("Error fetching roles"));

    fetch("http://127.0.0.1:8000/api/users/subroles/")
      .then((res) => res.json())
      .then((data) => setSubroles(data))
      .catch((err) => toast.error("Error fetching subroles"));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let updatedForm = { ...form, [name]: type === "checkbox" ? checked : value };

    if (name === "roleId") updatedForm.subroleId = ""; // reset subrole if role changes

    setForm(updatedForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: form.firstName,
          last_name: form.lastName,
          username: form.username,
          email: form.email,
          password: form.password,
          role: form.roleId,
          subrole: form.subroleId,
          request_access: form.requestAccess,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Signup successful! Redirecting to login...");
        setTimeout(() => navigate("/"), 2000);
      } else {
        toast.error(data.error || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  const particlesInit = async (main) => await loadFull(main);

  const showSubrole = form.roleId !== "" && subroles.length > 0;

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
        className="relative bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-lg text-white z-10"
      >
        <motion.h2
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl font-bold mb-6 text-center text-red-500"
        >
          Signup
        </motion.h2>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              className="flex-1 p-3 border border-gray-700 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              className="flex-1 p-3 border border-gray-700 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="p-3 border border-gray-700 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="p-3 border border-gray-700 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="p-3 border border-gray-700 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="p-3 border border-gray-700 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          {/* Role dropdown */}
          <select
            name="roleId"
            value={form.roleId}
            onChange={handleChange}
            className="p-3 border border-gray-700 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>{role.name}</option>
            ))}
          </select>

          {/* Subrole dropdown */}
          {showSubrole && (
            <select
              name="subroleId"
              value={form.subroleId}
              onChange={handleChange}
              className="p-3 border border-gray-700 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select Subrole</option>
              {subroles.map((subrole) => (
                <option key={subrole.id} value={subrole.id}>{subrole.name}</option>
              ))}
            </select>
          )}

          <label className="flex items-center gap-2 text-white">
            <input
              type="checkbox"
              name="requestAccess"
              checked={form.requestAccess}
              onChange={handleChange}
              className="w-4 h-4 accent-red-500"
            />
            Request Access
          </label>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-md transition font-semibold"
          >
            Sign Up
          </motion.button>

          <p className="text-sm text-center mt-2">
            Already have an account?{" "}
            <span
              className="text-red-500 cursor-pointer hover:underline"
              onClick={() => navigate("/")}
            >
              Login
            </span>
          </p>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Signup;
