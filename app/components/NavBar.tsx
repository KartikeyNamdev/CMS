"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react"; // <-- Import useState
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid"; // <-- Import toggle icons
import { usePathname } from "next/navigation";

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu
  const path = usePathname();
  // Simplified path extraction to get /dashboard, /company, etc.
  const activePath = "/" + (path.split("/")[1] || "");

  const navLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Company Management", href: "/company" },
    { name: "Charger management", href: "/charger" },
    { name: "User management", href: "/user" },
    { name: "Billing & Payments", href: "/bills" },
    { name: "Complaints", href: "/complaints" },
  ];

  return (
    <>
      {/* --- Main Navigation Bar: ADDED w-full --- */}
      <nav className="bg-[#0B0B0B] w-full min-h-16 flex items-center justify-between px-8 text-white border-b border-gray-500 relative z-30">
        {/* 1. Logo (Left) */}
        <Image
          src={"/logo.png"}
          alt="DABAS logo"
          height={40}
          width={100}
          className="object-contain"
        />

        {/* 2. Desktop Navigation Links (Center) */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`
                pb-2 text-sm font-medium transition-colors
                ${
                  activePath.startsWith(link.href) && link.href !== "/" // Use startsWith for nested routes
                    ? "text-white relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-600"
                    : "text-gray-400 hover:text-white"
                }
              `}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* 3. Profile & Mobile Menu Button (Right Group) */}
        <div className="flex items-center gap-3">
          {/* Profile (Always visible) */}
          <div className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-900 transition-colors order-1">
            {/* Mobile Menu Button (Visible only on mobile) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 rounded-md md:hidden text-gray-400 hover:text-white transition-colors order-2"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center font-semibold text-lg">
              <Image
                src={"/Guy.png"}
                alt="Face"
                height={100}
                width={100}
                className="object-contain"
              />
            </div>
            {/* Hide text on mobile for space, show on small screens and up */}
            <span className="text-white font-medium hidden sm:inline">
              Dabas
            </span>
            {/* <ChevronDownIcon className="w-5 h-5 text-gray-400" /> */}
          </div>
        </div>
      </nav>

      {/* --- MOBILE MENU (Full-width dropdown) --- */}
      {isOpen && (
        <div className="md:hidden bg-[#0D0D0D] border-b border-gray-700 absolute w-full z-20 shadow-xl">
          <div className="flex flex-col p-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)} // Close menu on link click
                className={`
                  px-3 py-2 text-base font-medium rounded-lg 
                  ${
                    activePath.startsWith(link.href) && link.href !== "/"
                      ? "bg-red-700/70 text-white"
                      : "text-gray-300 hover:bg-red-700/30 hover:text-white"
                  }
                `}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
