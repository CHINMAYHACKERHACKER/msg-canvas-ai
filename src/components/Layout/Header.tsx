import { useState } from "react";
import { Search, Bell, User, Plus, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CreateCampaignDialog } from "@/components/Campaign/CreateCampaignDialog";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export function Header() {
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <>
      <CreateCampaignDialog 
        open={showCreateCampaign} 
        onOpenChange={setShowCreateCampaign} 
      />
    <header className="bg-card border-b border-border px-6 py-3.5">
      <div className="flex items-center justify-end">
        {/* Actions */}
        <div className="flex items-center gap-4 justify-end">
          {/* <Button 
            className="bg-gradient-primary hover:opacity-90"
            onClick={() => setShowCreateCampaign(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Campaign
          </Button> */}
          
          <div className="relative">
            <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
              <Bell className="w-5 h-5" />
            </Button>
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-destructive">
              3
            </Badge>
          </div>

          <ThemeToggle size="sm" />

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden md:block">
              {user?.name || user?.email}
            </span>
            <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
              <User className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-9 px-3 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
    </>
  );
}