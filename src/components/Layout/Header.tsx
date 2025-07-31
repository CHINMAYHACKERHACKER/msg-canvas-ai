import { Search, Bell, User, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export function Header() {
  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search campaigns, templates, bots..."
            className="pl-10 bg-background"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button className="bg-gradient-primary hover:opacity-90">
            <Plus className="w-4 h-4 mr-2" />
            New Campaign
          </Button>
          
          <div className="relative">
            <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
              <Bell className="w-5 h-5" />
            </Button>
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-destructive">
              3
            </Badge>
          </div>

          <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}