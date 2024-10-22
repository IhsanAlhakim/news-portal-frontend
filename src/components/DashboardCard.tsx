import { ElementType } from "react";

interface DashboardCardProps {
  title: string;
  count: number;
  Icon: ElementType;
}

export default function DashboardCard({
  title,
  count,
  Icon,
}: DashboardCardProps) {
  return (
    <div className="flex items-center justify-center gap-4 bg-purple-950 text-white min-w-[200px] h-[120px] p-5 rounded-xl">
      <div>
        <p className="text-3xl font-bold text-center">{count}</p>
        <p className="text-xs font-semibold text-center">{title}</p>
      </div>
      <div>
        <Icon size={40} />
      </div>
    </div>
  );
}
