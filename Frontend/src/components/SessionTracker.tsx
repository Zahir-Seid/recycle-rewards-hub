import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wine, Cylinder, CheckCircle2, StopCircle } from "lucide-react";

interface SessionTrackerProps {
  deposits: { bottles: number; cans: number };
  onDeposit: (type: "bottle" | "can") => void;
  onEndSession: () => void;
  machineCode: string;
}

const SessionTracker = ({ deposits, onDeposit, onEndSession, machineCode }: SessionTrackerProps) => {
  const totalItems = deposits.bottles + deposits.cans;
  const earnedPoints = deposits.bottles * 10 + deposits.cans * 5;

  return (
    <Card className="border-2 border-primary/50 animate-pulse-glow overflow-hidden">
      <CardHeader className="bg-primary/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
            <CardTitle className="text-lg">Active Session</CardTitle>
          </div>
          <span className="text-sm font-mono bg-card px-3 py-1 rounded-lg border text-muted-foreground">
            Machine: {machineCode}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {/* Live Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-xl bg-secondary/50">
            <p className="text-3xl font-bold text-foreground animate-count-up">{deposits.bottles}</p>
            <p className="text-xs text-muted-foreground mt-1">Bottles</p>
          </div>
          <div className="p-4 rounded-xl bg-secondary/50">
            <p className="text-3xl font-bold text-foreground animate-count-up">{deposits.cans}</p>
            <p className="text-xs text-muted-foreground mt-1">Cans</p>
          </div>
          <div className="p-4 rounded-xl bg-accent/10">
            <p className="text-3xl font-bold text-accent animate-count-up">+{earnedPoints}</p>
            <p className="text-xs text-muted-foreground mt-1">Points</p>
          </div>
        </div>

        {/* Deposit Buttons (for demo) */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground text-center">
            Simulate deposits (in real use, the machine detects items automatically)
          </p>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="lg"
              onClick={() => onDeposit("bottle")}
              className="h-16 flex-col gap-1"
            >
              <Wine className="w-6 h-6 text-primary" />
              <span className="text-xs">Add Bottle (+10 pts)</span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => onDeposit("can")}
              className="h-16 flex-col gap-1"
            >
              <Cylinder className="w-6 h-6 text-primary" />
              <span className="text-xs">Add Can (+5 pts)</span>
            </Button>
          </div>
        </div>

        {/* Session Summary */}
        {totalItems > 0 && (
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-2 text-primary mb-2">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-semibold">Session Progress</span>
            </div>
            <p className="text-sm text-muted-foreground">
              You've deposited {totalItems} item{totalItems > 1 ? "s" : ""} and earned{" "}
              <span className="font-semibold text-accent">{earnedPoints} points</span> so far!
            </p>
          </div>
        )}

        {/* End Session Button */}
        <Button
          variant="secondary"
          size="lg"
          onClick={onEndSession}
          className="w-full"
        >
          <StopCircle className="w-4 h-4 mr-2" />
          End Session
        </Button>
      </CardContent>
    </Card>
  );
};

export default SessionTracker;
