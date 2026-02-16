import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const normalized = username.trim().toLowerCase();

      const res = await fetch(
        `http://localhost:5000/api/users/${normalized}`
      );

      if (!res.ok) {
        alert("User not found");
        return;
      }

      const user = await res.json();

      localStorage.setItem("user", JSON.stringify(user));

      // 🔁 FORCE UI UPDATE
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-l from-white via-soft/100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl border p-8 w-full max-w-md space-y-6">
        <h2 className="font-header text-3xl font-bold text-primary text-center">
          LOGIN
        </h2>

        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="USERNAME"
          className="w-full border rounded-xl px-4 py-3"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-accent text-white rounded-full py-3 font-semibold"
        >
          LOGIN
        </button>

        <p className="text-xs text-center text-gray-500">
          NO ACCOUNT?{" "}
          <Link to="/signup" className="text-accent font-semibold">
            SIGN UP
          </Link>
        </p>
      </div>
    </div>
  );
}