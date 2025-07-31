import { MessageSquare, Send, Bot, Users, BarChart3, TrendingUp } from "lucide-react";
import { StatsCard } from "@/components/Dashboard/StatsCard";
import { ChannelCard } from "@/components/Dashboard/ChannelCard";
import { ActivityFeed } from "@/components/Dashboard/ActivityFeed";
import { AnalyticsChart } from "@/components/Dashboard/AnalyticsChart";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your AI-powered messaging campaigns across WhatsApp and Telegram
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Messages"
          value="54,321"
          change="+12.5%"
          changeType="increase"
          icon={<MessageSquare className="w-5 h-5" />}
        />
        <StatsCard
          title="Active Campaigns"
          value="23"
          change="+3"
          changeType="increase"
          icon={<Send className="w-5 h-5" />}
        />
        <StatsCard
          title="AI Bots"
          value="12"
          change="+2"
          changeType="increase"
          icon={<Bot className="w-5 h-5" />}
        />
        <StatsCard
          title="Success Rate"
          value="94.2%"
          change="+2.1%"
          changeType="increase"
          icon={<TrendingUp className="w-5 h-5" />}
        />
      </div>

      {/* Channel Overview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Channel Overview</h2>
          <div className="text-sm text-muted-foreground">2 Channels Connected</div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChannelCard
            name="WhatsApp"
            icon={<MessageSquare className="w-6 h-6 text-white" />}
            status="connected"
            messagesSent={12543}
            successRate={98.5}
            color="#25D366"
          />
          <ChannelCard
            name="Telegram"
            icon={<Send className="w-6 h-6 text-white" />}
            status="connected"
            messagesSent={8921}
            successRate={95.2}
            color="#0088CC"
          />
        </div>
      </div>

      {/* Analytics and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsChart />
        <ActivityFeed />
      </div>
    </div>
  );
}