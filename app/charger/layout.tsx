"use client";
import DashBoardSideBar from "../components/SideBar";
import { ChargerManageMentLinks } from "../src/allLinks";

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <DashBoardSideBar items={ChargerManageMentLinks} />
      {children}
    </div>
  );
}
export default RootLayout;
