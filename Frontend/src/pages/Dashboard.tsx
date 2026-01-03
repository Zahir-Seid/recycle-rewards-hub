import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Recycle, 
  Gift, 
  History, 
  Plus, 
  LogOut, 
  Coins,
  Sparkles,
  X
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import SessionTracker from "@/components/SessionTracker";
import DepositHistory from "@/components/DepositHistory";
import { api, ApiError } from "@/lib/api";

const Dashboard = () => {
  const [showStartSession, setShowStartSession] = useState(false);
  const [machineCode, setMachineCode] = useState("");
  const [activeSession, setActiveSession] = useState(false);
  const [sessionCode, setSessionCode] = useState("");
  const [points, setPoints] = useState(1250);
  const [deposits, setDeposits] = useState({ bottles: 0, cans: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/auth");
  }, [navigate]);

  const handleBindSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (machineCode.length >= 4) {
      setIsLoading(true);
      try {
        const code = machineCode.toUpperCase();
        const machineId = "123"; // Fixed machine ID

        // Only bind the session (ESP already created it)
        await api.bindSession({ code });

        setSessionCode(code);
        setActiveSession(true);
        setShowStartSession(false);
        toast({
          title: "Session Started!",
          description: `Connected to machine. Start depositing!`,
        });
      } catch (error) {
        if (error instanceof ApiError) {
          toast({
            title: "Error",
            description: error.message || "Failed to bind session",
            variant: "destructive",
          });
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDeposit = async (type: "bottle" | "can") => {
    if (!activeSession || !sessionCode) {
      toast({
        title: "Error",
        description: "No active session",
        variant: "destructive",
      });
      return;
    }

    try {
      const count = 1;
      await api.deposit({
        machine_id: "123",
        code: sessionCode,
        count,
      });

      const pointsEarned = type === "bottle" ? 10 : 5;
      setPoints(prev => prev + pointsEarned);
      setDeposits(prev => ({
        ...prev,
        [type === "bottle" ? "bottles" : "cans"]: prev[type === "bottle" ? "bottles" : "cans"] + 1,
      }));
      toast({
        title: `+${pointsEarned} points!`,
        description: `${type === "bottle" ? "Bottle" : "Can"} deposited successfully`,
      });
    } catch (error) {
      if (error instanceof ApiError) {
        toast({
          title: "Error",
          description: error.message || "Failed to deposit",
          variant: "destructive",
        });
      }
    }
  };

  const handleEndSession = () => {
    const totalItems = deposits.bottles + deposits.cans;
    const earnedPoints = deposits.bottles * 10 + deposits.cans * 5;
    setActiveSession(false);
    toast({
      title: "Session Complete!",
      description: `You deposited ${totalItems} items and earned ${earnedPoints} points!`,
    });
    setDeposits({ bottles: 0, cans: 0 });
    setMachineCode("");
  };

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card border-b border-border/50 backdrop-blur-lg">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl eco-gradient flex items-center justify-center">
              <Recycle className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">ReCycleX</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/auth");
            }}
            className="text-muted-foreground hover:text-foreground"
          >
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <main className="container py-6 space-y-6">
        {/* Points Card */}
        <Card className="eco-gradient border-0 text-primary-foreground overflow-hidden relative">
          <CardHeader className="pb-2">
            <CardTitle className="text-primary-foreground/80 font-medium text-sm flex items-center gap-2">
              <Coins className="w-4 h-4" />
              Your Points Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold">{points.toLocaleString()}</span>
              <span className="text-primary-foreground/70">points</span>
            </div>
            <Button 
              variant="glass" 
              size="sm" 
              className="mt-4"
              onClick={() => navigate("/rewards")}
            >
              <Gift className="w-4 h-4 mr-2" />
              Redeem Rewards
            </Button>
          </CardContent>
        </Card>

        {/* Active Session or Start Session */}
        {activeSession ? (
          <SessionTracker 
            deposits={deposits} 
            onDeposit={handleDeposit} 
            onEndSession={handleEndSession}
            machineCode={sessionCode}
          />
        ) : (
          <Card 
            className="border-2 border-dashed border-primary/30 bg-primary/5 cursor-pointer hover:border-primary/50 hover:bg-primary/10 transition-all"
            onClick={() => setShowStartSession(true)}
          >
            <CardContent className="py-8 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <Plus className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Start Recycling Session</h3>
              <p className="text-muted-foreground text-sm mt-1">
                Enter the machine code to begin depositing
              </p>
            </CardContent>
          </Card>
        )}

        {/* Start Session Modal */}
        {showStartSession && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm">
            <Card className="w-full max-w-md animate-scale-in">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Start Session</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Enter the code shown on the RVM screen
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setShowStartSession(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBindSession} className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Enter machine code (e.g., A1B2)"
                    value={machineCode}
                    onChange={(e) => setMachineCode(e.target.value.toUpperCase())}
                    className="text-center text-2xl font-mono tracking-widest h-16"
                    maxLength={6}
                    autoFocus
                  />
                  <Button type="submit" size="lg" className="w-full" disabled={machineCode.length < 4 || isLoading}>
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Connecting...
                      </span>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Connect to Machine
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="py-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-secondary mx-auto mb-3 flex items-center justify-center">
                <Recycle className="w-6 h-6 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground">127</p>
              <p className="text-sm text-muted-foreground">Items Recycled</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-accent/10 mx-auto mb-3 flex items-center justify-center">
                <Gift className="w-6 h-6 text-accent" />
              </div>
              <p className="text-2xl font-bold text-foreground">8</p>
              <p className="text-sm text-muted-foreground">Rewards Claimed</p>
            </CardContent>
          </Card>
        </div>

        {/* Deposit History */}
        <DepositHistory />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 glass-card border-t border-border/50 md:hidden">
        <div className="flex items-center justify-around h-16">
          <button className="flex flex-col items-center gap-1 text-primary">
            <Recycle className="w-5 h-5" />
            <span className="text-xs font-medium">Home</span>
          </button>
          <button 
            className="flex flex-col items-center gap-1 text-muted-foreground"
            onClick={() => navigate("/rewards")}
          >
            <Gift className="w-5 h-5" />
            <span className="text-xs font-medium">Rewards</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-muted-foreground">
            <History className="w-5 h-5" />
            <span className="text-xs font-medium">History</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Dashboard;
