import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Recycle,
  Leaf,
  Gift,
  ArrowRight,
  Sparkles,
  QrCode,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Navigation */}
      <nav className="container py-6">
      <div className="flex items-center justify-between py-6">
  {/* Logo */}
  <div className="flex items-center gap-3">
    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl eco-gradient shadow-glow">
      <Recycle className="w-6 h-6 text-primary-foreground" />
    </div>
    <span className="text-2xl md:text-3xl font-bold text-foreground">
      EcoRecycle
    </span>
  </div>

  {/* Navigation Buttons */}
  <div className="flex items-center gap-4">
    <Button variant="ghost" onClick={() => navigate("/auth")}>
      About
    </Button>
    <Button variant="ghost" onClick={() => navigate("/auth")}>
      Sign In
    </Button>
  </div>
</div>

      </nav>

      {/* Hero Section */}
      <main className="container relative">
        {/* Hero Background */}
        <div className="absolute inset-0 -z-10">
          <img
            src="/image.jpg"
            alt="Reverse Vending Machines"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        </div>

        <div className="py-16 md:py-24 lg:py-32">
          <div className="max-w-5xl mx-auto space-y-20">
            {/* Hero Content */}
            <div className="text-center space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                Reverse Vending Machine Network
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Smart Reverse Vending,{" "}
                <span className="text-primary">
                  Sustainable Rewards
                </span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Connect with Reverse Vending Machines across the city.
                Deposit your recyclables, earn points instantly, and
                help build a cleaner environment.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="xl" onClick={() => navigate("/auth")}>
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  size="xl"
                  variant="outline"
                  onClick={() => navigate("/auth")}
                >
                  How It Works
                </Button>
              </div>
            </div>

            {/* Normal Image Display */}
            <div className="flex justify-center animate-fade-in">
              <img
                src="/image.jpg"
                alt="Reverse Vending Machine"
                className="w-full max-w-4xl rounded-2xl shadow-xl ring-1 ring-primary/20"
              />
            </div>

            {/* How It Works */}
            <div className="space-y-8 animate-fade-in">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  How Reverse Vending Machines Work
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Our Reverse Vending Machine (RVM) network makes
                  recycling effortless and rewarding.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-12">
                {[
                  {
                    step: "01",
                    icon: QrCode,
                    title: "Scan & Connect",
                    description:
                      "Scan the QR code or enter the machine code to start.",
                  },
                  {
                    step: "02",
                    icon: Recycle,
                    title: "Deposit Recyclables",
                    description:
                      "Insert bottles and cans — detection happens instantly.",
                  },
                  {
                    step: "03",
                    icon: Gift,
                    title: "Earn Rewards",
                    description:
                      "Points are credited instantly and redeemable anytime.",
                  },
                ].map((step, index) => (
                  <Card
                    key={step.step}
                    className="border-2 border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-all animate-fade-in"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <step.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="text-xs font-mono text-primary mb-2">
                            {step.step}
                          </div>
                          <h3 className="text-lg font-semibold text-foreground mb-2">
                            {step.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* About Section */}
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur-sm">
              <CardContent className="p-8 md:p-12">
                <div className="max-w-3xl mx-auto space-y-6">
                  <div className="flex items-center gap-3">
                    <Recycle className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl md:text-3xl font-bold">
                      About Reverse Vending Machines
                    </h2>
                  </div>

                  <p className="text-muted-foreground">
                    Reverse Vending Machines automatically collect and
                    process recyclable materials while rewarding users
                    in real time.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 pt-4">
                    {[
                      "Real-time Processing",
                      "AI-powered Recognition",
                      "City-wide Coverage",
                      "Secure & Reliable",
                    ].map((text) => (
                      <div
                        key={text}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                        <span className="text-sm">{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container py-8 border-t border-border/50">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>
            © 2025 EcoRecycle. Making recycling rewarding.
          </p>
          <div className="flex gap-6">
            <a className="hover:text-foreground" href="#">
              Privacy
            </a>
            <a className="hover:text-foreground" href="#">
              Terms
            </a>
            <a className="hover:text-foreground" href="#">
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

