import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import NewsTableRows from "./NewsTableRows";

export default function NewsTable() {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Comments</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <NewsTableRows />
        <NewsTableRows />
        <NewsTableRows />
        <NewsTableRows />
        <NewsTableRows />
        <NewsTableRows />
        <NewsTableRows />
        <NewsTableRows />
      </TableBody>
    </Table>
  );
}
