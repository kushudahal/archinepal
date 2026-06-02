import { DashboardSidebar } from "@/layouts/dashboard-sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-stonewash p-4 md:p-6">
      <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
        <DashboardSidebar />
        {children}
      </div>
    </main>
  );
}
