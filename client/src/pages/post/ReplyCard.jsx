export default function ReplyCard({ reply }) {
  if (reply.status === "hidden") {
    return (
      <div className="bg-white rounded-xl border p-4 ml-6">
        <p className="text-sm text-gray-500 italic">
          this reply was hidden due to policy violation
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-primary/20 p-4 ml-6">
      <p className="font-header text-primary text-sm">
        @{reply.author?.username}
      </p>
      <p className="text-sm mt-1 text-black">
        {reply.content}
      </p>
    </div>
  );
}