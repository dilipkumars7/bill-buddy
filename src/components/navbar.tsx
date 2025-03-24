"use client";
import React from 'react'
import './common.css'
import localFont from "next/font/local";
import SdkAvatar from './avatar';
import { cn } from "@/lib/utils"
import { useRouter, useParams  } from "next/navigation"; 
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"


import { User, Bill, Additem, Profile2User } from 'iconsax-react';

const SKDsFontAp = localFont({ 
  src: '../../public/fonts/apercu_regular_pro.otf',
  fallback:['sans-serif' ]
})


function SdkNavigationMenu({ Name, component }: { Name: string, component: any[] }) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{Name}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className={`${SKDsFontAp.className} grid w-[300px] gap-3 p-1 md:grid-cols-2`}>
              {component.map((item) => (
                <ListItem
                  key={item.title}
                  title={item.title}
                  href={item.href}
                  icon={item.icon}
                  className='flex items-left'
                >
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}




export default function SdkNavbar() {
  const params = useParams();
  const OrgName = params['company-name'];
  const Navcomponents = [
    {
      title: "User",
      href: `/${OrgName}/user`,
      icon: <User size="32" color="#0052CC" variant="Bulk"/>
    },
    {
      title: "Items",
      href:  `/${OrgName}/item`,
      icon: <Additem size="32" color="#0052CC" variant="Bulk"/>
    },
    {
      title: "Invoice",
      href: `/${OrgName}/invoice`,
      icon: <Bill size="32" color="#0052CC" variant="Bulk"/>
    },
    {
      title: "Customers",
      href: `/${OrgName}/customer`,
      icon: <Profile2User size="32" color="#0052CC" variant="Bulk"/>
    }
  ]

  return (
    <div className={`${SKDsFontAp.className} tracking-wide h-[56px] z-100 fixed w-full top-0`}>
      <header className='nav-header relative flex'>
        <div className='w-full flex gap-5'>
          <div className='flex items-center gap-4'>
            <span className='text-lg font-bold'>Logo</span>
          </div>
          <div className='flex items-center gap-4'>
            <button className='font-bold'>Home</button>
            <button className='font-bold'>About</button>
            <SdkNavigationMenu Name='Create' component={Navcomponents}></SdkNavigationMenu>
          </div>
        </div>
        <div className='flex items-center h-full gap-4'>
          <SdkAvatar size={34} email="Dilip.Sivam@gmail.com" />
        </div>
      </header>
    </div>
  )
}


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ReactNode; href: string } // Ensure href is required
>(({ className, title, icon, href, ...props }, ref) => {
  const router = useRouter(); // Initialize router

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent default anchor behavior
    router.push(href); // Navigate programmatically
  };

  return (
    <li onClick={handleClick} className="cursor-pointer">
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-[13px] font-medium flex items-center gap-1 w-full h-full">
            {icon && <span>{icon}</span>}
            <span>{title}</span>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";