import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, AlertCircle, Play } from "lucide-react";

const activities = [
  {
    id: 1,
    title: 'Campaign "Black Friday Sale" launched',
    channel: "WhatsApp",
    time: "2 minutes ago",
    type: "campaign",
    status: "success"
  },
  {
    id: 2,
    title: 'Bot "Customer Support" updated',
    channel: "Telegram",
    time: "15 minutes ago",
    type: "bot",
    status: "success"
  },
  {
    id: 3,
    title: 'Template "Welcome Message" approved',
    channel: "WhatsApp",
    time: "1 hour ago",
    type: "template",
    status: "success"
  },
  {
    id: 4,
    title: 'Campaign "Flash Sale" completed',
    channel: "Telegram",
    time: "2 hours ago",
    type: "campaign",
    status: "completed"
  },
  {
    id: 5,
    title: 'New contact list imported',
    channel: "All Channels",
    time: "4 hours ago",
    type: "import",
    status: "success"
  }
];

export function ActivityFeed() {
  const getIcon = (type: string, status: string) => {
    if (status === "completed") return <CheckCircle className="w-4 h-4 text-success" />;
    if (status === "error") return <AlertCircle className="w-4 h-4 text-destructive" />;
    if (type === "campaign") return <Play className="w-4 h-4 text-primary" />;
    return <Clock className="w-4 h-4 text-muted-foreground" />;
  };

  const getChannelColor = (channel: string) => {
    switch (channel) {
      case "WhatsApp":
        return "bg-green-500/10 text-green-500";
      case "Telegram":
        return "bg-blue-500/10 text-blue-500";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="bg-gradient-card border-border">
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
        <p className="text-sm text-muted-foreground">
          Latest updates from your campaigns
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
              <div className="mt-0.5">
                {getIcon(activity.type, activity.status)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{activity.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={`text-xs ${getChannelColor(activity.channel)}`}>
                    {activity.channel}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}