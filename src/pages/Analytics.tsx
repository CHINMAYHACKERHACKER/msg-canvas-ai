import { BarChart3, TrendingUp, Users, MessageSquare, Target, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';

const monthlyData = [
  { month: 'Jan', messages: 4200, delivered: 4100, opened: 3200, clicked: 890 },
  { month: 'Feb', messages: 3800, delivered: 3700, opened: 2900, clicked: 820 },
  { month: 'Mar', messages: 5200, delivered: 5100, opened: 4100, clicked: 1200 },
  { month: 'Apr', messages: 4600, delivered: 4500, opened: 3600, clicked: 980 },
  { month: 'May', messages: 6100, delivered: 5900, opened: 4800, clicked: 1450 },
  { month: 'Jun', messages: 5800, delivered: 5700, opened: 4500, clicked: 1320 },
];

const channelData = [
  { name: 'WhatsApp', value: 65, color: '#25D366' },
  { name: 'Telegram', value: 35, color: '#0088CC' },
];

const campaignPerformance = [
  { name: 'Black Friday', impressions: 12000, clicks: 2400, conversions: 480 },
  { name: 'Product Launch', impressions: 8500, clicks: 1700, conversions: 340 },
  { name: 'Customer Feedback', impressions: 6200, clicks: 930, conversions: 186 },
  { name: 'Holiday Promo', impressions: 15000, clicks: 3600, conversions: 720 },
];

const hourlyActivity = [
  { hour: '00', activity: 120 }, { hour: '01', activity: 80 }, { hour: '02', activity: 60 },
  { hour: '03', activity: 40 }, { hour: '04', activity: 35 }, { hour: '05', activity: 45 },
  { hour: '06', activity: 120 }, { hour: '07', activity: 280 }, { hour: '08', activity: 450 },
  { hour: '09', activity: 680 }, { hour: '10', activity: 820 }, { hour: '11', activity: 950 },
  { hour: '12', activity: 1100 }, { hour: '13', activity: 980 }, { hour: '14', activity: 890 },
  { hour: '15', activity: 780 }, { hour: '16', activity: 720 }, { hour: '17', activity: 650 },
  { hour: '18', activity: 580 }, { hour: '19', activity: 520 }, { hour: '20', activity: 450 },
  { hour: '21', activity: 380 }, { hour: '22', activity: 280 }, { hour: '23', activity: 180 },
];

export default function Analytics() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Analytics Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Comprehensive insights into your messaging campaigns and performance
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$124,532</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="w-4 h-4 text-success" />
              <Badge variant="secondary" className="text-xs text-success">+18.2%</Badge>
              <span className="text-xs text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Conversion Rate
            </CardTitle>
            <Target className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.4%</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="w-4 h-4 text-success" />
              <Badge variant="secondary" className="text-xs text-success">+2.1%</Badge>
              <span className="text-xs text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Users
            </CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28,456</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="w-4 h-4 text-success" />
              <Badge variant="secondary" className="text-xs text-success">+12.5%</Badge>
              <span className="text-xs text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Response Time
            </CardTitle>
            <MessageSquare className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2m</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="w-4 h-4 text-success" />
              <Badge variant="secondary" className="text-xs text-success">-15%</Badge>
              <span className="text-xs text-muted-foreground ml-1">faster response</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Message Performance Trends</CardTitle>
            <p className="text-sm text-muted-foreground">
              Monthly message delivery and engagement metrics
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Line type="monotone" dataKey="messages" stroke="hsl(var(--primary))" strokeWidth={2} />
                  <Line type="monotone" dataKey="delivered" stroke="hsl(var(--success))" strokeWidth={2} />
                  <Line type="monotone" dataKey="opened" stroke="hsl(var(--warning))" strokeWidth={2} />
                  <Line type="monotone" dataKey="clicked" stroke="hsl(var(--destructive))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Channel Distribution</CardTitle>
            <p className="text-sm text-muted-foreground">
              Message volume by platform
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={channelData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {channelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              {channelData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm font-medium">{entry.name}</span>
                  <span className="text-sm text-muted-foreground">{entry.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Campaign Performance</CardTitle>
            <p className="text-sm text-muted-foreground">
              Impressions, clicks, and conversions by campaign
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={campaignPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Bar dataKey="impressions" fill="hsl(var(--primary))" />
                  <Bar dataKey="clicks" fill="hsl(var(--success))" />
                  <Bar dataKey="conversions" fill="hsl(var(--warning))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Hourly Activity Pattern</CardTitle>
            <p className="text-sm text-muted-foreground">
              Message activity throughout the day
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hourlyActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="activity"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}