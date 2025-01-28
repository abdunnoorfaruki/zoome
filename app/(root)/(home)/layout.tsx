import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import React from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <section
          className="flex-1 min-h-screen flex flex-col px-6 pb-8 pt-28 max-md:pb14
         sm:px-14"
        >
          <div className="w-full">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default HomeLayout;
