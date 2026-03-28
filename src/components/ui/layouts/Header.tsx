import { siteConfig } from "@/config/site";
import MainNavigation from "./MainNavigation";
import { MobileNavigation } from "./MobileNavigation";
import { ModeToggle } from "@/components/mode-toggle";
import AuthDropDown from "@/pages/Auth/AuthDropDown";
import { User } from "@/data/images/user";

function Header() {
  return (
    <header className="w-full sticky z-10 top-0 bg-background border-b">
      <div className="flex mx-auto container   h-16 items-center">
        <MainNavigation items={siteConfig.mainNav} />
        <MobileNavigation items={siteConfig.mainNav} />
        <div className="flex items-center justify-end flex-1 gap-2 lg:mr-0 mr-3">
          <ModeToggle />
          <AuthDropDown users={User} />
        </div>
      </div>

    </header>
  );
}

export default Header;