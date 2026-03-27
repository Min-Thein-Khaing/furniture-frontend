import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { Icons } from "@/ui/icon";
import type { MainNavItem } from "@/types";

interface MainNavProps {
  items: MainNavItem[];
}

const MainNavigation: React.FC<MainNavProps> = ({ items }) => {
  return (
    <div className="gap-4 items-center hidden lg:flex">
      {/* Logo */}
      <Link to="/" className="flex gap-1 items-center">
        <Icons.logo className="size-6" />
        <p className="font-medium">Furniture</p>
      </Link>

      <NavigationMenu>
        <NavigationMenuList>
          {items.map((item, index) => (
            <NavigationMenuItem key={index}>
              <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>

              <NavigationMenuContent>
                <div className="grid grid-cols-1 gap-4 p-4 w-125">
                  {/* LEFT: card */}
                  <ul className="space-y-2">
                    {item.card?.map((card, i) => (
                      <li key={i}>
                        <NavigationMenuLink asChild>
                          <Link to={card.href || "/"}>
                            <div className="font-medium">{card.title}</div>
                            <p className="text-sm text-muted-foreground">
                              {card.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
          <NavigationMenuItem>
            <ul className="flex gap-4">
              {items[0].menu?.map((menuItem, index) => (
                <li key={index}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={menuItem.href || "/"}
                      className="flex gap-1 items-center"
                    >
                      <p className="font-medium">{menuItem.title}</p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default MainNavigation;
