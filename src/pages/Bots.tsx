import { useState } from "react";
import { Bot, Play, Pause, Settings, Trash2, MessageSquare, Link2, Link2Off, Send } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AIPromptInput } from "@/components/AI/AIPromptInput";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  isConnected: boolean;
  source: "manual" | "ai";
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
    createdAt: "2024-01-15",
    isConnected: true,
    source: "manual"
  },
  {
    id: "2",
    name: "Sales Assistant",
    description: "Qualifies leads and schedules demos",
    status: "active",
    channel: "Telegram",
    conversations: 856,
    successRate: 88.3,
    createdAt: "2024-01-10",
    isConnected: true,
    source: "manual"
  },
  {
    id: "3",
    name: "FAQ Bot",
    description: "Answers frequently asked questions",
    status: "paused",
    channel: "WhatsApp",
    conversations: 567,
    successRate: 95.1,
    createdAt: "2024-01-08",
    isConnected: false,
    source: "ai"
  },
  {
    id: "4",
    name: "Lead Generation Bot",
    description: "Generates and qualifies leads automatically",
    status: "draft",
    channel: "Telegram",
    conversations: 0,
    successRate: 0,
    createdAt: "2024-01-20",
    isConnected: false,
    source: "ai"
  }
];

export default function Bots() {
  const [bots, setBots] = useState<BotData[]>(mockBots);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<"WhatsApp" | "Telegram" | "all">("all");
  const [selectedBotChannel, setSelectedBotChannel] = useState<"WhatsApp" | "Telegram">("WhatsApp");

  const handleGenerateBot = async (prompt: string) => {
    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newBot: BotData = {
      id: Date.now().toString(),
      name: `AI Generated Bot`,
      description: `Generated from: "${prompt.substring(0, 50)}..."`,
      status: "draft",
      channel: selectedBotChannel,
      conversations: 0,
      successRate: 0,
      createdAt: new Date().toISOString().split('T')[0],
      isConnected: false,
      source: "ai"
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
      ? "bg-[#25D366]/10 text-[#25D366]" 
      : "bg-blue-500/10 text-blue-500";
  };

  const filteredBots = bots.filter(bot => 
    selectedChannel === "all" ? true : bot.channel === selectedChannel
  );

  const connectedBots = filteredBots.filter(bot => bot.isConnected);
  const unconnectedBots = filteredBots.filter(bot => !bot.isConnected);

  const renderBotCard = (bot: BotData) => (
    <Card key={bot.id} className="group relative bg-gradient-card border-border hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      <div className="absolute -top-1 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 to-primary opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg" />
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
                bot.channel === "WhatsApp" 
                  ? "bg-[#25D366]/10" 
                  : "bg-blue-500/20"
              }`}>
                {bot.channel === "WhatsApp" ? (
                  <WhatsAppIcon className="w-6 h-6 text-[#25D366]" />
                ) : (
                  <Send className="w-6 h-6 text-blue-600" />
                )}
              </div>
              {bot.isConnected && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-background" />
              )}
            </div>
            <div>
              <CardTitle className="text-lg mb-1">{bot.name}</CardTitle>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className={`${getStatusColor(bot.status)} shadow-sm`}>
                  {bot.status.charAt(0).toUpperCase() + bot.status.slice(1)}
                </Badge>
                <Badge className={`${getChannelColor(bot.channel)} shadow-sm flex items-center gap-1.5`}>
                  {bot.channel === "WhatsApp" ? (
                    <WhatsAppIcon className="w-3 h-3" />
                  ) : (
                    <Send className="w-3 h-3" />
                  )}
                  {bot.channel}
                </Badge>
                {bot.source === "ai" && (
                  <Badge variant="outline" className="shadow-sm">
                    <Bot className="w-3 h-3 mr-1" />
                    AI Generated
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MessageSquare className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-sm text-muted-foreground leading-relaxed">{bot.description}</p>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-muted/50 rounded-lg p-3 text-center">
            <div className="text-xl font-semibold">{bot.conversations.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground mt-1">Conversations</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-3 text-center">
            <div className="text-xl font-semibold text-success">{bot.successRate}%</div>
            <div className="text-xs text-muted-foreground mt-1">Success Rate</div>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          {bot.status === "active" ? (
            <Button size="sm" variant="outline" className="flex-1 hover:bg-warning/10 hover:text-warning">
              <Pause className="w-4 h-4 mr-2" />
              Pause Bot
            </Button>
          ) : (
            <Button size="sm" className="flex-1 bg-gradient-primary hover:opacity-90">
              <Play className="w-4 h-4 mr-2" />
              {bot.status === "draft" ? "Deploy Bot" : "Resume Bot"}
            </Button>
          )}
          <Button size="sm" variant="outline" className="hover:bg-primary/10">
            <Settings className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="outline" className="hover:bg-destructive/10 hover:text-destructive">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

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
      <Card className="border-2 border-dashed border-primary/20 bg-gradient-card">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" />
            Create New Bot with AI
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <AIPromptInput
                title="Create New Bot with AI"
                placeholder="Describe the bot you want to create. For example: 'Create a customer support bot that can handle order inquiries, track shipments, and process returns for an e-commerce store.'"
                onGenerate={handleGenerateBot}
                loading={isGenerating}
                type="bot"
              />
            </div>
            <Select value={selectedBotChannel} onValueChange={(value: "WhatsApp" | "Telegram") => setSelectedBotChannel(value)}>
              <SelectTrigger className="w-[180px] self-start mt-0.5">
                <SelectValue placeholder="Select Channel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="WhatsApp">
                  <div className="flex items-center gap-2">
                    <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                    WhatsApp
                  </div>
                </SelectItem>
                <SelectItem value="Telegram">
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4 text-blue-500" />
                    Telegram
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bots Grid */}
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold">Your Bots</h2>
            <p className="text-sm text-muted-foreground">
              {filteredBots.length} bot{filteredBots.length !== 1 ? 's' : ''} available
            </p>
          </div>
          <Tabs 
            value={selectedChannel} 
            onValueChange={(value: "WhatsApp" | "Telegram" | "all") => setSelectedChannel(value)}
            className="w-full sm:w-auto"
          >
            <TabsList className="w-full sm:w-auto grid grid-cols-3">
              <TabsTrigger value="all" className="flex items-center gap-2">
                <Bot className="w-4 h-4" />
                All
              </TabsTrigger>
              <TabsTrigger value="WhatsApp" className="flex items-center gap-2">
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                WhatsApp
              </TabsTrigger>
              <TabsTrigger value="Telegram" className="flex items-center gap-2">
                <Send className="w-4 h-4 text-blue-500" />
                Telegram
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Bot Lists */}
        <div className="space-y-12">
          {/* Connected Bots */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-success/10 text-success rounded-lg">
                <Link2 className="w-4 h-4" />
                <h3 className="font-medium">Connected Bots</h3>
              </div>
              <div className="text-sm text-muted-foreground">
                {connectedBots.length} bot{connectedBots.length !== 1 ? 's' : ''}
              </div>
            </div>
            {connectedBots.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {connectedBots.map(renderBotCard)}
              </div>
            ) : (
              <Card className="border-dashed border-2 border-muted">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Link2 className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <h4 className="text-lg font-medium mb-2">No Connected Bots</h4>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    Connect your first bot to start automating conversations with your customers.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Unconnected Bots */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-lg">
                <Link2Off className="w-4 h-4" />
                <h3 className="font-medium">Unconnected Bots</h3>
              </div>
              <div className="text-sm text-muted-foreground">
                {unconnectedBots.length} bot{unconnectedBots.length !== 1 ? 's' : ''}
              </div>
            </div>
            {unconnectedBots.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {unconnectedBots.map(renderBotCard)}
              </div>
            ) : (
              <Card className="border-dashed border-2 border-muted">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Bot className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <h4 className="text-lg font-medium mb-2">No Unconnected Bots</h4>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    All your bots are connected and ready to handle conversations.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Empty State */}
        {filteredBots.length === 0 && (
          <Card className="border-dashed border-2 border-muted">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6">
                <Bot className="w-8 h-8 text-muted-foreground" />
              </div>
              <h4 className="text-xl font-medium mb-3">No Bots Found</h4>
              <p className="text-sm text-muted-foreground max-w-sm mb-6">
                No bots found for {selectedChannel === "all" ? "any channel" : selectedChannel}. 
                Create your first bot using AI or switch to a different channel.
              </p>
              <Button 
                className="bg-gradient-primary hover:opacity-90"
                onClick={() => document.querySelector('textarea')?.focus()}
              >
                <Bot className="w-4 h-4 mr-2" />
                Create New Bot
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}