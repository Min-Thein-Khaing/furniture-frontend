import Footer from "@/components/ui/layouts/Footer";
import Header from "@/components/ui/layouts/Header";
import { Outlet, useNavigation } from "react-router"; // useNavigation ကို import လုပ်ပါ

function RouteLayout() {
  const navigation = useNavigation();

  // navigation.state က "loading" ဖြစ်နေရင် page ကူးနေတာ (သို့) component ဆွဲနေတာပါ
  const isLoading = navigation.state === "loading";

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* ၁။ အပေါ်ဆုံးမှာ ပြေးနေမယ့် Loading Bar (Optional) */}
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-1 z-[9999]">
          <div className="h-full bg-[#db821d] animate-progress-bar"></div>
        </div>
      )}

      <Header />

      {/* ၂။ Page Content အပိုင်း */}
      <main className={`flex-grow transition-opacity duration-300 ${isLoading ? "opacity-50" : "opacity-100"}`}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default RouteLayout;