import { Comments } from "@/models/comments";
import NewsComment from "./NewsComment";

interface NewsCommentContainerProps {
  newsComment: Comments[] | null;
}

export default function NewsCommentContainer({
  newsComment,
}: NewsCommentContainerProps) {
  return (
    <>
      {newsComment?.map((comment) => (
        <NewsComment key={comment._id} comment={comment} />
      ))}
    </>
  );
}
