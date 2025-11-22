"use client";
import DashBoardSideBar from "../components/SideBar";
import { DashBoardlinks } from "../src/allLinks";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <DashBoardSideBar items={DashBoardlinks} />
      {children}
    </div>
  );
}
