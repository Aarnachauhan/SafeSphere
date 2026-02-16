import { useState } from "react";
import { Heart, Reply } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PostCard({ post, onDelete }) {
  //(prevents crashes)
  if (!post || !post.author || !post.author.username) {
    return null;
  }

  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  const username = post.author.username;

  return (
    <div className="bg-white rounded-2xl border-2 border-soft/70 p-5 shadow-sm">
      <div className="flex gap-4">
        <div className="w-10 h-10 rounded-full bg-soft flex items-center justify-center font-semibold text-primary">
          {username.charAt(0).toUpperCase()}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between text-sm">
            <div className="flex gap-2">
              <span className="font-header text-primary">
                @{username}
              </span>
              <span className="text-gray-500">
                · {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>

            {onDelete && (
              <button
                onClick={() => onDelete(post._id)}
                className="text-xs text-warning hover:underline"
              >
                Delete
              </button>
            )}
          </div>

          <p className="mt-2 text-sm text-black">
            {post.content}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6 text-xs text-accent mt-4 pl-14">
        <button
          onClick={() => setLiked(!liked)}
          className="flex items-center gap-1"
        >
          <Heart
            size={14}
            className={
              liked ? "fill-red-500 text-red-500" : "text-accent"
            }
          />
          <span>{liked ? "Liked" : "Like"}</span>
        </button>

        <button
          onClick={() => navigate(`/post/${post._id}`)}
          className="flex items-center gap-1"
        >
          <Reply size={14} />
          <span>Reply</span>
        </button>

        <button
          onClick={() => navigate(`/post/${post._id}`)}
          className="hover:underline"
        >
          See more
        </button>

        <span className="text-gray-500">
          {post.repliesCount || 0} comments
        </span>
      </div>
    </div>
  );
}