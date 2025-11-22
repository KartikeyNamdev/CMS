"use client";
import DashBoardSideBar from "../components/SideBar";
import { userManagementLinks } from "../src/allLinks";

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
