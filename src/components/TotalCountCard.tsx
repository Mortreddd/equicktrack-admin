import { ReactNode } from "react";

interface TotalCountCardProps {
  children: ReactNode;
  title: string;
  count?: number;
}

export default function TotalCountCard({
  children,
  title,
  count,
}: TotalCountCardProps) {
  return (
    <article className="flex items-center md:gap-5 gap-2 bg-gray-100 md:p-3 shadow p-1 rounded">
      {children}

      <div className="w-auto">
        <h3 className="md:text-lg text-md font-medium text-black">{title}</h3>
        <p className="text-gray-700 font-sans md:text-lg text-md">{count}</p>
      </div>
    </article>
  );
}
