import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wand2, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AIPromptInputProps {
  title: string;
  placeholder: string;
  onGenerate: (prompt: string) => Promise<void>;
  loading?: boolean;
  type: "bot" | "template" | "campaign";
}

export function AIPromptInput({ 
  title, 
  placeholder, 
  onGenerate, 
  loading = false,
  type 
}: AIPromptInputProps) {
  const [prompt, setPrompt] = useState("");

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    await onGenerate(prompt);
  };

  const getTypeColor = () => {
    switch (type) {
      case "bot":
        return "bg-blue-500/10 text-blue-500";
      case "template":
        return "bg-green-500/10 text-green-500";
      case "campaign":
        return "bg-purple-500/10 text-purple-500";
      default:
        return "bg-primary/10 text-primary";
    }
  };

  const suggestions = {
    bot: [
      "Create a customer support bot for e-commerce",
      "Build a FAQ bot for restaurant orders",
      "Make a lead qualification bot"
    ],
    template: [
      "Welcome message for new subscribers",
      "Order confirmation template",
      "Appointment reminder message"
    ],
    campaign: [
      "Black Friday sale campaign",
      "Product launch announcement",
      "Customer feedback collection"
    ]
  };

  return (
    <Card className="bg-gradient-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-primary" />
            {title}
          </CardTitle>
          <Badge className={getTypeColor()}>
            AI Powered
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder={placeholder}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[120px] bg-background"
        />
        
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Quick suggestions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions[type].map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setPrompt(suggestion)}
                className="text-xs"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>

        <Button 
          onClick={handleGenerate} 
          disabled={!prompt.trim() || loading}
          className="w-full bg-gradient-primary hover:opacity-90"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4 mr-2" />
              Generate with AI
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}