import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const cn = (...args: any[]) => args.filter(Boolean).join(" ");

interface SidebarItemProps {
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
  label: string;
  href: string;
  activeIcon?: React.ComponentType<{
    size?: number | string;
    className?: string;
  }>;
}
export const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  activeIcon,
  label,
  href,
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const IconComponent = isActive && activeIcon ? activeIcon : icon;
  const IconToRender = IconComponent as React.ComponentType<any>;
  const onClick = () => {
    navigate(href);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive &&
          "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <IconToRender
          size={22}
          color={isActive ? "#0369c7" : undefined}
          className={cn(
            "text-slate-500",
            isActive && "text-sky-700 animate-spin-once"
          )}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-sky-700 h-full transition-all",
          isActive && "opacity-100"
        )}
      />
    </button>
  );
};

export default SidebarItem;