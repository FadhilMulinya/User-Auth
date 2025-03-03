import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Welcome, {user?.email}
          </h2>
          <p className="text-gray-700 text-base">
            This is your personalized dashboard. Here you can manage your account,
            update your settings, and monitor your activity.
          </p>

          {/* Example Dashboard Cards */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gray-100 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-800">Profile</h3>
              <p className="mt-2 text-gray-600">Update your profile details.</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-800">Settings</h3>
              <p className="mt-2 text-gray-600">Manage your account settings.</p>
            </div>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            This is a protected page that only authenticated users can access.
          </p>
        </div>
      </main>
    </div>
  )
}
