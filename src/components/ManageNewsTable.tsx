import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getImageUrl } from "@/lib/supabase";
import { News } from "@/models/news";
import { deleteNews } from "@/network/NewsApi";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

interface NewsTableProps {
  newsList: News[] | undefined;
  setNewsList: (newsList: News[] | undefined) => void;
}

export default function ManageNewsTable({
  newsList,
  setNewsList,
}: NewsTableProps) {
  // const navigate = useNavigate();
  const handleDelete = async (id: string) => {
    if (confirm("Apakah anda yakin ingin menghapus data berita?")) {
      const deleteProcess = await deleteNews(id);
      if (deleteProcess) {
        setNewsList(newsList?.filter((news) => news._id !== id));
        alert("Data Berhasil dihapus");
        // navigate(0); //refresh
      } else {
        alert("Data gagal dihapus");
      }
    }
  };

  return (
    <>
      {newsList ? (
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Last Edited By</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {newsList ? (
              newsList.map((news) => (
                <TableRow key={news._id}>
                  <TableCell>
                    <img src={getImageUrl(news.image)} alt="" width={60} />
                  </TableCell>
                  <TableCell>{news.title}</TableCell>
                  <TableCell>{news.content.replace(/<[^>]*>/g, "")}</TableCell>
                  <TableCell>{news.editedBy}</TableCell>
                  <TableCell>{news.status}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      asChild
                      className="bg-violet-950 hover:bg-violet-800 w-20"
                    >
                      <Link to={`/dashboard/news/edit/${news._id}`}>Edit</Link>
                    </Button>
                    <Button
                      variant="destructive"
                      className="w-20"
                      onClick={() => handleDelete(news._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>No Data</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      ) : (
        <div>No Data</div>
      )}
    </>
  );
}
