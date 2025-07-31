import { useState } from "react";
import { Bot, Play, Pause, Settings, Trash2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AIPromptInput } from "@/components/AI/AIPromptInput";
import { toast } from "sonner";

interface BotData {
  id: string;
  name: string;
  description: string;
  status: "active" | "paused" | "draft";
  channel: "WhatsApp" | "Telegram";
  conversations: number;
  successRate: number;
  createdAt: string;
}

const mockBots: BotData[] = [
  {
    id: "1",
    name: "Customer Support Bot",
    description: "Handles customer inquiries and support tickets",
    status: "active",
    channel: "WhatsApp",
    conversations: 1234,
    successRate: 92.5,
    createdAt: "2024-01-15"
  },
  {
    id: "2",
    name: "Sales Assistant",
    description: "Qualifies leads and schedules demos",
    status: "active",
    channel: "Telegram",
    conversations: 856,
    successRate: 88.3,
    createdAt: "2024-01-10"
  },
  {
    id: "3",
    name: "FAQ Bot",
    description: "Answers frequently asked questions",
    status: "paused",
    channel: "WhatsApp",
    conversations: 567,
    successRate: 95.1,
    createdAt: "2024-01-08"
  }
];

export default function Bots() {
  const [bots, setBots] = useState<BotData[]>(mockBots);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateBot = async (prompt: string) => {
    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newBot: BotData = {
      id: Date.now().toString(),
      name: `AI Generated Bot`,
      description: `Generated from: "${prompt.substring(0, 50)}..."`,
      status: "draft",
      channel: "WhatsApp",
      conversations: 0,
      successRate: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setBots(prev => [newBot, ...prev]);
    setIsGenerating(false);
    toast.success("Bot generated successfully!");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success text-success-foreground";
      case "paused":
        return "bg-warning text-warning-foreground";
      case "draft":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getChannelColor = (channel: string) => {
    return channel === "WhatsApp" 
      ? "bg-green-500/10 text-green-500" 
      : "bg-blue-500/10 text-blue-500";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          AI Bots
        </h1>
        <p className="text-muted-foreground mt-1">
          Create and manage AI-powered chatbots for automated conversations
        </p>
      </div>

      {/* AI Bot Creator */}
      <AIPromptInput
        title="Create New Bot with AI"
        placeholder="Describe the bot you want to create. For example: 'Create a customer support bot that can handle order inquiries, track shipments, and process returns for an e-commerce store.'"
        onGenerate={handleGenerateBot}
        loading={isGenerating}
        type="bot"
      />

      {/* Bots Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Your Bots</h2>
          <div className="text-sm text-muted-foreground">{bots.length} bots created</div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bots.map((bot) => (
            <Card key={bot.id} className="bg-gradient-card border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <Bot className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{bot.name}</CardTitle>
                      <Badge className={`text-xs ${getStatusColor(bot.status)}`}>
                        {bot.status}
                      </Badge>
                    </div>
                  </div>
                  <Badge className={`text-xs ${getChannelColor(bot.channel)}`}>
                    {bot.channel}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{bot.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-medium">{bot.conversations.toLocaleString()}</div>
                    <div className="text-muted-foreground">Conversations</div>
                  </div>
                  <div>
                    <div className="font-medium text-success">{bot.successRate}%</div>
                    <div className="text-muted-foreground">Success Rate</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {bot.status === "active" ? (
                    <Button size="sm" variant="outline" className="flex-1">
                      <Pause className="w-4 h-4 mr-1" />
                      Pause
                    </Button>
                  ) : (
                    <Button size="sm" className="flex-1 bg-gradient-primary hover:opacity-90">
                      <Play className="w-4 h-4 mr-1" />
                      {bot.status === "draft" ? "Deploy" : "Resume"}
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}