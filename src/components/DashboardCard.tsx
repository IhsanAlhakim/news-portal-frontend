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
    <div className="w-[130px] md:w-[150px] lg:w-[200px] h-[90px] md:h-[120px] p-2 md:p-5 mx-auto flex items-center justify-center gap-4 bg-purple-950 text-white rounded-xl">
      <div>
        <p className="text-3xl font-bold text-center">{count}</p>
        <p className="text-xs font-semibold text-center">{title}</p>
      </div>
      <div className="hidden lg:block">
        <Icon size={40} />
      </div>
    </div>
  );
}
