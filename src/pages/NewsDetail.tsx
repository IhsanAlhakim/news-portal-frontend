import ErrorMessage from "@/components/ErrorMessage";
import NewsCommentSkeleton from "@/components/skeleton/NewsCommentSkeleton";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import getDate from "@/lib/getDate";
import { createMarkup } from "@/lib/sanitizeHtml";
import { getImageUrl } from "@/lib/supabase";
import { addCommentFormSchema } from "@/lib/validation";
import { Comments } from "@/models/comments";
import { News } from "@/models/news";
import {
  createComment,
  getComment,
  getCommentCountByNewsId,
  getNewsById,
} from "@/network/NewsApi";
import { type Error } from "@/types/error";
import { SendHorizonal } from "lucide-react";
import { lazy, Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const NewsCommentContainer = lazy(
  () => import("@/components/NewsCommentContainer")
);

export default function NewsDetail() {
  const { newsId } = useParams();
  const { toast } = useToast();
  const [error, setError] = useState<Error | null>(null);
  const [newsData, setNewsData] = useState<News | null>(null);
  const [newsComment, setNewsComment] = useState<Comments[] | null>(null);
  const [comment, setComment] = useState<string>("");
  const [newsCommentCount, setNewsCommentCount] = useState<number>(0);

  const sendComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validate = addCommentFormSchema.safeParse({
      comment: comment,
    });

    if (!validate.success) {
      const errorDesc = validate.error.issues.map((issue) => issue.message);
      return setError({
        errorTitle: "Error Validation",
        errorDesc,
      });
    }

    const sendComment = await createComment({ newsId, comment });

    if (sendComment.isSuccess) {
      setComment("");
      setError(null);
      toast({
        title: "Comment sent",
        description: "Your comment has been sent ",
      });
      return;
    }
    toast({
      title: "Comment not sent",
      description: "Your comment failed to be sent",
    });
    return;
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const comment = e.target.value;
    setComment(comment);
  };

  useEffect(() => {
    async function loadNewsDetail() {
      const [newsDetail, newsComment, newsCommentCount] = await Promise.all([
        getNewsById(newsId),
        getComment(newsId),
        getCommentCountByNewsId(newsId),
      ]);
      setNewsData(newsDetail);
      setNewsComment(newsComment);
      setNewsCommentCount(newsCommentCount.commentsCount);
    }
    loadNewsDetail();
  }, []);

  return (
    <section className="w-full p-10">
      {newsData ? (
        <>
          <div className="flex flex-col items-center gap-2 mb-4">
            <h2 className="text-4xl font-bold text-center">
              {newsData?.title}
            </h2>
            <p className="text-base font-semibold">
              {newsData?.createdBy} - {newsData?.category}
            </p>
            <p className="text-sm font-normal">
              {getDate(newsData?.createdAt)}
            </p>
          </div>
          <div className="mb-10">
            <div className="w-full h-[300px] bg-slate-600">
              <img
                src={getImageUrl(newsData?.image)}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div
            dangerouslySetInnerHTML={createMarkup(newsData?.content)}
            className="text-lg"
          ></div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center gap-2 mb-4">
            <Skeleton className="w-[550px] h-[35px] bg-slate-500" />
            <Skeleton className="w-[550px] h-[35px] bg-slate-500" />
            <Skeleton className="w-[100px] h-[25px] bg-slate-500" />
            <Skeleton className="w-[250px] h-[25px] bg-slate-500" />
          </div>
          <div className="mb-10">
            <Skeleton className="w-full h-[300px] bg-slate-500" />
          </div>
          <Skeleton className="w-full h-[300px] bg-slate-500" />
        </>
      )}

      <hr className="border-gray-300 my-4" />
      <div className="bg-slate-100 p-3 rounded">
        <h3 className="mb-4 font-bold">Tulis Komentar</h3>
        <ErrorMessage error={error} />
        <div className="bg-white p-3 rounded-lg flex flex-col gap-3 mt-3">
          <form onSubmit={sendComment}>
            <textarea
              name="comment"
              id="comment"
              value={comment}
              onChange={handleChange}
              rows={4}
              placeholder="Write A Comment..."
              className="bg-transparent w-full resize-none outline-none"
            />
            <div className="ml-auto">
              <Button className="bg-blue-700 hover:bg-blue-950">
                Kirim
                <SendHorizonal className="ml-2" size={15} />
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className="bg-slate-100 p-3 rounded mt-3">
        <h3 className="mb-4">
          <span className="font-bold">Komentar </span> ({newsCommentCount})
        </h3>
        <div className="bg-white p-3 rounded-lg flex flex-col gap-3 divide-y">
          <Suspense
            fallback={
              <>
                <NewsCommentSkeleton />
                <NewsCommentSkeleton />
                <NewsCommentSkeleton />
              </>
            }
          >
            <NewsCommentContainer newsComment={newsComment} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
