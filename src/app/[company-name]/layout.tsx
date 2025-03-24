"use client";
import SdkNavbar from "@/components/navbar";
import SdkSidebar from "@/components/sidebar";

import localFont from "next/font/local";
import { useState } from "react";

const SKDsFontAp = localFont({ 
  src: '../../../public/fonts/apercu_regular_pro.otf',
  fallback:['sans-serif' ]
})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  return (
      <>
        <SdkNavbar/>
        <SdkSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} setIsHovered={setIsHovered} isHovered={isHovered}/>
        <section className={`${SKDsFontAp.className} hero_section`} style={{ left: isCollapsed ? "2rem" : "240px", width: `calc(100% - ${isCollapsed ? "2.5rem" : "250px"})` }}>
          {children}
        </section>
      </>
  );
}