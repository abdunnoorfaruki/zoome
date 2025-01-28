"use client";
import Image from "next/image";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const MobileNav = () => {
  const [isMuted, setIsMuted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMuted(true);
  }, []);
  if (!isMuted) return null;
  return (
    <div className="w-full max-w-[264px] lg:hidden">
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            alt="menu"
            width={36}
            height={36}
            className="relative z-10"
          />
        </SheetTrigger>
        <SheetContent title="Zoome" side="left" className="bg-dark-1">
          <Link href="/" className="flex items-center gap-2 text-white">
            <Image
              src="/icons/logo.svg"
              alt="Zoome Logo"
              width={32}
              height={32}
            />
            <p className="text-2xl font-extrabold">Zoome</p>
          </Link>

          <div className="flex flex-col h-[calc(100vh-70px)] justify-between overscroll-y-auto">
            <SheetClose asChild>
              <section className="felx h-full flex-col gap-6 pt-6 text-white">
                {sidebarLinks.map((link) => {
                  const isActive =
                    pathname === link.route ;
                  return (
                    <SheetClose asChild key={link.route}>
                      <Link
                        href={link.route}
                        key={link.label}
                        className={cn(
                          "flex gap-4 items-center p-4 rounded-lg w-full relative overflow-hidden group",
                          {
                            "before:absolute before:inset-0 before:bg-pink-1 before:animate-slide-top":
                              isActive,
                          }
                        )}
                      >
                        <Image
                          src={link.icon}
                          alt={link.label}
                          width={20}
                          height={20}
                          className="relative z-10"
                        />
                        <p className=" font-semibold relative z-10">{link.label}</p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
