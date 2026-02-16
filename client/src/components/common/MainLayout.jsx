import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import RightPanel from "./RightPanel";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-l from-white via-soft/100">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">

          <div className="md:col-span-3">
            <Sidebar />
          </div>

          <div className="md:col-span-6">
            <Outlet />
          </div>

          <div className="hidden md:block md:col-span-3">
            <RightPanel />
          </div>

        </div>
      </div>
    </div>
  );
}