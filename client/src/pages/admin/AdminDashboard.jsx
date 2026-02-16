import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [flaggedReplies, setFlaggedReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchFlaggedReplies = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/replies/flagged");
      const data = await res.json();

      if (Array.isArray(data)) {
        setFlaggedReplies(data);
      } else {
        setFlaggedReplies([]);
      }
    } catch (error) {
      console.error("Failed to fetch flagged replies", error);
      setFlaggedReplies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlaggedReplies();
  }, []);

  // 🔥 BLOCK USER
  const blockUser = async (userId) => {
    try {
      await fetch(
        `http://localhost:5000/api/admin/user/${userId}/block`,
        { method: "PATCH" }
      );

      // Remove all replies from this user
      setFlaggedReplies((prev) =>
        prev.filter((reply) => reply.author?._id !== userId)
      );

      setMessage("User has been blocked successfully.");
    } catch (error) {
      console.error("Block failed", error);
      setMessage("Failed to block user.");
    }
  };

  // 🔥 HIDE REPLY
  const hideReply = async (replyId) => {
    try {
      await fetch(
        `http://localhost:5000/api/admin/reply/${replyId}/hide`,
        { method: "PATCH" }
      );

      setFlaggedReplies((prev) =>
        prev.filter((reply) => reply._id !== replyId)
      );

      setMessage("Reply hidden successfully.");
    } catch (error) {
      console.error("Hide failed", error);
      setMessage("Failed to hide reply.");
    }
  };

  // 🔥 ALLOW REPLY
  const allowReply = async (replyId) => {
    try {
      await fetch(
        `http://localhost:5000/api/admin/reply/${replyId}/allow`,
        { method: "PATCH" }
      );

      setFlaggedReplies((prev) =>
        prev.filter((reply) => reply._id !== replyId)
      );

      setMessage("Reply allowed successfully.");
    } catch (error) {
      console.error("Allow failed", error);
      setMessage("Failed to allow reply.");
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="font-header text-3xl font-bold text-primary">
        admin dashboard
      </h2>

      {/* Success Message */}
      {message && (
        <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">
          {message}
        </div>
      )}

      <div className="space-y-4">
        <div className="bg-white rounded-2xl border border-soft/40 p-5 shadow-sm">
          <h3 className="font-semibold text-primary">flagged activity</h3>
          <p className="text-sm text-gray-600 mt-1">
            total flagged replies detected by system
          </p>
          <div className="text-xs text-gray-500 mt-3">
            total: {flaggedReplies.length}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-soft/40 p-6 shadow-sm">
        <h3 className="font-semibold text-lg text-primary mb-4">
          flagged replies
        </h3>

        {loading ? (
          <p className="text-sm text-gray-500">loading...</p>
        ) : flaggedReplies.length === 0 ? (
          <p className="text-sm text-gray-500">no flagged replies yet</p>
        ) : (
          <div className="space-y-4">
            {flaggedReplies.map((reply) => (
              <div
                key={reply._id}
                className="border border-primary/20 rounded-xl p-4"
              >
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">
                    @{reply.author?.username}
                  </span>
                  <span className="text-gray-500 capitalize">
                    {reply.status}
                  </span>
                </div>

                <p className="text-sm text-black mt-2">{reply.content}</p>

                <div className="flex gap-4 text-xs text-gray-500 mt-3">
                  <span>category: {reply.label || "N/A"}</span>
                  <span>
                    confidence:{" "}
                    {reply.confidence
                      ? reply.confidence.toFixed(2)
                      : 0}
                  </span>
                  <span>severity: {reply.severity || "N/A"}</span>
                </div>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => hideReply(reply._id)}
                    className="text-xs px-3 py-1 rounded-full border border-primary/30 hover:bg-primary/5"
                  >
                    hide
                  </button>

                  <button
                    onClick={() => allowReply(reply._id)}
                    className="text-xs px-3 py-1 rounded-full border border-primary/30 hover:bg-primary/5"
                  >
                    allow
                  </button>

                  <button
                    onClick={() => blockUser(reply.author?._id)}
                    className="text-xs px-3 py-1 rounded-full border border-warning text-warning hover:bg-warning/5"
                  >
                    block user
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
