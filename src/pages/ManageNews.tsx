import NewsTable from "@/components/NewsTable";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function ManageNews() {
  return (
    <div className="bg-white min-h-[450px] rounded-xl p-5">
      <div className="flex items-center">
        <h3 className="text-xl font-bold">Manage News</h3>
        <Link to={"/dashboard/news/add"} className="ml-auto">
          <Button className=" bg-violet-950">
            <Plus className="mr-2" /> Add Data
          </Button>
        </Link>
      </div>
      <Separator className="my-3 border-1 bg-violet-950" />
      <div className="max-h-[350px] overflow-auto ">
        <NewsTable />
      </div>
    </div>
  );
}
