import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-red-500">My Dashboard</h1>
        <button
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md font-semibold"
          onClick={() => navigate("/")}
        >
          Logout
        </button>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-xl font-bold text-red-500 mb-2">Analytics</h2>
          <p>View your metrics and reports here.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-xl font-bold text-red-500 mb-2">Users</h2>
          <p>Manage users, roles, and access.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-xl font-bold text-red-500 mb-2">Settings</h2>
          <p>Configure system preferences and themes.</p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
