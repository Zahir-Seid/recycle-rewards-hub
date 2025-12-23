import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Gift, 
  Coffee, 
  ShoppingBag, 
  Ticket, 
  Leaf,
  Check
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const rewards = [
  {
    id: 1,
    name: "Coffee Voucher",
    description: "Free medium coffee at partner cafes",
    points: 500,
    icon: Coffee,
    category: "Food & Drink",
  },
  {
    id: 2,
    name: "Shopping Discount",
    description: "10% off at eco-friendly stores",
    points: 750,
    icon: ShoppingBag,
    category: "Shopping",
  },
  {
    id: 3,
    name: "Movie Ticket",
    description: "Standard cinema ticket",
    points: 1000,
    icon: Ticket,
    category: "Entertainment",
  },
  {
    id: 4,
    name: "Plant a Tree",
    description: "We plant a tree in your name",
    points: 300,
    icon: Leaf,
    category: "Environment",
  },
  {
    id: 5,
    name: "Gift Card $10",
    description: "Universal gift card",
    points: 1500,
    icon: Gift,
    category: "Gift Cards",
  },
];

const RewardsPage = () => {
  const [userPoints] = useState(1250);
  const [redeemedId, setRedeemedId] = useState<number | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRedeem = (reward: typeof rewards[0]) => {
    if (userPoints >= reward.points) {
      setRedeemedId(reward.id);
      setTimeout(() => {
        toast({
          title: "Reward Redeemed!",
          description: `You've successfully redeemed ${reward.name}. Check your email for details.`,
        });
        setRedeemedId(null);
      }, 1500);
    } else {
      toast({
        title: "Not Enough Points",
        description: `You need ${reward.points - userPoints} more points for this reward.`,
        variant: "destructive",
      });
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
                            disabled={!canAfford || isRedeeming}
                            onClick={() => handleRedeem(reward)}
                            className="min-w-[80px]"
                          >
                            {isRedeeming ? (
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
