import { Button } from "@/components/ui/button";
import { Recycle, Leaf, Gift, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/15 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-secondary/60 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="container py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl eco-gradient flex items-center justify-center shadow-glow">
              <Recycle className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">EcoRecycle</span>
          </div>
          <Button variant="ghost" onClick={() => navigate("/auth")}>
            Sign In
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container">
        <div className="py-16 md:py-24 lg:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Turn recyclables into rewards
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Recycle Smart,{" "}
              <span className="text-primary">Earn Rewards</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Deposit your bottles and cans at any Reverse Vending Machine, 
              earn points, and redeem them for exciting rewards. Making a difference has never been more rewarding.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" onClick={() => navigate("/auth")}>
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="xl" variant="outline" onClick={() => navigate("/auth")}>
                Learn More
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-20 max-w-4xl mx-auto">
            {[
              {
                icon: Recycle,
                title: "Easy Deposits",
                description: "Simply enter the machine code and start depositing your recyclables",
              },
              {
                icon: Leaf,
                title: "Eco Impact",
                description: "Track your environmental contribution with every item you recycle",
              },
              {
                icon: Gift,
                title: "Earn Rewards",
                description: "Redeem points for vouchers, discounts, and eco-friendly gifts",
              },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="p-6 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm text-center animate-fade-in hover:shadow-soft transition-all"
                style={{ animationDelay: `${(index + 1) * 150}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container py-8 border-t border-border/50">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2024 EcoRecycle. Making recycling rewarding.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
