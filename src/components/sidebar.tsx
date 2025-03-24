"use client";
import React, {  } from 'react';
import './sidebar.css';
import localFont from 'next/font/local';
import { User, Additem, Grid5, Profile2User, Bill, ArrowCircleRight } from 'iconsax-react';
import { useRouter, usePathname, useParams } from 'next/navigation';

const SKDsFontAp = localFont({ 
  src: '../../public/fonts/apercu_regular_pro.otf',
  fallback: ['sans-serif']
});

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  setIsHovered: (value: boolean) => void;
  isHovered:boolean
}

export default function SdkSidebar({ isCollapsed, setIsCollapsed, setIsHovered, isHovered }:SidebarProps) {

  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const OrgName = params['company-name'];

  const Sidecomponents = [
    {
      title: "Dashboard",
      href: `/${OrgName}/home`,
      icon: Grid5
    },
    {
      title: "Items",
      href: `/${OrgName}/item`,
      icon: Additem
    },
    {
      title: "User",
      href: `/${OrgName}/user`,
      icon: User
    },
    {
      title: "Customers",
      href: `/${OrgName}/customer`,
      icon: Profile2User
    },
    {
      title: "Invoice",
      href: `/${OrgName}/invoice`,
      icon: Bill
    }

  ];

  return (
    <div id="sidebar" className={`${SKDsFontAp.className} h-full fixed left-0 top-[56px] sidebar ${isCollapsed && isHovered ? "collapsed" : ""} group`} onMouseEnter={() => setIsHovered(false)} onMouseLeave={() => setIsHovered(true)}>
      <div className={`absolute -right-[12px] z-10 top-5 toogle-btn ${!isCollapsed ? "hidden" : ""} group-hover:block transition-opacity duration-300`} onClick={() => setIsCollapsed(!isCollapsed)}>
        <ArrowCircleRight size="25"  className={`arrow-icon cursor-pointer ${isCollapsed ? "rotate-right" : "rotate-left"}`}/>
      </div>
      <div>
        <div className="sidebar-header mt-5 hide">
          <h2 className="text-2xl font-bold text-center">SDKs</h2>
        </div>
      </div>
      <div className="sidebar-links-wrapper">
        <div className="sidebar-links hide">
          <ul>
            {Sidecomponents.map((item, index) => {
              const isActive = pathname === item.href;
              return(
                <li key={index}>
                  <a onClick={() => router.push(item.href)} title={item.title} className={`tooltip px-2 py-2 pl-3 cursor-pointer ${isActive ? "active-route" : ""}`}>
                  <item.icon 
                      size={isActive ? 22 : 22}
                      variant={isActive ? "Bold" : "Outline"} 
                      color={isActive ? "#0052CC" : "#505050"}
                      strokeWidth={isActive ? 0 : 0.3}
                    />
                    <span className="link hide">{item.title}</span>
                  </a>
                </li>
              )
            })} 
          </ul>
        </div>
      </div>
    </div>
  );
}
