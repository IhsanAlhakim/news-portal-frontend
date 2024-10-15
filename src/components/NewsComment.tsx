import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function NewsComment() {
  return (
    <div className="flex gap-3 p-5">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1">
        <p className="font-bold">Nama</p>
        <p>Komentar</p>
      </div>
    </div>
  );
}
