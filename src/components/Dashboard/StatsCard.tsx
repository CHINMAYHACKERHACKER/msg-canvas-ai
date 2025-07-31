import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change: string;
  changeType: "increase" | "decrease";
  icon: ReactNode;
}

export function StatsCard({ title, value, change, changeType, icon }: StatsCardProps) {
  return (
    <Card className="bg-gradient-card border-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="text-muted-foreground">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center gap-1 mt-1">
          {changeType === "increase" ? (
            <TrendingUp className="w-4 h-4 text-success" />
          ) : (
            <TrendingDown className="w-4 h-4 text-destructive" />
          )}
          <Badge 
            variant="secondary" 
            className={`text-xs ${
              changeType === "increase" ? "text-success" : "text-destructive"
            }`}
          >
            {change}
          </Badge>
          <span className="text-xs text-muted-foreground ml-1">from last month</span>
        </div>
      </CardContent>
    </Card>
  );
}