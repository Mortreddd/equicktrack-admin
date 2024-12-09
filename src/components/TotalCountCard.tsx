import { HTMLAttributes, ReactNode } from "react";

interface TotalCountCardProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  title: string;
  count?: number;
}

export default function TotalCountCard({
  children,
  title,
  className,
  count,
}: TotalCountCardProps) {
  return (
    <article
      className={`flex items-center md:gap-5 gap-2 ${className} bg-gray-100 md:p-3 shadow p-1 rounded`}
    >
      {children}

      <div className="w-auto">
        <h3 className="md:text-lg text-md font-medium text-white">{title}</h3>
        <p className="text-gray-100 font-sans md:text-lg text-md">{count}</p>
      </div>
    </article>
  );
}
