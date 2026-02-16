export default function ReplyCard({ reply, onDelete }) {
  if (!reply || !reply.author) return null;

  const isFlagged = reply.status === "flagged";
  const isHidden = reply.status === "hidden";

  if (isHidden) {
    return (
      <div className="text-xs text-red-500 italic ml-6">
        This reply was hidden due to policy violation
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-xl border p-4 ml-6 ${
        isFlagged ? "border-red-400" : "border-primary/20"
      }`}
    >
      <div className="flex justify-between items-center">
        <p className="font-header text-primary text-sm">
          @{reply.author.username}
        </p>

        {onDelete && (
          <button
            onClick={() => onDelete(reply._id)}
            className="text-xs text-warning hover:underline"
          >
            Delete
          </button>
        )}
      </div>

      <p className="text-sm mt-1 text-black">{reply.content}</p>

      {isFlagged && (
        <p className="text-xs text-red-500 mt-2">
          ⚠️ Flagged by moderation system
        </p>
      )}
    </div>
  );
}