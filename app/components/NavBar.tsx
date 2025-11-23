"use client";
import Image from "next/image";
import Link from "next/link";
// You'll need an icon library for the dropdown arrow
// Install with: npm install @heroicons/react
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";

export const NavBar = () => {
  const path = usePathname();
  const activePath = "/" + path.split("/")[1];
  // Cleaner to map over your links
  const navLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Company Management", href: "/company" },
    { name: "Charger management", href: "/charger" },
    { name: "User management", href: "/user" },
    { name: "Billing & Payments", href: "/bills" },
    { name: "Complaints", href: "/complaints" },
  ];

  // This would dynamically come from Next.js router

  return (
    <nav className="bg-[#0B0B0B] h-18 flex items-center justify-between px-8 text-white border-b border-gray-500">
      <Image
        src={"/logo.png"}
        alt="DABAS logo"
        height={40}
        width={100}
        className="object-contain"
      />

      {/* 2. Navigation Links (Center) */}
      <div className="flex items-center gap-18">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`
            pb-2 text-sm font-medium transition-colors
            ${
              link.href === activePath
                ? "text-white relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-600"
                : "text-gray-400 hover:text-white"
            }
            `}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* 3. Profile (Right) */}
      <div className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-900 transition-colors">
        {/* Placeholder Avatar */}
        <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center font-semibold text-lg">
          <Image
            src={"/Guy.png"}
            alt="Face"
            height={100}
            width={100}
            className="object-contain"
          />
        </div>
        <span className="text-white font-medium">Dabas</span>
        <ChevronDownIcon className="w-5 h-5 text-gray-400" />
      </div>
    </nav>
  );
};
