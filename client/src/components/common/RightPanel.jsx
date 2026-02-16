import heroIllustration from "../../assets/illustration.jpg";

export default function RightPanel() {
  return (
  <aside className="
  h-full
  bg-white/60
  rounded-2xl
  border border-white/40
  overflow-hidden
">
      <img
        src={heroIllustration}
        alt="Illustration"
        className="w-full h-full object-cover"
      />
    </aside>
  );
}
