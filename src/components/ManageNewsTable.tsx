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
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

interface NewsTableProps {
  newsList: News[];
  setSelectedNews: (id: string) => void;
  setShowModal: (show: boolean) => void;
}

export default function ManageNewsTable({
  newsList,
  setSelectedNews,
  setShowModal,
}: NewsTableProps) {
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
                    <img
                      src={getImageUrl(news.image)}
                      alt="News Image"
                      width={60}
                    />
                  </TableCell>
                  <TableCell>{news.title}</TableCell>
                  <TableCell>{news.content.replace(/<[^>]*>/g, "")}</TableCell>
                  <TableCell>{news.editedBy}</TableCell>
                  <TableCell>{news.status}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      asChild
                      className="bg-violet-900 hover:bg-violet-950 w-20"
                    >
                      <Link to={`/dashboard/news/edit/${news._id}`}>Edit</Link>
                    </Button>
                    <Button
                      variant="destructive"
                      className="w-20"
                      onClick={() => {
                        setSelectedNews(news._id);
                        setShowModal(true);
                      }}
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
