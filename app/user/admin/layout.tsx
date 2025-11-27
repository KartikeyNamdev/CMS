"use client";

import DashBoardSideBar from "@/app/components/SideBar";
import { userManagementLinks } from "@/app/src/allLinks";

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <DashBoardSideBar items={userManagementLinks} />

      {children}
    </div>
  );
}
export default RootLayout;
