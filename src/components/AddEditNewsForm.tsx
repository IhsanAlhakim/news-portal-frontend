import Tiptap from "./TipTap";
import { Button } from "./ui/button";

export default function AddEditNewsForm() {
  return (
    <form action="" className="flex flex-col gap-4">
      <div className="grid grid-cols-2">
        <div className="flex flex-col gap-3">
          <div>
            <label htmlFor="" className="font-semibold">
              News Title
            </label>
            <div className="w-full bg-transparent outline-none rounded-md border-2 p-2 flex gap-2 items-center mt-1">
              <input
                type="text"
                name=""
                id=""
                placeholder="Masukkan Email..."
                className="w-full bg-transparent outline-none font-semibold"
              />
            </div>
          </div>
          <div>
            <label htmlFor="" className="font-semibold">
              News Image
            </label>
            <div className="w-full bg-transparent outline-none rounded-md border-2 p-2 flex gap-2 items-center mt-1">
              <input
                type="text"
                name=""
                id=""
                placeholder="Masukkan Email..."
                className="w-full bg-transparent outline-none font-semibold"
              />
            </div>
          </div>
        </div>
        <div className="bg-slate-500 w-1/2 mx-auto"></div>
      </div>

      <div className="grid grid-cols-2">
        <div>
          <label htmlFor="newsContent" className="font-semibold">
            News Content
          </label>
          <div className="w-full mt-2">
            <Tiptap />
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <div className="flex gap-2">
          <input type="radio" name="status" id="publish" value="publish" />
          <label htmlFor="publish">Publish</label>
        </div>
        <div className="flex gap-2">
          <input type="radio" name="status" id="draft" value="draft" />
          <label htmlFor="draft">Draft</label>
        </div>
      </div>

      <Button className="text-md bg-blue-500 mt-5 w-fit">Add</Button>
    </form>
  );
}
