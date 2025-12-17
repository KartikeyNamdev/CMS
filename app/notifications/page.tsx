"use client";

import { useState, useMemo } from "react";
import Card from "@/app/components/Card";
import { BellIcon, FilterIcon, CheckIcon, XIcon } from "lucide-react";

interface Notification {
  id: number;
  status: "success" | "failure" | "warning";
  type: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  details?: string;
}

const dummyNotifications: Notification[] = [
  {
    id: 1,
    status: "success",
    title: "New User Added",
    description: "Kartikey has been added to the system successfully.",
    type: "user",
    timestamp: "2 min ago",
    read: false,
    details:
      "User Kartikey (kartikey@example.com) was added with Admin privileges.",
  },
  {
    id: 2,
    status: "failure",
    title: "Payment Failed",
    description: "Transaction for ID 123 failed due to insufficient funds.",
    type: "payment",
    timestamp: "15 min ago",
    read: false,
    details: "Payment of ₹5,000 for invoice #123 was declined. Please retry.",
  },
  {
    id: 3,
    status: "failure",
    title: "Station Offline",
    description: "Station XYZ is unreachable and may require maintenance.",
    type: "station",
    timestamp: "1 hour ago",
    read: false,
    details:
      "Station XYZ (ID: STN-456) has been offline for 1 hour. Last seen at 2:30 PM.",
  },
  {
    id: 4,
    status: "success",
    title: "User Removed",
    description: "Rishika was removed from the system.",
    type: "user",
    timestamp: "2 hours ago",
    read: true,
    details:
      "User Rishika (rishika@example.com) was successfully removed by Admin.",
  },
  {
    id: 5,
    status: "success",
    title: "Charger Reconnected",
    description: "Charger-5 connected back successfully after maintenance.",
    type: "charger",
    timestamp: "2 hours ago",
    read: true,
    details: "Charger-5 (OCPP-005) is now online and ready for use.",
  },
  {
    id: 6,
    status: "warning",
    title: "Invoice Pending Review",
    description: "Invoice #456 needs your review and approval.",
    type: "invoice",
    timestamp: "3 hours ago",
    read: true,
    details:
      "Invoice #456 for ₹12,500 is pending approval. Due date: Dec 20, 2025.",
  },
  {
    id: 7,
    status: "failure",
    title: "Charger Error",
    description: "Charger-3 reported a critical error.",
    type: "charger",
    timestamp: "4 hours ago",
    read: true,
    details: "Error code E-203: Power supply issue detected on Charger-3.",
  },
  {
    id: 8,
    status: "success",
    title: "Payment Received",
    description: "Payment of ₹8,500 received for invoice #789.",
    type: "payment",
    timestamp: "5 hours ago",
    read: true,
    details:
      "Payment successfully processed via UPI. Transaction ID: TXN-9876543210.",
  },
];

const filterTypes = ["All", "user", "payment", "charger", "station", "invoice"];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(dummyNotifications);
  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Filter notifications
  const filteredNotifications = useMemo(() => {
    if (activeFilter === "All") return notifications;
    return notifications.filter((n) => n.type === activeFilter);
  }, [activeFilter, notifications]);

  // Count by type
  const counts = useMemo(() => {
    const result: Record<string, number> = { All: notifications.length };
    filterTypes.slice(1).forEach((type) => {
      result[type] = notifications.filter((n) => n.type === type).length;
    });
    return result;
  }, [notifications]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    if (expandedId === id) setExpandedId(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800 border-green-300";
      case "failure":
        return "bg-red-100 text-red-800 border-red-300";
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return "✓";
      case "failure":
        return "✕";
      case "warning":
        return "⚠";
      default:
        return "ℹ";
    }
  };

  return (
    <div className="p-6 lg:px-20">
      <Card className="p-8 bg-white">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <BellIcon className="w-7 h-7 text-red-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Notifications
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {unreadCount > 0
                  ? `You have ${unreadCount} unread notification${
                      unreadCount !== 1 ? "s" : ""
                    }`
                  : "You're all caught up!"}
              </p>
            </div>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
            >
              <CheckIcon className="w-4 h-4" />
              Mark All as Read
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <FilterIcon className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-semibold text-gray-700">
              Filter by Type:
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {filterTypes.map((type) => (
              <button
                key={type}
                onClick={() => setActiveFilter(type)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${
                    activeFilter === type
                      ? "bg-red-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }
                `}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
                <span className="ml-2 text-xs opacity-75">
                  ({counts[type] || 0})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-16">
              <BellIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 text-lg">No notifications found</p>
              <p className="text-gray-400 text-sm mt-2">
                {activeFilter !== "All"
                  ? `No ${activeFilter} notifications available`
                  : "You're all caught up!"}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notif) => (
              <div
                key={notif.id}
                className={`
                  border rounded-lg transition-all
                  ${
                    !notif.read
                      ? "bg-blue-50/50 border-blue-200"
                      : "bg-white border-gray-200"
                  }
                  ${expandedId === notif.id ? "shadow-lg" : "hover:shadow-md"}
                `}
              >
                {/* Main notification row */}
                <div
                  onClick={() =>
                    setExpandedId(expandedId === notif.id ? null : notif.id)
                  }
                  className="p-4 cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    {/* Status Icon */}
                    <div
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        flex-shrink-0 font-bold text-base border
                        ${getStatusColor(notif.status)}
                      `}
                    >
                      {getStatusIcon(notif.status)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="text-base font-semibold text-gray-800">
                          {notif.title}
                        </h3>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {!notif.read && (
                            <span className="w-2.5 h-2.5 bg-blue-600 rounded-full" />
                          )}
                          <span className="text-xs text-gray-500">
                            {notif.timestamp}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {notif.description}
                      </p>

                      {/* Type badge */}
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">
                        {notif.type}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedId === notif.id && (
                  <div className="px-4 pb-4 pt-2 border-t border-gray-200 bg-gray-50/50">
                    <p className="text-sm text-gray-700 mb-4">
                      {notif.details || "No additional details available."}
                    </p>
                    <div className="flex gap-2">
                      {!notif.read && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsRead(notif.id);
                          }}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors flex items-center gap-1"
                        >
                          <CheckIcon className="w-4 h-4" />
                          Mark as Read
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notif.id);
                        }}
                        className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 text-sm rounded-lg transition-colors flex items-center gap-1"
                      >
                        <XIcon className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
