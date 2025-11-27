"use client";
import DashBoardSideBar from "../components/SideBar";
import { BillsAndPaymentLinks } from "../src/allLinks";

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <DashBoardSideBar items={BillsAndPaymentLinks} />
      {children}
    </div>
  );
}
export default RootLayout;
