export default function HiddenReply() {
  return (
    <div className="bg-red-100/60 backdrop-blur-sm rounded-lg p-3 border border-warning/40">
  <p className="text-sm text-warning font-semibold">
    This reply has been hidden due to policy violation.
  </p>
</div>
  );
}