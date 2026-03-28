import type { MainNavItem } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useEffect, useState, type FC } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router";
import { Icons } from "@/ui/icon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
interface MainNavProps {
  items: MainNavItem[];
}
export const MobileNavigation: FC<MainNavProps> = ({ items }) => {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  const query = "(min-width: 1024px)";
  useEffect(() => {
    const result = window.matchMedia(query);
    setIsDesktop(result.matches);
    const listener = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
      console.log("screen size changed");
    };

   
    result.addEventListener("change", listener);

    
    return () => result.removeEventListener("change", listener);
  }, [query]);
  if (isDesktop) {
    return null;
  }
  return (
    <div className="lg:hidden p-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={"ghost"} size={"icon"}>
            <Menu />
            <span className="sr-only">toggle button</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation Menu</SheetTitle>
            <SheetDescription>
              Browse our products and categories through the side navigation.
            </SheetDescription>
          </SheetHeader>
          <SheetClose asChild>
            <Link to="/" className="flex gap-1 p-3 items-center border-b-2">
              <Icons.logo className="size-6" />
              <p className="font-medium">Furniture</p>
            </Link>
          </SheetClose>
          <ScrollArea className="-my-7 flex-1 ">
            <Accordion
              type="multiple"
              className="max-w-lg mt-2 px-4"
              defaultValue={["item-0"]}
            >
              {items.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  {/* Trigger */}
                  <AccordionTrigger className="text-md hover:no-underline cursor-pointer font-medium [&>svg]:h-5 [&>svg]:w-5">
                    {item.title}
                  </AccordionTrigger>
                  {/* Content */}
                  <AccordionContent>
                    <ul className="">
                      {item.card?.map((card, i) => (
                        <SheetClose asChild>
                          <Link to={card.href || "/"}>
                            <li
                              key={i}
                              className="mb-2 px-2 text-foreground/80"
                            >
                              {card.title}
                            </li>
                          </Link>
                        </SheetClose>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="flex flex-col px-4 border-t-2    mx-auto container font-normal">
              {items[0].menu
                ? items[0].menu.map((item, index) => (
                    <SheetClose asChild key={index}>
                      <Link to={item.href as string} className="">
                        <p className="text-md font-medium py-[0.5] mt-2">
                          {item.title}
                        </p>
                      </Link>
                    </SheetClose>
                  ))
                : null}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
};
