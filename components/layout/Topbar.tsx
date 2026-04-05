"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { 
  Search01Icon, 
  ShieldCheck, 
  ViewIcon, 
  Notification03Icon,
  UserIcon,
  Logout01Icon,
  Settings02Icon
} from "@hugeicons/core-free-icons";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRole } from "@/context/RoleContext";

export function Topbar() {
  const { role, toggleRole } = useRole();

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 sticky top-0 z-20 w-full justify-between bg-background">
      <div className="flex items-center gap-2">
        
        {/* Responsive Search: Hidden on extra small screens */}
        <div className="relative hidden border rounded-full sm:block w-48 md:w-64 lg:w-96 transition-all">
          <HugeiconsIcon 
            icon={Search01Icon} 
            size={18} 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" 
          />
          <Input 
            placeholder="Search..." 
            className="pl-10 bg-background/25 focus-visible:ring-1 h-9"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="text-slate-500 h-9 w-9">
          <HugeiconsIcon icon={Notification03Icon} size={20} />
        </Button>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0 overflow-hidden border">
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">John Doe</p>
                <p className="text-xs leading-none text-muted-foreground">
                  john.doe@example.com
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  Role: {role}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {/* Role Switch Logic */}
            <DropdownMenuItem onClick={toggleRole} className="cursor-pointer">
              <HugeiconsIcon 
                icon={role === "admin" ? ViewIcon : ShieldCheck} 
                size={16} 
                className="mr-2 text-primary" 
              />
              Switch to {role === "admin" ? "Viewer" : "Admin"} Mode
              
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-rose-600">
              <HugeiconsIcon icon={Logout01Icon} size={16} className="mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ModeToggle />
      </div>
    </header>
  );
}