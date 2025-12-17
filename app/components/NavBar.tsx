"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Bell, X } from "lucide-react";

// Dummy user data
const userInfo = {
  name: "Dabas",
  email: "vaishnaviskill@gmail.com",
  role: "Owner",
  company: "Dabas EV Charge",
};

// Dummy notifications
interface Notification {
  id: number;
  status: "success" | "failure" | "warning";
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
}

const dummyNotifications: Notification[] = [
  {
    id: 1,
    status: "success",
    title: "New User Added",
    description: "Kartikey has been added.",
    timestamp: "2 min ago",
    read: false,
  },
  {
    id: 2,
    status: "failure",
    title: "Payment Failed",
    description: "Transaction ID 123 failed.",
    timestamp: "15 min ago",
    read: false,
  },
  {
    id: 3,
    status: "failure",
    title: "Station Offline",
    description: "Station XYZ unreachable.",
    timestamp: "1 hour ago",
    read: false,
  },
  {
    id: 4,
    status: "success",
    title: "Charger Reconnected",
    description: "Charger-5 back online.",
    timestamp: "2 hours ago",
    read: true,
  },
];

export const NavBar = () => {
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(dummyNotifications);

  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  const path = usePathname();
  const router = useRouter();
  const activePath = "/" + (path.split("/")[1] || "");

  const navLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Company Management", href: "/company" },
    { name: "Charger management", href: "/charger" },
    { name: "User management", href: "/user" },
    { name: "Billing & Payments", href: "/bills" },
    { name: "Complaints", href: "/complaints" },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfileCard(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNotificationClick = (notificationId: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
    );
    router.push("/notifications");
  };

  const getStatusColor = (status: string) => {
    if (status === "success") return "bg-green-500";
    if (status === "failure") return "bg-red-500";
    if (status === "warning") return "bg-yellow-500";
    return "bg-gray-500";
  };

  return (
    <div className="w-full flex justify-center mt-4 px-4 pointer-events-none">
      <nav className="pointer-events-auto w-full max-w-[96%] h-18 px-8 flex items-center justify-between bg-background/80 backdrop-blur-lg border border-gray-400/50 rounded-xl shadow-lg relative z-[9997]">
        {/* Logo */}
        <Image src="/logo1.png" alt="DABAS logo" height={40} width={100} />

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative pb-2 text-md font-medium transition-all duration-300 ${
                activePath.startsWith(link.href)
                  ? "text-red-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-600"
                  : "text-foreground/60 hover:text-red-600"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Side: Notification + Profile */}
        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-full hover:bg-gray-100 transition z-10000"
            >
              <Bell className="w-6 h-6 text-foreground/60" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-9998"
                  onClick={() => setShowNotifications(false)}
                />

                {/* Dropdown */}
                <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-200 shadow-xl rounded-xl z-9999 overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-2 border-gray-200 border-b-gray-300 bg-gray-50">
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        Notifications
                      </h3>
                      <p className="text-xs text-gray-500">
                        {unreadCount} unread
                      </p>
                    </div>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="p-1 hover:bg-gray-200 rounded-full"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* List */}
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => handleNotificationClick(notif.id)}
                        className={`p-3 border-b  border-b-gray-400 cursor-pointer hover:bg-gray-100 ${
                          !notif.read ? "bg-blue-50/30" : ""
                        }`}
                      >
                        <div className="flex gap-3">
                          <div
                            className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${getStatusColor(
                              notif.status
                            )}`}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between gap-2">
                              <h4 className="text-sm font-semibold text-gray-800 truncate">
                                {notif.title}
                              </h4>
                              {!notif.read && (
                                <span className="w-2 h-2 bg-blue-600 rounded-full mt-1" />
                              )}
                            </div>
                            <p className="text-xs text-gray-600 mt-1">
                              {notif.description}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {notif.timestamp}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="p-3 bg-gray-50 border-t border-t-gray-300 text-center">
                    <Link
                      href="/notifications"
                      onClick={() => setShowNotifications(false)}
                      className="text-sm font-semibold text-red-600 hover:text-red-700"
                    >
                      View All →
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfileCard(!showProfileCard)}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition z-[10000]"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200">
                <Image src="/Guy.png" alt="Profile" height={100} width={100} />
              </div>
              <span className="hidden sm:inline font-medium text-gray-700">
                {userInfo.name}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  showProfileCard ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Profile Dropdown */}
            {showProfileCard && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-[9998]"
                  onClick={() => setShowProfileCard(false)}
                />

                {/* Dropdown */}
                <div className="absolute right-0 mt-3 w-64 bg-white border border-gray-200 shadow-xl rounded-xl z-[9999] overflow-hidden">
                  {/* Header */}
                  <div className="p-4 bg-gradient-to-br from-red-50 to-orange-50 border-b">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow">
                        <Image
                          src="/Guy.png"
                          alt="Profile"
                          width={100}
                          height={100}
                        />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">
                          {userInfo.name}
                        </p>
                        <p className="text-sm text-gray-600">{userInfo.role}</p>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-4 space-y-2 text-sm">
                    <div>
                      <span className="text-gray-500">Email:</span>
                      <p className="text-gray-800 break-all">
                        {userInfo.email}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Company:</span>
                      <p className="text-gray-800">{userInfo.company}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-4 border-t bg-gray-50 space-y-2">
                    <Link
                      href="/myProfile"
                      onClick={() => setShowProfileCard(false)}
                      className="block text-center py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
                    >
                      View Profile
                    </Link>
                    <button
                      onClick={() => {
                        setShowProfileCard(false);
                        console.log("Logout");
                      }}
                      className="w-full py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};
