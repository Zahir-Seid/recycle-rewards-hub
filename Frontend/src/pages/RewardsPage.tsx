import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Leaf,
  Sprout,
  Waves,
  Trash2,
  Sun,
  Wind,
  DollarSign,
  Check
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const rewards = [
  {
    id: 1,
    name: "Plant a Tree",
    description: "We plant a tree in your name to restore forests",
    points: 300,
    icon: Leaf,
    category: "Eco Impact",
  },
  {
    id: 2,
    name: "Beach Cleanup",
    description: "Sponsor a beach cleanup event in your area",
    points: 400,
    icon: Waves,
    category: "Ocean Conservation",
  },
  {
    id: 3,
    name: "Community Garden",
    description: "Support a local community garden project",
    points: 500,
    icon: Sprout,
    category: "Community Impact",
  },
  {
    id: 4,
    name: "Waste Collection Drive",
    description: "Fund a waste collection and recycling drive",
    points: 600,
    icon: Trash2,
    category: "Waste Management",
  },
  {
    id: 5,
    name: "Solar Panel Initiative",
    description: "Contribute to solar panel installation projects",
    points: 800,
    icon: Sun,
    category: "Renewable Energy",
  },
  {
    id: 6,
    name: "Wind Energy Support",
    description: "Support wind energy development programs",
    points: 1000,
    icon: Wind,
    category: "Renewable Energy",
  },
  {
    id: 7,
    name: "Cash Out",
    description: "Redeem points for money (SAR 10 = 1000 points)",
    points: 1000,
    icon: DollarSign,
    category: "Money",
  },
];

const RewardsPage = () => {
  const [userPoints, setUserPoints] = useState(1250);
  const [redeemedId, setRedeemedId] = useState<number | null>(null);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth");
    }
  }, [navigate]);

  const handleRedeem = async (reward: typeof rewards[0]) => {
    if (userPoints < reward.points) {
      toast({
        title: "Not Enough Points",
        description: `You need ${reward.points - userPoints} more points for this reward.`,
        variant: "destructive",
      });
      return;
    }

    setIsRedeeming(true);
    setRedeemedId(reward.id);

    // Simulate redemption process with dummy API call
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Simulate successful redemption
      const success = Math.random() > 0.1; // 90% success rate for simulation
      
      if (success) {
        setUserPoints((prev) => prev - reward.points);
        const isCashOut = reward.id === 7;
        toast({
          title: "Reward Redeemed!",
          description: isCashOut 
            ? `You've successfully redeemed ${reward.name}. SAR ${reward.points / 100} will be transferred to your account within 24 hours.`
            : `You've successfully redeemed ${reward.name}. Thank you for your eco-friendly contribution!`,
        });
      } else {
        toast({
          title: "Redemption Failed",
          description: "Something went wrong. Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during redemption.",
        variant: "destructive",
      });
    } finally {
      setIsRedeeming(false);
      setRedeemedId(null);
    }
  };

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card border-b border-border/50 backdrop-blur-lg">
        <div className="container flex items-center h-16 gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">Rewards Store</h1>
        </div>
      </header>

      <main className="container py-6 space-y-6">
        {/* Points Balance */}
        <Card className="reward-gradient border-0 text-accent-foreground overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent-foreground/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <CardContent className="py-6">
            <p className="text-accent-foreground/80 text-sm font-medium mb-1">Available Points</p>
            <p className="text-4xl font-bold">{userPoints.toLocaleString()}</p>
            <p className="text-accent-foreground/70 text-sm mt-2">
              Redeem your points for amazing rewards!
            </p>
          </CardContent>
        </Card>

        {/* Rewards Grid */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Available Rewards</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {rewards.map((reward, index) => {
              const Icon = reward.icon;
              const canAfford = userPoints >= reward.points;
              const isRedeeming = redeemedId === reward.id;

              return (
                <Card
                  key={reward.id}
                  className={`overflow-hidden transition-all duration-300 animate-fade-in ${
                    !canAfford ? "opacity-60" : "hover:shadow-soft hover:-translate-y-1"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${
                        canAfford ? "bg-accent/10" : "bg-muted"
                      }`}>
                        <Icon className={`w-7 h-7 ${canAfford ? "text-accent" : "text-muted-foreground"}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground mb-1">{reward.category}</p>
                        <h3 className="font-semibold text-foreground truncate">{reward.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">{reward.description}</p>
                        <div className="flex items-center justify-between mt-3">
                          <span className={`font-bold ${canAfford ? "text-accent" : "text-muted-foreground"}`}>
                            {reward.points.toLocaleString()} pts
                          </span>
                          <Button
                            size="sm"
                            variant={canAfford ? "reward" : "secondary"}
                            disabled={!canAfford || (isRedeeming && redeemedId === reward.id)}
                            onClick={() => handleRedeem(reward)}
                            className="min-w-[80px]"
                          >
                            {isRedeeming && redeemedId === reward.id ? (
                              <span className="flex items-center gap-2">
                                <div className="w-3 h-3 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                Processing...
                              </span>
                            ) : redeemedId === reward.id ? (
                              <Check className="w-4 h-4 animate-scale-in" />
                            ) : canAfford ? (
                              "Redeem"
                            ) : (
                              "Locked"
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default RewardsPage;
