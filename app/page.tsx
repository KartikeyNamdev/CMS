"use client";

import { useInitializeStore } from "@/store/useDataStore";
import { BoltIcon, UserIcon } from "@heroicons/react/24/solid";
import { Building, ChartArea, LogsIcon, Receipt } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Home() {
  useInitializeStore(); // Initialize once at root

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* --- Background Glow --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-red-700/30 blur-[160px]" />
        <div className="absolute top-40 right-0 w-[500px] h-[500px] rounded-full bg-red-600/20 blur-[180px]" />
      </div>

      {/* --- Main Container --- */}
      <main className="relative z-10 flex flex-col items-center text-center px-6 pt-32 pb-24">
        {/* -------- HERO -------- */}
        <h1 className="text-5xl font-bold tracking-tight mb-4 text-foreground">
          DABAS EV CMS
        </h1>

        <p className="max-w-2xl text-lg text-foreground/70 leading-relaxed">
          A powerful, real-time, multi-tenant Control & Management System
          designed for EV Charging Networks — built with scalability, analytics,
          and operational excellence at its core.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4 mt-8">
          <Link
            href="/dashboard"
            className="px-6 py-3 rounded-lg bg-[#b22828] text-white font-medium shadow-lg hover:bg-red-700 transition"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/company"
            className="px-6 py-3 rounded-lg border border-border text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition"
          >
            Explore CMS
          </Link>
        </div>

        {/* --------- FEATURES SECTION --------- */}
        <section className="w-full max-w-5xl mt-24 grid md:grid-cols-3 gap-8">
          {/* Card */}
          <FeatureCard
            title="Real-Time Charger Monitoring"
            desc="Track charger status, live sessions, fault alerts, energy metrics and usage patterns instantly."
            icon={<BoltIcon />}
          />

          <FeatureCard
            title="Advanced Billing Engine"
            desc="Automated energy-based billing, session summaries, invoices, revenue analytics and GST-ready logs."
            icon={<Receipt />}
          />

          <FeatureCard
            title="User & Access Management"
            desc="Secure authentication, role-based permissions and multi-organization support."
            icon={<UserIcon />}
          />

          {/* Card */}
          <FeatureCard
            title="Company & Fleet Management"
            desc="Manage operators, fleets, access groups and organizational hierarchies effortlessly."
            icon={<Building />}
          />

          <FeatureCard
            title="Analytics Dashboard"
            desc="Beautiful, interactive charts for transactions, revenue, utilization and energy flow."
            icon={<ChartArea />}
          />

          <FeatureCard
            title="Comprehensive Logs"
            desc="Session logs, charger logs, complaints handling, incident reports and more."
            icon={<LogsIcon />}
          />
        </section>

        {/* ---- FOOTER ---- */}
        <footer className="mt-32 text-foreground/50 text-sm">
          © {new Date().getFullYear()} DABAS EV CMS — Designed & Engineered with
          ❤️
        </footer>
      </main>
    </div>
  );
}

/* --- FEATURE CARD COMPONENT --- */
function FeatureCard({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode | string;
}) {
  return (
    <div
      className="
      p-6 rounded-2xl
      bg-background/60 backdrop-blur-xl
      border border-white/30
      shadow-md hover:shadow-2xl transition
      flex flex-col items-center text-center
    "
    >
      <div className="w-14 h-14 relative mb-4">
        {typeof icon === "string" ? (
          // IMAGE / FAVICON
          <Image
            src={icon}
            alt={title}
            width={58}
            height={58}
            className="object-contain"
          />
        ) : (
          // REACT COMPONENT ICON
          <div className="text-foreground/90 w-10 h-10">{icon}</div>
        )}
      </div>

      <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>

      <p className="text-foreground/70 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
