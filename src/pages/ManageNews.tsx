// import ManageNewsTable from "@/components/ManageNewsTable";
import NewsTableSkeleton from "@/components/skeleton/NewsTableSkeleton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { deleteImage } from "@/lib/supabase";
import { News } from "@/models/news";
import { deleteNews, getNews } from "@/network/NewsApi";
import { Plus } from "lucide-react";
import { lazy, Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ManageNewsTable = lazy(() => import("@/components/ManageNewsTable"));

export default function ManageNews() {
  const [newsData, setNewsData] = useState<News[] | undefined>(undefined);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedNews, setSelectedNews] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      const isDeleted = await deleteNews(id);
      if (isDeleted) {
        const selectedNewsData = newsData?.filter((news) => news._id === id)[0];
        deleteImage(selectedNewsData?.image);
        setNewsData(newsData?.filter((news) => news._id !== id));
        toast({
          title: "Delete Success",
          description: "Selected news already deleted",
        });
      } else {
        toast({
          title: "Delete Failed",
          description: "Delete failed, please try again later",
        });
      }
      setShowModal(false);
      setSelectedNews("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function loadNewsData() {
      const newsData = await getNews();
      setNewsData(newsData);
    }
    loadNewsData();
  }, []);

  return (
    <>
      <div className="bg-white min-h-[450px] rounded-xl p-5">
        <div className="flex items-center">
          <h3 className="text-xl font-bold">Manage News</h3>
          <Button
            className=" bg-violet-900 hover:bg-violet-950 ml-auto"
            asChild
          >
            <Link to={"/dashboard/news/add"}>
              <Plus className="mr-2" /> Add Data
            </Link>
          </Button>
        </div>
        <Separator className="my-3 border-1 bg-violet-950" />
        <div className="max-h-[350px] overflow-auto ">
          <Suspense fallback={<NewsTableSkeleton />}>
            <ManageNewsTable
              newsList={newsData}
              setSelectedNews={setSelectedNews}
              setShowModal={setShowModal}
            />
          </Suspense>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Delete Confirmation</h2>
            <p>Are you sure want to delete this news?</p>
            <div className="mt-4 flex justify-center gap-4">
              <Button
                className="bg-violet-950 w-24"
                disabled={loading}
                onClick={() => {
                  handleDelete(selectedNews);
                }}
              >
                {loading ? "Deleting..." : "Confirm"}
              </Button>
              <Button
                variant="destructive"
                className="w-24"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
