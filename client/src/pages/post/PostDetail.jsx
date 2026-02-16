import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PostCard from "../../components/post/PostCard";
import ReplyCard from "../../components/post/ReplyCard";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [replies, setReplies] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(true);

  // fetch post + replies
  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const postRes = await fetch(`http://localhost:5000/api/posts/${id}`);
        if (!postRes.ok) throw new Error("Post not found");

        const postData = await postRes.json();

        const repliesRes = await fetch(
          `http://localhost:5000/api/replies/${id}`,
        );
        const repliesData = await repliesRes.json();

        setPost(postData);
        setReplies(repliesData);
      } catch (err) {
        console.error(err);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [id]);

  // create reply
  const handleReply = async () => {
    if (!replyText.trim()) return;

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return alert("Please login first");
      const userId = user._id;

      const res = await fetch("http://localhost:5000/api/replies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId: id,
          userId,
          content: replyText,
        }),
      });

      if (!res.ok) throw new Error("Reply failed");

      const newReply = await res.json();
      setReplies((prev) => [...prev, newReply]);
      setReplyText("");
    } catch (err) {
      console.error(err);
    }
  };

  // delete reply (optional but ready)
  const handleDeleteReply = async (replyId) => {
    await fetch(`http://localhost:5000/api/replies/${replyId}`, {
      method: "DELETE",
    });

    setReplies((prev) => prev.filter((r) => r._id !== replyId));
  };

  // loading state
  if (loading) {
    return <p className="text-sm text-gray-500">Loading post…</p>;
  }

  // not found state
  if (!post) {
    return <p className="text-sm text-red-500">Post not found</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-4 text-sm">
        <button
          onClick={() => navigate(-1)}
          className="text-accent hover:underline"
        >
          ← Back
        </button>

        <Link to="/" className="text-accent hover:underline">
          Home
        </Link>
      </div>

      <PostCard post={post} />

      <div className="bg-white rounded-2xl border-2 border-soft/70 p-5 shadow-sm">
        <textarea
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Write a reply..."
          rows={3}
          className="w-full resize-none outline-none text-sm"
        />
        <div className="flex justify-end mt-3">
          <button
            onClick={handleReply}
            className="bg-accent text-white px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90"
          >
            Reply
          </button>
        </div>
      </div>

      <div className="space-y-4 ml-6">
        {replies.length === 0 ? (
          <p className="text-sm text-gray-500">No replies yet</p>
        ) : (
          replies.map((reply) => (
            <ReplyCard
              key={reply._id}
              reply={reply}
              onDelete={handleDeleteReply}
            />
          ))
        )}
      </div>
    </div>
  );
}
