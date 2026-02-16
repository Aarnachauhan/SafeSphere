import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!username.trim()) return;

    try {
      const res = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
  username: username.trim().toLowerCase(),
}),
      });

      if (!res.ok) {
        alert("User already exists");
        return;
      }

      const user = await res.json();

      localStorage.setItem("user", JSON.stringify(user));

      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-l from-white via-soft/100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl border p-8 w-full max-w-md space-y-6">
        <h2 className="font-header text-3xl font-bold text-primary text-center">
          SIGN UP
        </h2>

        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="USERNAME"
          className="w-full border rounded-xl px-4 py-3"
        />

        <button
          onClick={handleSignup}
          className="w-full bg-accent text-white rounded-full py-3 font-semibold"
        >
          CREATE ACCOUNT
        </button>

        <p className="text-xs text-center text-gray-500">
          HAVE AN ACCOUNT?{" "}
          <Link to="/login" className="text-accent font-semibold">
            LOGIN
          </Link>
        </p>
      </div>
    </div>
  );
}