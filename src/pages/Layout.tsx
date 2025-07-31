import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/Layout/Sidebar";
import { Header } from "@/components/Layout/Header";

export default function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6 overflow-auto">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-bg opacity-50 pointer-events-none" />
              <div className="relative z-10">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}