import NewsComment from "@/components/NewsComment";
import { Button } from "@/components/ui/button";
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
import { SendHorizonal } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function NewsDetail() {
  const { newsId } = useParams();

  const [newsData, setNewsData] = useState<News | null>(null);
  const [newsComment, setNewsComment] = useState<Comments[] | null>(null);
  const [comment, setComment] = useState<string | undefined>(undefined);
  const [newsCommentCount, setNewsCommentCount] = useState(0);

  const sendComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newsId && comment) {
      const validate = addCommentFormSchema.safeParse({
        comment: comment,
      });

      if (!validate.success) {
        // const errorDesc = validate.error.issues.map((issue) => issue.message);

        // return setError({
        //   errorTitle: "Error Validation",
        //   errorDesc,
        // });

        return alert("Validasi Gagal");
      }

      const sendComment = await createComment({ newsId, comment });
      if (sendComment.isAddSuccess) {
        setComment("");
        return alert("Komen berhasil dikirim");
      }
      return alert("Komen gagal dikirim");
    }
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
      <div className="flex flex-col items-center gap-2 mb-4">
        <h2 className="text-4xl font-bold text-center">{newsData?.title}</h2>
        <p className="text-base font-semibold">
          {newsData?.createdBy} - {newsData?.category}
        </p>
        <p className="text-sm font-normal">{newsData?.createdAt}</p>
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
      {newsData?.content ? (
        <div
          dangerouslySetInnerHTML={createMarkup(newsData?.content)}
          className="text-lg"
        ></div>
      ) : (
        ""
      )}

      <hr className="border-gray-300 my-4" />
      <div className="bg-slate-100 p-3 rounded">
        <h3 className="mb-4 font-bold">Tulis Komentar</h3>
        <div className="bg-white p-3 rounded-lg flex flex-col gap-3">
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
              <Button className="bg-blue-700">
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
          {newsComment?.map((comment) => (
            <NewsComment key={comment._id} comment={comment} />
          ))}
        </div>
      </div>
    </section>
  );
}
