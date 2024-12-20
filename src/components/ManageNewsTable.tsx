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
  newsList: News[] | undefined;
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
      {newsList && newsList.length > 0 ? (
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow className="grid grid-cols-[100px_200px_300px_100px_100px_200px] lg:grid-cols-[1fr_2fr_3fr_1fr_1fr_2fr]">
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Last Edited By</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {newsList.map((news) => (
              <TableRow
                key={news._id}
                className="grid grid-cols-[1fr_2fr_3fr_1fr_1fr_2fr]"
              >
                <TableCell>
                  <img
                    src={getImageUrl(news.image)}
                    alt="News Image"
                    width={60}
                  />
                </TableCell>
                <TableCell className="whitespace-nowrap overflow-hidden text-ellipsis">
                  {news.title}
                </TableCell>
                <TableCell className="whitespace-nowrap overflow-hidden text-ellipsis">
                  {news.content.replace(/<[^>]*>/g, "")}
                </TableCell>
                <TableCell>{news.editedBy}</TableCell>
                <TableCell>{news.status}</TableCell>
                <TableCell className="flex gap-2">
                  <Button
                    asChild
                    className="w-20 bg-violet-900 hover:bg-violet-950"
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
            ))}
          </TableBody>
        </Table>
      ) : (
        <div>No News Data Yet</div>
      )}
    </>
  );
}
