import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { name: 'Jan', messages: 4000, success: 2400 },
  { name: 'Feb', messages: 3000, success: 1398 },
  { name: 'Mar', messages: 2000, success: 9800 },
  { name: 'Apr', messages: 2780, success: 3908 },
  { name: 'May', messages: 1890, success: 4800 },
  { name: 'Jun', messages: 2390, success: 3800 },
  { name: 'Jul', messages: 3490, success: 4300 },
];

export function AnalyticsChart() {
  return (
    <Card className="bg-gradient-card border-border">
      <CardHeader>
        <CardTitle className="text-lg">Message Analytics</CardTitle>
        <p className="text-sm text-muted-foreground">
          Monthly message volume and success rates
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
              <Area
                type="monotone"
                dataKey="messages"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="success"
                stroke="hsl(var(--success))"
                fill="hsl(var(--success))"
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}