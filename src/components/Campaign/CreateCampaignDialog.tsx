import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, MessageSquare, Send, Sparkles } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { AIPromptInput } from "@/components/AI/AIPromptInput";
import { useToast } from "@/hooks/use-toast";

interface CreateCampaignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateCampaignDialog({ open, onOpenChange }: CreateCampaignDialogProps) {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [useAI, setUseAI] = useState(false);
  const [scheduledDate, setScheduledDate] = useState<Date>();
  
  const [campaignData, setCampaignData] = useState({
    name: "",
    description: "",
    type: "",
    channels: [] as string[],
    targetAudience: "",
    message: "",
    scheduledTime: ""
  });

  const handleChannelChange = (channel: string, checked: boolean) => {
    setCampaignData(prev => ({
      ...prev,
      channels: checked 
        ? [...prev.channels, channel]
        : prev.channels.filter(c => c !== channel)
    }));
  };

  const handleAIGenerate = async (prompt: string) => {
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const generatedContent = {
        name: "AI Generated Campaign",
        description: "An AI-powered marketing campaign designed to increase engagement",
        message: `🚀 Exciting news! Based on your prompt: "${prompt.substring(0, 50)}..." 

We've crafted a personalized message that will resonate with your audience. This campaign combines the power of AI with your unique brand voice to deliver maximum impact.

✨ Key benefits:
• Increased engagement rates
• Personalized messaging
• Optimal timing
• Multi-channel reach

Ready to take your marketing to the next level? 

Best regards,
Your Marketing Team`,
        targetAudience: "Engaged customers and prospects"
      };
      
      setCampaignData(prev => ({
        ...prev,
        ...generatedContent
      }));
      
      setIsGenerating(false);
      toast({
        title: "Campaign Generated!",
        description: "Your AI-powered campaign content has been created"
      });
    }, 2000);
  };

  const handleSubmit = () => {
    if (!campaignData.name || !campaignData.message || campaignData.channels.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and select at least one channel",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Campaign Created!",
      description: `Campaign "${campaignData.name}" has been created successfully`
    });
    
    onOpenChange(false);
    // Reset form
    setCampaignData({
      name: "",
      description: "",
      type: "",
      channels: [],
      targetAudience: "",
      message: "",
      scheduledTime: ""
    });
    setScheduledDate(undefined);
    setUseAI(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Create New Campaign
          </DialogTitle>
          <DialogDescription>
            Create a new AI-powered marketing campaign for WhatsApp and Telegram
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* AI Toggle */}
          <div className="flex items-center space-x-2 p-4 border rounded-lg bg-gradient-subtle/50">
            <Checkbox
              id="use-ai"
              checked={useAI}
              onCheckedChange={(checked) => setUseAI(checked === true)}
            />
            <Label htmlFor="use-ai" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Use AI to generate campaign content
            </Label>
          </div>

          {useAI && (
            <AIPromptInput
              title="AI Campaign Generator"
              placeholder="Describe your campaign goals, target audience, and key message. E.g., 'Create a promotional campaign for our new product launch targeting young professionals, emphasizing convenience and innovation'"
              onGenerate={handleAIGenerate}
              loading={isGenerating}
              type="campaign"
            />
          )}

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="campaign-name">Campaign Name *</Label>
              <Input
                id="campaign-name"
                placeholder="Summer Sale 2024"
                value={campaignData.name}
                onChange={(e) => setCampaignData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="campaign-type">Campaign Type</Label>
              <Select value={campaignData.type} onValueChange={(value) => setCampaignData(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select campaign type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="promotional">Promotional</SelectItem>
                  <SelectItem value="announcement">Announcement</SelectItem>
                  <SelectItem value="educational">Educational</SelectItem>
                  <SelectItem value="reminder">Reminder</SelectItem>
                  <SelectItem value="survey">Survey</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="campaign-description">Description</Label>
            <Textarea
              id="campaign-description"
              placeholder="Brief description of your campaign objectives"
              value={campaignData.description}
              onChange={(e) => setCampaignData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>

          {/* Channel Selection */}
          <div className="space-y-3">
            <Label>Select Channels *</Label>
            <div className="flex gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="whatsapp"
                  checked={campaignData.channels.includes("whatsapp")}
                  onCheckedChange={(checked) => handleChannelChange("whatsapp", checked as boolean)}
                />
                <Label htmlFor="whatsapp" className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  WhatsApp
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="telegram"
                  checked={campaignData.channels.includes("telegram")}
                  onCheckedChange={(checked) => handleChannelChange("telegram", checked as boolean)}
                />
                <Label htmlFor="telegram" className="flex items-center gap-2">
                  <Send className="w-4 h-4 text-[#0088CC]" />
                  Telegram
                </Label>
              </div>
            </div>
            {campaignData.channels.length > 0 && (
              <div className="flex gap-2">
                {campaignData.channels.map(channel => (
                  <Badge key={channel} variant="secondary">
                    {channel === "whatsapp" ? "WhatsApp" : "Telegram"}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Target Audience */}
          <div className="space-y-2">
            <Label htmlFor="target-audience">Target Audience</Label>
            <Input
              id="target-audience"
              placeholder="All customers, New subscribers, VIP members, etc."
              value={campaignData.targetAudience}
              onChange={(e) => setCampaignData(prev => ({ ...prev, targetAudience: e.target.value }))}
            />
          </div>

          {/* Message Content */}
          <div className="space-y-2">
            <Label htmlFor="message">Campaign Message *</Label>
            <Textarea
              id="message"
              placeholder="Write your campaign message here..."
              className="min-h-[120px]"
              value={campaignData.message}
              onChange={(e) => setCampaignData(prev => ({ ...prev, message: e.target.value }))}
            />
          </div>

          {/* Scheduling */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Schedule Date (Optional)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !scheduledDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {scheduledDate ? format(scheduledDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={scheduledDate}
                    onSelect={setScheduledDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="scheduled-time">Schedule Time</Label>
              <Input
                id="scheduled-time"
                type="time"
                value={campaignData.scheduledTime}
                onChange={(e) => setCampaignData(prev => ({ ...prev, scheduledTime: e.target.value }))}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isGenerating}>
            {isGenerating ? "Generating..." : "Create Campaign"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}