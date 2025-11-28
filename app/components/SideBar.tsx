"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

interface DashBoardSideBarProps {
  items?: SidebarItem[];
  className?: string;
}

export const DashBoardSideBar = ({
  items = [],
  className = "",
}: DashBoardSideBarProps) => {
  const pathname = usePathname();

  return (
    <aside
      className={`
        group fixed left-0 top-1/2 -translate-y-1/2
        z-50
        w-16 hover:w-52
        bg-black/50 bg-opacity-20 backdrop-filter backdrop-blur-lg
        border rounded-r-2xl border-gray-700 border-opacity-30
        transition-all duration-300 ease-in-out
        ${className}
      `}
      style={{
        height: "fit-content",
      }}
    >
      <nav className="flex flex-col gap-2 p-2">
        {items.map((item) => {
          const Icon = item.icon;

          // Check if the current path starts with the link href
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname?.endsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center h-12 px-3 rounded-lg
                font-medium transition-all duration-200 overflow-hidden
                whitespace-nowrap
                ${
                  isActive
                    ? "bg-[#b22828] hover:bg-red-500 text-white shadow-lg shadow-red-900/20"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }
              `}
            >
              {/* Icon - Always visible */}
              <div className="min-w-6 flex items-center justify-center">
                <Icon className="w-6 h-6" />
              </div>

              {/* Text - Hides when collapsed, Shows on hover */}
              <span
                className={`
                  ml-4 opacity-0 group-hover:opacity-100 
                  transition-opacity duration-300 delay-75
                  ${isActive ? "text-white" : ""}
                `}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default DashBoardSideBar;
