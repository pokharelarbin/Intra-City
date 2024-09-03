"use client";
import { sidebarLinks } from "@/constants/index";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, LogOut, Route } from "lucide-react";
import { TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Tooltip, TooltipContent } from "@radix-ui/react-tooltip";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const pathname = usePathname();
  return (
    <section
      className={cn(
        isSidebarOpen ? "w-[355px]" : "w-[60px]",
        "sticky left-0 top-0 h-screen flex flex-col justify-between bg-[#07012E] pt-8 text-white transition-all duration-300 ease-in-out transform"
      )}
    >
      <nav className="flex flex-col w-full h-full mt-[80px]">
        <div className="flex flex-col w-full">
          {sidebarLinks.map((item: any) => {
            const isActive =
              pathname === item.route || pathname.startsWith(`${item.route}/`);
            return (
              <React.Fragment key={item.label}>
                {isSidebarOpen ? (
                  <Link
                    href={item.route}
                    className={cn(
                      "flex items-center pl-[32px] py-2 h-[60px] hover:bg-[#262245]",
                      {
                        "bg-[#262245]  border-r-4 border-[#02FFFF]": isActive,
                      }
                    )}
                  >
                    <p className="flex text-[16px] font-medium">
                      <span className="mr-2">{item.icon}</span>
                      <span>{item.label}</span>
                    </p>
                  </Link>
                ) : (
                  <div
                    className="flex items-center justify-center"
                    key={item.label}
                  >
                    <TooltipProvider delayDuration={70}>
                      <Tooltip>
                        <TooltipTrigger className="w-full">
                          <Link
                            href={item.route}
                            key={item.label}
                            className={cn(
                              "flex items-center justify-center py-2 h-[60px] hover:bg-[#262245]",
                              {
                                "bg-[#262245]  border-r-4 border-[#02FFFF]":
                                  isActive,
                              }
                            )}
                          >
                            <span className="mr-2">{item.icon}</span>
                            <span className="hidden">{item.label}</span>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent
                          side="left"
                          sideOffset={10}
                          className="px-3 py-1.5 text-xs bg-black bg-opacity-50"
                        >
                          <span>{item.label}</span>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                )}
              </React.Fragment>
            );
          })}
          <hr
            className={cn(
              "opacity-25",
              { "mx-4": isSidebarOpen },
              { "mx-2": !isSidebarOpen }
            )}
          />
          <div
            className={cn(
              "flex items-center mt-auto py-2 h-[60px] hover:bg-[#262245]",
              {
                "justify-center": !isSidebarOpen,
              },
              {
                "pl-[32px]": isSidebarOpen,
              }
            )}
          >
            <p className="flex text-[16px] font-medium">
              <span className="mr-2">
                <LogOut className="w-6 h-6" />
              </span>
              {isSidebarOpen && <span>Sign Out</span>}
            </p>
          </div>
        </div>
      </nav>
      <div className="relative">
        <button
          type="button"
          className="absolute bottom-40 right-[-12px] flex h-6 w-6 items-center justify-center rounded-full bg-[#262245] shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
      </div>
    </section>
  );
};

export default Sidebar;
