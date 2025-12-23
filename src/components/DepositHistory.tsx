import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History, Wine, Cylinder } from "lucide-react";

const DepositHistory = () => {
  const history = [
    { id: 1, date: "Today, 2:30 PM", bottles: 5, cans: 3, points: 65 },
    { id: 2, date: "Yesterday, 11:00 AM", bottles: 8, cans: 2, points: 90 },
    { id: 3, date: "Dec 20, 4:15 PM", bottles: 3, cans: 6, points: 60 },
    { id: 4, date: "Dec 18, 9:00 AM", bottles: 12, cans: 0, points: 120 },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <History className="w-5 h-5 text-muted-foreground" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {history.map((session, index) => (
          <div
            key={session.id}
            className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="text-foreground font-medium">{session.date}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-sm">
                <Wine className="w-4 h-4 text-primary" />
                <span className="text-foreground">{session.bottles}</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Cylinder className="w-4 h-4 text-primary" />
                <span className="text-foreground">{session.cans}</span>
              </div>
              <span className="font-semibold text-accent">+{session.points}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default DepositHistory;
