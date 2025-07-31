import { useState } from "react";
import { Send, Play, Pause, BarChart3, Calendar, Users, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AIPromptInput } from "@/components/AI/AIPromptInput";
import { toast } from "sonner";

interface CampaignData {
  id: string;
  name: string;
  description: string;
  status: "active" | "paused" | "completed" | "draft" | "scheduled";
  channel: "WhatsApp" | "Telegram" | "Both";
  targetAudience: number;
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  startDate: string;
  endDate?: string;
  budget: number;
  spent: number;
}

const mockCampaigns: CampaignData[] = [
  {
    id: "1",
    name: "Black Friday Sale",
    description: "Promotional campaign for Black Friday deals",
    status: "active",
    channel: "WhatsApp",
    targetAudience: 10000,
    sent: 8543,
    delivered: 8321,
    opened: 6234,
    clicked: 1876,
    startDate: "2024-01-15",
    budget: 5000,
    spent: 3420
  },
  {
    id: "2",
    name: "Product Launch",
    description: "Announcing new AI-powered features",
    status: "scheduled",
    channel: "Both",
    targetAudience: 15000,
    sent: 0,
    delivered: 0,
    opened: 0,
    clicked: 0,
    startDate: "2024-02-01",
    budget: 8000,
    spent: 0
  },
  {
    id: "3",
    name: "Customer Feedback",
    description: "Collecting feedback from recent purchases",
    status: "completed",
    channel: "Telegram",
    targetAudience: 5000,
    sent: 5000,
    delivered: 4876,
    opened: 3234,
    clicked: 987,
    startDate: "2024-01-01",
    endDate: "2024-01-10",
    budget: 2000,
    spent: 1850
  }
];

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState<CampaignData[]>(mockCampaigns);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateCampaign = async (prompt: string) => {
    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newCampaign: CampaignData = {
      id: Date.now().toString(),
      name: "AI Generated Campaign",
      description: `Generated from: "${prompt.substring(0, 50)}..."`,
      status: "draft",
      channel: "WhatsApp",
      targetAudience: 0,
      sent: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      startDate: new Date().toISOString().split('T')[0],
      budget: 1000,
      spent: 0
    };
    
    setCampaigns(prev => [newCampaign, ...prev]);
    setIsGenerating(false);
    toast.success("Campaign generated successfully!");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success text-success-foreground";
      case "paused":
        return "bg-warning text-warning-foreground";
      case "completed":
        return "bg-secondary text-secondary-foreground";
      case "draft":
        return "bg-muted text-muted-foreground";
      case "scheduled":
        return "bg-blue-500 text-blue-50";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getChannelColor = (channel: string) => {
    if (channel === "WhatsApp") return "bg-green-500/10 text-green-500";
    if (channel === "Telegram") return "bg-blue-500/10 text-blue-500";
    return "bg-purple-500/10 text-purple-500";
  };

  const calculateProgress = (sent: number, target: number) => {
    return target > 0 ? (sent / target) * 100 : 0;
  };

  const calculateClickRate = (clicked: number, opened: number) => {
    return opened > 0 ? ((clicked / opened) * 100).toFixed(1) : "0";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Marketing Campaigns
        </h1>
        <p className="text-muted-foreground mt-1">
          Create and manage AI-powered marketing campaigns across channels
        </p>
      </div>

      {/* AI Campaign Creator */}
      <AIPromptInput
        title="Generate Campaign with AI"
        placeholder="Describe the marketing campaign you want to create. For example: 'Create a holiday promotion campaign for our jewelry store targeting women aged 25-45 with a 30% discount offer and urgency messaging.'"
        onGenerate={handleGenerateCampaign}
        loading={isGenerating}
        type="campaign"
      />

      {/* Campaigns Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Your Campaigns</h2>
          <div className="text-sm text-muted-foreground">{campaigns.length} campaigns created</div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} className="bg-gradient-card border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <Send className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{campaign.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={`text-xs ${getStatusColor(campaign.status)}`}>
                          {campaign.status}
                        </Badge>
                        <Badge className={`text-xs ${getChannelColor(campaign.channel)}`}>
                          {campaign.channel}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <BarChart3 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{campaign.description}</p>
                
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span>{campaign.sent.toLocaleString()} / {campaign.targetAudience.toLocaleString()}</span>
                  </div>
                  <Progress value={calculateProgress(campaign.sent, campaign.targetAudience)} className="h-2" />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Target className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{campaign.targetAudience.toLocaleString()}</div>
                        <div className="text-muted-foreground text-xs">Target</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Send className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{campaign.delivered.toLocaleString()}</div>
                        <div className="text-muted-foreground text-xs">Delivered</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{campaign.opened.toLocaleString()}</div>
                        <div className="text-muted-foreground text-xs">Opened</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <BarChart3 className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium text-success">{calculateClickRate(campaign.clicked, campaign.opened)}%</div>
                        <div className="text-muted-foreground text-xs">Click Rate</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Budget */}
                <div className="flex items-center justify-between text-sm p-3 bg-accent/30 rounded-lg">
                  <span>Budget</span>
                  <span>${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {campaign.status === "active" ? (
                    <Button size="sm" variant="outline" className="flex-1">
                      <Pause className="w-4 h-4 mr-1" />
                      Pause
                    </Button>
                  ) : campaign.status === "draft" || campaign.status === "scheduled" ? (
                    <Button size="sm" className="flex-1 bg-gradient-primary hover:opacity-90">
                      <Play className="w-4 h-4 mr-1" />
                      Launch
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" className="flex-1">
                      <Play className="w-4 h-4 mr-1" />
                      Resume
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    <Calendar className="w-4 h-4" />
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