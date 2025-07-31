import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  MessageSquare, 
  Send, 
  BarChart3, 
  Users, 
  Bot, 
  Settings,
  ChevronLeft,
  Menu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Bots", href: "/bots", icon: Bot },
  { name: "Templates", href: "/templates", icon: MessageSquare },
  { name: "Campaigns", href: "/campaigns", icon: Send },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Contacts", href: "/contacts", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className={cn(
      "bg-gradient-card border-r border-border h-screen flex flex-col transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg bg-gradient-primary bg-clip-text text-transparent">
                MessageAI
              </span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8 p-0"
          >
            {collapsed ? <Menu className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-lg" 
                  : "hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-colors",
                isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-accent-foreground"
              )} />
              {!collapsed && (
                <span className="font-medium">{item.name}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        {!collapsed && (
          <div className="text-xs text-muted-foreground">
            v2.0.0 - AI Marketing Platform
          </div>
        )}
      </div>
    </div>
  );
}