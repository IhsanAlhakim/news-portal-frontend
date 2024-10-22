import { Comments } from "@/models/comments";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface NewsCommentProps {
  comment: Comments;
}

export default function NewsComment({ comment }: NewsCommentProps) {
  return (
    <div className="flex gap-3 p-5">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1">
        <p className="font-bold">Anonymous</p>
        <p>{comment.comment}</p>
      </div>
    </div>
  );
}
