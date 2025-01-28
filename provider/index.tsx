import React from "react";
import { ClerkProvider } from "@clerk/nextjs";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return <ClerkProvider appearance={{
    layout:{
        logoImageUrl: "/icons/logo.svg",
    },
    variables:{
        colorPrimary: "#0E78F9",
        colorBackground: "#1c1f29",
        colorInputBackground: "#242a49",
        colorInputText: "#ffffff",
        colorText: "#ffffff",
        
    }
  }} >{children}</ClerkProvider>;
};

export default Provider;
