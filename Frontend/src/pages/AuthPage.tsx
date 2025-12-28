import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Recycle,
  Mail,
  Lock,
  User,
  ArrowRight,
  Phone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { api, ApiError } from "@/lib/api";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [faydaNumber, setFaydaNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const resetRegisterFields = () => {
    setFullName("");
    setFaydaNumber("");
    setPhoneNumber("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoading) return;
    setIsLoading(true);

    try {
      if (isLogin) {
        // LOGIN
        const response = await api.login({ email, password });

        // Defensive check (extra safety)
        if (!response?.access_token) {
          throw new ApiError(401, "Login failed. Please try again.");
        }

        localStorage.setItem("token", response.access_token);

        toast({
          title: "Welcome back!",
          description: "You've successfully logged in.",
        });

        navigate("/dashboard");
      } else {
        //  REGISTER
        await api.register({
          email,
          password,
          full_name: fullName,
          fayda_number: faydaNumber,
          phone_number: phoneNumber,
        });

        toast({
          title: "Account created!",
          description: "Your account has been created. Please log in.",
        });

        setIsLogin(true);
        resetRegisterFields();
        setPassword("");
      }
    } catch (error) {
      if (error instanceof ApiError) {
        toast({
          title: "Authentication Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Unexpected Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl eco-gradient shadow-glow mb-4">
            <Recycle className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">EcoRecycle</h1>
          <p className="text-muted-foreground mt-2">
            Turn your recyclables into rewards
          </p>
        </div>

        <Card className="border-0 shadow-soft bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle>
              {isLogin ? "Welcome Back" : "Create Account"}
            </CardTitle>
            <CardDescription>
              {isLogin
                ? "Sign in to continue"
                : "Join thousands making a difference"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Doe"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* Fayda Number */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Fayda Number
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        value={faydaNumber}
                        onChange={(e) =>
                          setFaydaNumber(e.target.value)
                        }
                        placeholder="Enter Fayda number"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        value={phoneNumber}
                        onChange={(e) =>
                          setPhoneNumber(e.target.value)
                        }
                        placeholder="+251..."
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="••••••••"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  "Please wait..."
                ) : (
                  <>
                    {isLogin ? "Sign In" : "Create Account"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-muted-foreground hover:text-primary"
              >
                {isLogin
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <span className="font-semibold text-primary">
                  {isLogin ? "Sign up" : "Sign in"}
                </span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;
