import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

interface ChannelCardProps {
  name: string;
  icon: ReactNode;
  status: "connected" | "disconnected" | "pending";
  messagesSent: number;
  successRate: number;
  color: string;
}

export function ChannelCard({ 
  name, 
  icon, 
  status, 
  messagesSent, 
  successRate,
  color 
}: ChannelCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-success text-success-foreground";
      case "disconnected":
        return "bg-destructive text-destructive-foreground";
      case "pending":
        return "bg-warning text-warning-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <Card className="bg-gradient-card border-border hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: color }}
          >
            {icon}
          </div>
          <div>
            <CardTitle className="text-base">{name}</CardTitle>
            <Badge className={`text-xs ${getStatusColor(status)}`}>
              {status}
            </Badge>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <div className="text-2xl font-bold">
              {messagesSent.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Messages sent</div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Success rate</span>
            <span className={`text-sm font-medium ${
              successRate >= 95 ? "text-success" : 
              successRate >= 90 ? "text-warning" : "text-destructive"
            }`}>
              {successRate}%
            </span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                successRate >= 95 ? "bg-success" : 
                successRate >= 90 ? "bg-warning" : "bg-destructive"
              }`}
              style={{ width: `${successRate}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}