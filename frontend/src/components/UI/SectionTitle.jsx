import React from "react";
import { UsersIcon } from "lucide-react";

export default function SectionTitle({
  title,
  subtitle,
  icon = <UsersIcon />,
  className = "",
}) {
  return (
    <div className={`text-left mb-8 ${className}`}>
      <div className="flex items-center gap-2 text-lisBlue font-bold text-xl">
        {icon}
        <span>{title}</span>
      </div>
      {subtitle && <p className="text-gray-600 mt-1 text-sm">{subtitle}</p>}
    </div>
  );
}
