import Reply from "./Reply";
import HiddenReply from "./HiddenReply";

export default function ReplyList() {
  return (
    <div className="space-y-3 border-t pt-4">
      <Reply />
      <HiddenReply />
    </div>
  );
}
