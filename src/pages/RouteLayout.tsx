import Footer from "@/components/ui/layouts/Footer";
import Header from "@/components/ui/layouts/Header";
import { Outlet } from "react-router";

function RouteLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default RouteLayout;
