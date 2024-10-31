import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import getDate from "@/lib/getDate";
import { News } from "@/models/news";

interface NewsTableProps {
  newsList: News[];
}

export default function NewsTable({ newsList }: NewsTableProps) {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow className="grid grid-cols-[3fr_1fr_1fr_2fr_2fr_1fr]">
          <TableHead>Title</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Editor</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {newsList.map((news) => (
          <TableRow
            key={news._id}
            className="grid grid-cols-[3fr_1fr_1fr_2fr_2fr_1fr]"
          >
            <TableCell className="whitespace-nowrap overflow-hidden text-ellipsis">
              {news.title}
            </TableCell>
            <TableCell>{news.createdBy}</TableCell>
            <TableCell>{news.editedBy}</TableCell>
            <TableCell>{getDate(news.createdAt)}</TableCell>
            <TableCell>{getDate(news.updatedAt)}</TableCell>
            <TableCell>{news.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
