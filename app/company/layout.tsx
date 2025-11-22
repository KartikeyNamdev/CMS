"use client";
import DashBoardSideBar from "../components/SideBar";
import { CompanyManageMentLinks } from "../src/allLinks";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <DashBoardSideBar items={CompanyManageMentLinks} />
      {children}
    </div>
  );
}
