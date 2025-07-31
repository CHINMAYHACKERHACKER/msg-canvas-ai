import { useState } from "react";
import { MessageSquare, Copy, Edit, Trash2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AIPromptInput } from "@/components/AI/AIPromptInput";
import { toast } from "sonner";

interface TemplateData {
  id: string;
  name: string;
  content: string;
  status: "approved" | "pending" | "rejected";
  channel: "WhatsApp" | "Telegram" | "Both";
  category: string;
  variables: string[];
  usage: number;
  createdAt: string;
}

const mockTemplates: TemplateData[] = [
  {
    id: "1",
    name: "Welcome Message",
    content: "Hi {{name}}, welcome to {{company}}! We're excited to have you on board. Reply HELP for assistance or STOP to unsubscribe.",
    status: "approved",
    channel: "WhatsApp",
    category: "Welcome",
    variables: ["name", "company"],
    usage: 1234,
    createdAt: "2024-01-15"
  },
  {
    id: "2",
    name: "Order Confirmation",
    content: "Your order #{{order_id}} has been confirmed! Total: {{amount}}. Estimated delivery: {{delivery_date}}. Track your order: {{tracking_link}}",
    status: "approved",
    channel: "Both",
    category: "Transactional",
    variables: ["order_id", "amount", "delivery_date", "tracking_link"],
    usage: 856,
    createdAt: "2024-01-10"
  },
  {
    id: "3",
    name: "Appointment Reminder",
    content: "Hi {{name}}, this is a reminder about your appointment on {{date}} at {{time}}. Location: {{location}}. Reply YES to confirm or NO to reschedule.",
    status: "pending",
    channel: "Telegram",
    category: "Reminder",
    variables: ["name", "date", "time", "location"],
    usage: 234,
    createdAt: "2024-01-08"
  }
];

export default function Templates() {
  const [templates, setTemplates] = useState<TemplateData[]>(mockTemplates);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateTemplate = async (prompt: string) => {
    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newTemplate: TemplateData = {
      id: Date.now().toString(),
      name: "AI Generated Template",
      content: `Generated template based on: "${prompt}". This template includes {{name}} and {{custom_field}} variables.`,
      status: "pending",
      channel: "WhatsApp",
      category: "AI Generated",
      variables: ["name", "custom_field"],
      usage: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setTemplates(prev => [newTemplate, ...prev]);
    setIsGenerating(false);
    toast.success("Template generated successfully!");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-success text-success-foreground";
      case "pending":
        return "bg-warning text-warning-foreground";
      case "rejected":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getChannelColor = (channel: string) => {
    if (channel === "WhatsApp") return "bg-green-500/10 text-green-500";
    if (channel === "Telegram") return "bg-blue-500/10 text-blue-500";
    return "bg-purple-500/10 text-purple-500";
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Welcome":
        return "bg-blue-500/10 text-blue-500";
      case "Transactional":
        return "bg-green-500/10 text-green-500";
      case "Reminder":
        return "bg-orange-500/10 text-orange-500";
      case "AI Generated":
        return "bg-purple-500/10 text-purple-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Message Templates
        </h1>
        <p className="text-muted-foreground mt-1">
          Create and manage AI-generated message templates for your campaigns
        </p>
      </div>

      {/* AI Template Creator */}
      <AIPromptInput
        title="Generate Template with AI"
        placeholder="Describe the message template you need. For example: 'Create a promotional template for a 20% discount offer on electronics with a sense of urgency and clear call-to-action.'"
        onGenerate={handleGenerateTemplate}
        loading={isGenerating}
        type="template"
      />

      {/* Templates Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Your Templates</h2>
          <div className="text-sm text-muted-foreground">{templates.length} templates created</div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {templates.map((template) => (
            <Card key={template.id} className="bg-gradient-card border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{template.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={`text-xs ${getStatusColor(template.status)}`}>
                          {template.status === "approved" && <Check className="w-3 h-3 mr-1" />}
                          {template.status === "rejected" && <X className="w-3 h-3 mr-1" />}
                          {template.status}
                        </Badge>
                        <Badge className={`text-xs ${getCategoryColor(template.category)}`}>
                          {template.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Badge className={`text-xs ${getChannelColor(template.channel)}`}>
                    {template.channel}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-accent/30 p-3 rounded-lg">
                  <p className="text-sm font-mono text-foreground">
                    {template.content}
                  </p>
                </div>
                
                {template.variables.length > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Variables:</p>
                    <div className="flex flex-wrap gap-1">
                      {template.variables.map((variable) => (
                        <Badge key={variable} variant="outline" className="text-xs">
                          {`{{${variable}}}`}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="font-medium">{template.usage.toLocaleString()}</span>
                    <span className="text-muted-foreground ml-1">uses</span>
                  </div>
                  <div className="text-muted-foreground">
                    Created {template.createdAt}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Copy className="w-4 h-4 mr-1" />
                    Duplicate
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4" />
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