import AddEditNewsForm from "@/components/AddEditNewsForm";
import { Separator } from "@/components/ui/separator";

export default function EditNews() {
  return (
    <div className="bg-white min-h-[450px] rounded-xl p-5">
      <div className="flex items-center">
        <h3 className="text-xl font-bold">Edit News</h3>
      </div>
      <Separator className="my-3 border-1 bg-violet-950" />
      <AddEditNewsForm />
    </div>
  );
}
