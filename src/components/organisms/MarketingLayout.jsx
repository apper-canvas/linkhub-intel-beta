import { Outlet } from "react-router-dom";
import MarketingHeader from "@/components/organisms/MarketingHeader";
import MarketingFooter from "@/components/organisms/MarketingFooter";

const MarketingLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <MarketingHeader />
      <main>
        <Outlet />
      </main>
      <MarketingFooter />
    </div>
  );
};

export default MarketingLayout;