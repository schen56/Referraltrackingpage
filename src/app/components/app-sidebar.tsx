import {
  ClipboardCheck,
  CalendarDays,
  User,
  MessageSquare,
  ListChecks,
  Home,
  CreditCard,
  Wrench,
  Settings,
  Gift,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

type MenuItem = {
  title: string;
  icon: React.ReactNode;
  path: string;
  active?: boolean;
  kind?: "link" | "divider" | "header" | "promo";
  notifications?: number;
};

const MENU_ITEMS: MenuItem[] = [
  {
    title: "Projects",
    icon: <ClipboardCheck className="size-4" />,
    path: "/projects/",
    kind: "link",
  },
  {
    title: "Appointments",
    icon: <CalendarDays className="size-4" />,
    path: "/my-appointments/",
    kind: "link",
  },
  { title: "", icon: null, path: "", kind: "divider" },
  {
    title: "Profile",
    icon: <User className="size-4" />,
    path: "/profile/",
    kind: "link",
  },
  {
    title: "Messages",
    icon: <MessageSquare className="size-4" />,
    path: "/messages/",
    kind: "link",
  },
  {
    title: "Tasks",
    icon: <ListChecks className="size-4" />,
    path: "/tasks/",
    kind: "link",
    notifications: 2,
  },
  {
    title: "Properties",
    icon: <Home className="size-4" />,
    path: "/properties/",
    kind: "link",
  },
  {
    title: "Payments",
    icon: <CreditCard className="size-4" />,
    path: "/payments/",
    kind: "link",
  },
  {
    title: "Support",
    icon: <Wrench className="size-4" />,
    path: "/support/",
    kind: "link",
  },
  {
    title: "Settings",
    icon: <Settings className="size-4" />,
    path: "/settings/",
    kind: "link",
  },
  { title: "", icon: null, path: "", kind: "divider" },
  {
    title: "Logout",
    icon: <LogOut className="size-4" />,
    path: "/logout/",
    kind: "link",
  },
];

function SidebarContent({ onItemClick }: { onItemClick?: () => void }) {
  return (
    <div className="flex flex-col h-full">
      <ul className="flex-1">
        {MENU_ITEMS.map((item, index) => {
          if (item.kind === "divider") {
            return <hr key={index} className="border-gray-200 my-1" />;
          }

          return (
            <li key={index}>
              <a
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  onItemClick?.();
                }}
                className={`flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-100 transition-colors
                  ${item.active ? "text-blue-600 bg-blue-50 font-medium" : "text-gray-700"}`}
              >
                <span
                  className={
                    item.active ? "text-blue-600" : "text-gray-500"
                  }
                >
                  {item.icon}
                </span>
                <span className="flex-1">{item.title}</span>
                {item.notifications ? (
                  <span className="bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                    {item.notifications}
                  </span>
                ) : null}
              </a>
            </li>
          );
        })}
      </ul>

      {/* Referral promo button at bottom */}
      <div className="p-4 pt-2">
        <a
          href="/referrals/"
          onClick={(e) => {
            e.preventDefault();
            onItemClick?.();
          }}
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 border-2 border-amber-400 text-amber-700 rounded-lg font-medium text-sm hover:bg-amber-50 transition-colors"
        >
          <Gift className="size-4" />
          Refer and Earn
        </a>
      </div>
    </div>
  );
}

export function AppSidebar({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex justify-center min-h-screen bg-gray-50">
      <div className="flex w-full max-w-[1180px] px-0 md:px-5">
        {/* Desktop sidebar */}
        <div className="hidden md:block w-48 min-w-48 shrink-0 pt-5">
          <div className="sticky top-5 bg-white rounded-xl shadow-sm border border-gray-200 py-2.5 overflow-hidden">
            <div className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
              John Smith
            </div>
            <SidebarContent />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 ml-0 md:ml-5 w-full">
          {/* Mobile header */}
          <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
            <span className="font-semibold text-gray-900">Ergeon</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="size-5" />
            </Button>
          </div>

          {/* Page content */}
          <div className="p-4 md:py-5 md:px-0">{children}</div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-gray-800/20 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="absolute top-0 right-0 w-80 max-w-full h-full bg-white shadow-lg rounded-l-xl animate-in slide-in-from-right duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4">
              <h4 className="font-semibold">John Smith</h4>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileOpen(false)}
              >
                <X className="size-5" />
              </Button>
            </div>
            <SidebarContent onItemClick={() => setMobileOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
