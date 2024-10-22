import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { News } from "@/models/news";

interface NewsTableProps {
  newsList: News[] | null;
}

export default function NewsTable({ newsList }: NewsTableProps) {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Editor</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {newsList
          ? newsList.map((news) => (
              <TableRow key={news._id}>
                <TableCell>{news.title}</TableCell>
                <TableCell>{news.createdBy}</TableCell>
                <TableCell>{news.editedBy}</TableCell>
                <TableCell>{news.createdAt}</TableCell>
                <TableCell>{news.updatedAt}</TableCell>
                <TableCell>{news.status}</TableCell>
              </TableRow>
            ))
          : "No News Data Yet"}
      </TableBody>
    </Table>
  );
}
