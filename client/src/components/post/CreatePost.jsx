import { useState } from "react";

export default function CreatePost({ onCreate }) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;
    onCreate(text);
    setText("");
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-soft/70 p-5 shadow-sm">
      <div className="flex gap-4">
        <div className="w-10 h-10 rounded-full bg-soft flex items-center justify-center font-semibold text-primary">
          U
        </div>

        <div className="flex-1">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Share your thoughts"
            rows={3}
            className="
              w-full
              resize-none
              outline-none
              text-sm
              text-black
              placeholder-gray-500
              bg-transparent
            "
          />

          <div className="flex justify-end mt-4">
            <button
              onClick={handleSubmit}
              className="
                bg-soft
                text-black
                px-5 py-2
                rounded-full
                text-sm
                font-semibold
                hover:opacity-90
                transition
              "
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
