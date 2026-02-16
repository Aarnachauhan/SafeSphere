export default function Profile() {
  // TEMP: until auth is wired
  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "Demo User",
    username: "demo",
  };

  return (
    <div className="min-h-screen bg-gradient-to-l from-white via-soft/100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl border border-soft/30 shadow-sm p-8 w-full max-w-md space-y-6 text-center">
        {/* Avatar */}
        <div className="w-20 h-20 mx-auto rounded-full bg-soft flex items-center justify-center text-3xl font-header font-bold text-primary">
          {user.username.charAt(0).toUpperCase()}
        </div>

        {/* Name & username */}
        <div className="space-y-1">
          <h2 className="font-header text-2xl font-bold text-primary">
            {user.name || "Unnamed User"}
          </h2>
          <p className="text-sm text-gray-500">
            @{user.username}
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-primary/10" />

        {/* Info (kept minimal on purpose) */}
        <p className="text-xs text-gray-400">
          this is a demo profile view
        </p>
      </div>
    </div>
  );
}