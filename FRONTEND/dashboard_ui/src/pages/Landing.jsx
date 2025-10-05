import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Landing = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ first_name: "John", last_name: "Doe" });

  const particlesInit = async (main) => await loadFull(main);

  const cards = [
    { title: "Guide", desc: "View help guides", onClick: () => toast.info("Guide coming soon!") },
    { title: "Dashboard", desc: "Go to your dashboard", onClick: () => navigate("/dashboard") },
    { title: "Lookup", desc: "Search and lookup data", onClick: () => toast.info("Lookup coming soon!") },
    {
      title: "Sign Out",
      desc: "Logout from your account",
      onClick: () => {
        localStorage.clear();
        toast.success("Signed out successfully!");
        navigate("/");
      },
    },
  ];

  const [activeIndex, setActiveIndex] = useState(1);

  const radius = 400; // distance from center
  const perspective = 1200; // depth effect

  const rotateTo = (index) => setActiveIndex(index);

  // --- Manual rotation using mouse scroll ---
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      if (e.deltaY > 0) {
        setActiveIndex((prev) => (prev + 1) % cards.length);
      } else {
        setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [cards.length]);
  // --- End manual scroll effect ---

  // Fetch current user info from backend using access token
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/"); // redirect to login if no token
      return;
    }

    fetch("http://127.0.0.1:8000/api/users/me/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user info");
        return res.json();
      })
      .then((data) => setUser({ first_name: data.first_name, last_name: data.last_name }))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load user info. Please login again.");
        localStorage.clear();
        navigate("/");
      });
  }, [navigate]);

  return (
    <div className="relative min-h-screen bg-gray-900 text-white overflow-hidden flex flex-col items-center justify-center">
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

      {/* Particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute inset-0 -z-10"
        options={{
          background: { color: "#111827" },
          fpsLimit: 60,
          interactivity: { events: { onHover: { enable: true, mode: "repulse" }, onClick: { enable: true, mode: "push" } } },
          particles: { color: { value: "#ff4d4d" }, links: { enable: true, color: "#ff4d4d", distance: 150 }, move: { enable: true, speed: 2 }, number: { value: 50 }, opacity: { value: 0.7 }, size: { value: { min: 2, max: 5 } } },
        }}
      />

      {/* Welcome */}
      <h1 className="text-3xl font-bold text-red-500 mb-16 text-center z-10">
        Welcome, {user.first_name} {user.last_name}!
      </h1>

      {/* 3D Carousel */}
      <div className="relative w-full flex justify-center items-center" style={{ perspective: `${perspective}px`, height: "500px" }}>
        {cards.map((card, index) => {
          const angle = (80 / (cards.length - 1)) * (index - activeIndex);
          const radians = (angle * Math.PI) / 180;
          const x = radius * Math.sin(radians);
          const z = radius * Math.cos(radians);
          const isActive = index === activeIndex;

          return (
            <motion.div
              key={index}
              animate={{
                x,
                z,
                rotateY: angle,
                scale: isActive ? 1.2 : 0.8,
                opacity: isActive ? 1 : 0.6,
              }}
              style={{
                position: "absolute",
                width: "150px",
                height: "150px",
                transformStyle: "preserve-3d",
                cursor: "pointer",
              }}
              onClick={card.onClick}
              whileHover={{ scale: isActive ? 1.25 : 0.9 }}
              className="bg-gray-800 rounded-xl shadow-xl flex flex-col items-center justify-center text-center p-4"
            >
              <h2 className="text-xl font-bold text-red-500 mb-1">{card.title}</h2>
              <p className="text-gray-300 text-sm">{card.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Landing;
