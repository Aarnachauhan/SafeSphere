import { NavLink, useNavigate } from "react-router-dom";
import userAvatar from "../../assets/user.jpg";

export default function Sidebar() {
  const navigate = useNavigate();

  // 🔐 Read logged-in user
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside
      className="
        h-full
        bg-white
        rounded-2xl
        border border-soft/20
        p-6
        flex flex-col
        justify-between
      "
    >
      {/* TOP */}
      <div className="space-y-6">
        {/* Logo */}
        <div>
          <h1 className="font-header text-4xl font-bold text-primary">
            thoughts.io
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            a calm space for thoughtful expression
          </p>
        </div>

        {/* AUTH SECTION */}
        {user ? (
          <div className="flex items-center gap-3 pt-4 border-t border-white/40">
            <div className="w-10 h-10 rounded-full bg-soft flex items-center justify-center font-semibold text-primary">
              {user.username.charAt(0).toUpperCase()}
            </div>

            <div>
              <p className="text-sm font-semibold">
                {user.name || "USER"}
              </p>
              <p className="text-xs text-gray-500">
                @{user.username}
              </p>

              <button
                onClick={handleLogout}
                className="text-xs text-warning hover:underline mt-1"
              >
                LOGOUT
              </button>
            </div>
          </div>
        ) : (
          <div className="pt-4 border-t border-white/40 space-y-3">
            <NavLink
              to="/login"
              className="block text-sm font-semibold text-primary hover:underline"
            >
              LOGIN
            </NavLink>

            <NavLink
              to="/signup"
              className="block text-sm font-semibold text-primary hover:underline"
            >
              SIGN UP
            </NavLink>
          </div>
        )}

        {/* NAVIGATION */}
        <nav className="flex flex-col gap-3 text-sm pt-4">
          <NavLink to="/" className="font-semibold">
            HOME
          </NavLink>

          {user && (
            <NavLink to="/profile" className="text-gray-500">
              PROFILE
            </NavLink>
          )}

          <NavLink to="/admin" className="text-gray-500">
            ADMIN
          </NavLink>
        </nav>
      </div>

      {/* FOOTER */}
      <div className="text-xs text-gray-400">
        thoughts.io
      </div>
    </aside>
  );
}
