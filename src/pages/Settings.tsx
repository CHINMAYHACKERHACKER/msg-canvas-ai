import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Smartphone, Bot, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { toast } = useToast();
  const [whatsappConnected, setWhatsappConnected] = useState(false);
  const [telegramConnected, setTelegramConnected] = useState(false);
  
  const [whatsappConfig, setWhatsappConfig] = useState({
    phoneNumber: "",
    apiKey: "",
    webhookUrl: "",
    enabled: false
  });
  
  const [telegramConfig, setTelegramConfig] = useState({
    botToken: "",
    botUsername: "",
    webhookUrl: "",
    enabled: false
  });

  const handleWhatsAppConnect = () => {
    if (!whatsappConfig.phoneNumber || !whatsappConfig.apiKey) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setWhatsappConnected(true);
    toast({
      title: "WhatsApp Connected!",
      description: "Your WhatsApp Business API is now connected"
    });
  };

  const handleTelegramConnect = () => {
    if (!telegramConfig.botToken || !telegramConfig.botUsername) {
      toast({
        title: "Missing Information", 
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setTelegramConnected(true);
    toast({
      title: "Telegram Connected!",
      description: "Your Telegram bot is now connected"
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-muted-foreground mt-1">
          Configure your messaging channels and platform settings
        </p>
      </div>

      <Tabs defaultValue="channels" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="channels">Channels</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
        </TabsList>

        <TabsContent value="channels" className="space-y-6">
          {/* WhatsApp Configuration */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#25D366]/10">
                    <MessageSquare className="w-6 h-6 text-[#25D366]" />
                  </div>
                  <div>
                    <CardTitle>WhatsApp Business API</CardTitle>
                    <CardDescription>Connect your WhatsApp Business account</CardDescription>
                  </div>
                </div>
                <Badge variant={whatsappConnected ? "default" : "secondary"} className="flex items-center gap-1">
                  {whatsappConnected ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                  {whatsappConnected ? "Connected" : "Disconnected"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="whatsapp-phone">Phone Number</Label>
                  <Input
                    id="whatsapp-phone"
                    placeholder="+1234567890"
                    value={whatsappConfig.phoneNumber}
                    onChange={(e) => setWhatsappConfig(prev => ({ ...prev, phoneNumber: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp-api">API Key</Label>
                  <Input
                    id="whatsapp-api"
                    type="password"
                    placeholder="Enter your WhatsApp API key"
                    value={whatsappConfig.apiKey}
                    onChange={(e) => setWhatsappConfig(prev => ({ ...prev, apiKey: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp-webhook">Webhook URL</Label>
                <Input
                  id="whatsapp-webhook"
                  placeholder="https://your-domain.com/webhook/whatsapp"
                  value={whatsappConfig.webhookUrl}
                  onChange={(e) => setWhatsappConfig(prev => ({ ...prev, webhookUrl: e.target.value }))}
                />
              </div>
              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="whatsapp-enabled"
                    checked={whatsappConfig.enabled}
                    onCheckedChange={(checked) => setWhatsappConfig(prev => ({ ...prev, enabled: checked }))}
                  />
                  <Label htmlFor="whatsapp-enabled">Enable WhatsApp messaging</Label>
                </div>
                <Button onClick={handleWhatsAppConnect} disabled={whatsappConnected}>
                  {whatsappConnected ? "Connected" : "Connect WhatsApp"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Telegram Configuration */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#0088CC]/10">
                    <Send className="w-6 h-6 text-[#0088CC]" />
                  </div>
                  <div>
                    <CardTitle>Telegram Bot</CardTitle>
                    <CardDescription>Configure your Telegram bot integration</CardDescription>
                  </div>
                </div>
                <Badge variant={telegramConnected ? "default" : "secondary"} className="flex items-center gap-1">
                  {telegramConnected ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                  {telegramConnected ? "Connected" : "Disconnected"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="telegram-token">Bot Token</Label>
                  <Input
                    id="telegram-token"
                    type="password"
                    placeholder="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
                    value={telegramConfig.botToken}
                    onChange={(e) => setTelegramConfig(prev => ({ ...prev, botToken: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telegram-username">Bot Username</Label>
                  <Input
                    id="telegram-username"
                    placeholder="@your_bot_username"
                    value={telegramConfig.botUsername}
                    onChange={(e) => setTelegramConfig(prev => ({ ...prev, botUsername: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="telegram-webhook">Webhook URL</Label>
                <Input
                  id="telegram-webhook"
                  placeholder="https://your-domain.com/webhook/telegram"
                  value={telegramConfig.webhookUrl}
                  onChange={(e) => setTelegramConfig(prev => ({ ...prev, webhookUrl: e.target.value }))}
                />
              </div>
              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="telegram-enabled"
                    checked={telegramConfig.enabled}
                    onCheckedChange={(checked) => setTelegramConfig(prev => ({ ...prev, enabled: checked }))}
                  />
                  <Label htmlFor="telegram-enabled">Enable Telegram messaging</Label>
                </div>
                <Button onClick={handleTelegramConnect} disabled={telegramConnected}>
                  {telegramConnected ? "Connected" : "Connect Telegram"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Manage your account information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" placeholder="Your Company Name" />
              </div>
              <Button className="w-full md:w-auto">Save Profile</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure your platform preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive email updates about your campaigns</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">Receive product updates and tips</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-save Drafts</Label>
                  <p className="text-sm text-muted-foreground">Automatically save campaign drafts</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button className="w-full md:w-auto">Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}