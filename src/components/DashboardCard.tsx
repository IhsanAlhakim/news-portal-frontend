import { ThumbsUp } from "lucide-react";

export default function DashboardCard() {
  return (
    <div className="flex items-center justify-center gap-4 bg-purple-950 text-white min-w-[200px] h-[120px] p-5 rounded-xl">
      <div>
        <p className="text-3xl font-bold text-center">60.5k</p>
        <p className="text-xs font-semibold text-center">Article Views</p>
      </div>
      <div>
        <ThumbsUp size={40} />
      </div>
    </div>
  );
}
