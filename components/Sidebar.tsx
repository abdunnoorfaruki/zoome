"use client";
import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <section className="sticky top-0 left-0 flex min-h-screen flex-col justify-betwen bg-dark-1 p-6 pt-28 text-white max-sm:hidden w-fit lg:w-[264px] ">
      <div className="flex flex-col gap-6">
        {sidebarLinks.map((link) => {
          const isActive =
            pathname === link.route ||
            (pathname.startsWith(link.route) && link.route !== "/");
          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn(
                "flex gap-4 items-center p-4 rounded-lg justify-start relative overflow-hidden group",
                {
                  "before:absolute before:inset-0 before:bg-pink-1 before:animate-slide-top": isActive,
                }
              )}
            >
              <Image
                src={link.icon}
                alt={link.label}
                width={24}
                height={24}
                className="relative z-10"
              />
              <p className="text-base font-semibold relative z-10">{link.label}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
