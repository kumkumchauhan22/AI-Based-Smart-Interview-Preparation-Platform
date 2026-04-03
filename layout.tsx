import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { DashboardMobileNav } from "@/components/dashboard-mobile-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <main className="lg:pl-64 pb-20 lg:pb-0">
        {children}
      </main>
      <DashboardMobileNav />
    </div>
  );
}
