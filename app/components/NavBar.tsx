"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDownIcon } from "lucide-react";

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const path = usePathname();
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
      {/* 🌟 FLOATING NAVBAR WRAPPER */}
      <div className="w-full flex justify-center mt-4 px-4 z-50 pointer-events-none">
        <nav
          className="
            pointer-events-auto
            w-full max-w-[96%] h-18 px-8
            flex items-center justify-between
            bg-background/80 backdrop-blur-lg
            border border-gray-400/50
            rounded-xl shadow-lg
            transition-all duration-300
          "
        >
          {/* Logo */}
          <Image src="/logo1.png" alt="DABAS logo" height={40} width={100} />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`
        relative pb-2 text-md font-medium
        transition-all duration-300
        ${
          activePath.startsWith(link.href)
            ? "text-red-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-600"
            : "text-foreground/60 hover:text-red-600 hover:scale-[1.06]"
        }
        after:content-['']
        after:absolute after:bottom-0 after:left-0
        after:transition-all after:duration-300
        hover:after:w-full
      `}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Profile + Dropdown */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-secondary">
              <Image src="/Guy.png" alt="Face" height={100} width={100} />
            </div>
            <span className="hidden sm:inline font-medium">Dabas</span>
            <ChevronDownIcon className="w-5 h-5 text-foreground/60" />
          </div>
        </nav>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-background/90 backdrop-blur-lg w-full absolute z-40 mt-2 rounded-lg shadow-xl p-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`
                block px-3 py-2 text-base font-medium rounded-lg 
                ${
                  activePath.startsWith(link.href)
                    ? "bg-red-700/30 text-red-600"
                    : "text-foreground/70 hover:bg-red-700/10 hover:text-red-600"
                }
              `}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};
