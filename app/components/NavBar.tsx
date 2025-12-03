"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDownIcon } from "lucide-react";

// Dummy user data (replace later with hook)
const userInfo = {
  name: "Dabas",
  email: "vaishnaviskill@gmail.com",
  role: "Owner",
  company: "Dabas EV Charge",
};

export const NavBar = () => {
  const [showProfileCard, setShowProfileCard] = useState(false);
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
                  relative pb-2 text-md font-medium transition-all duration-300
                  ${
                    activePath.startsWith(link.href)
                      ? "text-red-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-600"
                      : "text-foreground/60 hover:text-red-600 hover:scale-[1.06]"
                  }
                `}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* PROFILE + HOVER CARD */}
          <div
            className="relative flex items-center gap-3 cursor-pointer"
            onMouseEnter={() => setShowProfileCard(true)}
            onMouseLeave={() => setShowProfileCard(false)}
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-secondary">
                <Image src="/Guy.png" alt="Face" height={100} width={100} />
              </div>

              <span className="hidden sm:inline font-medium">
                {userInfo.name}
              </span>
              <ChevronDownIcon className="w-5 h-5 text-foreground/60" />
            </div>

            {/* 🔥 HOVER POPUP */}
            {showProfileCard && (
              <div
                className="
                  absolute right-0 mt-24 w-64 p-4
                  bg-background/90 backdrop-blur-xl 
                  border border-gray-300/50 shadow-xl 
                  rounded-xl z-50 animate-fadeIn
                "
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-secondary">
                    <Image src="/Guy.png" alt="Face" width={100} height={100} />
                  </div>
                  <div>
                    <p className="text-md font-semibold">{userInfo.name}</p>
                    <p className="text-sm text-gray-500">{userInfo.role}</p>
                  </div>
                </div>

                <div className="border-t border-gray-300/40 my-3" />

                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Email: </span>
                  {userInfo.email}
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-semibold">Company: </span>
                  {userInfo.company}
                </p>

                <Link
                  href="/myProfile"
                  className="
                    block mt-4 text-center py-2 rounded-lg
                    bg-red-600 text-white font-semibold text-sm 
                    hover:bg-red-700 transition
                  "
                >
                  View Profile
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* (Optional) Mobile Menu remains same */}
    </>
  );
};
