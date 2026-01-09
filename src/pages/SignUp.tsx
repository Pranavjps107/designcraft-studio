import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import api from "@/lib/api";

const steps = [
  { id: 1, name: "Account Details" },
  { id: 2, name: "Workspace Setup" },
  { id: 3, name: "WhatsApp Connection" },
];

export default function SignUp() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<"weak" | "medium" | "strong" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    company: "",
    website: "",
    teamSize: "1-10 employees",
    phone: "",
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setFormData({ ...formData, password });
    
    if (password.length === 0) {
      setPasswordStrength(null);
    } else if (password.length < 6) {
      setPasswordStrength("weak");
    } else if (password.length < 10) {
      setPasswordStrength("medium");
    } else {
      setPasswordStrength("strong");
    }
  };

  const handleContinue = async () => {
    if (currentStep === 1) {
      if (!formData.name || !formData.email || !formData.password) {
        toast.error("Please fill in all required fields");
        return;
      }
      if (passwordStrength === "weak") {
        toast.error("Please use a stronger password");
        return;
      }
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleCompleteSetup = async () => {
    setIsLoading(true);
    try {
      await api.register({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        company: formData.company,
        phone: formData.phone,
      });
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep1 = () => (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Create your account
        </h1>
        <p className="text-muted-foreground">
          Let's start with your basic information
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="fullname">
            Full Name <span className="text-destructive">*</span>
          </Label>
          <Input 
            id="fullname" 
            placeholder="John Doe" 
            className="h-12"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">
            Email Address <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@company.com"
            className="h-12"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">
            Password <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              className="h-12 pr-10"
              value={formData.password}
              onChange={handlePasswordChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {passwordStrength && (
            <div className="mt-2">
              <div className="h-1 bg-muted rounded overflow-hidden mb-1">
                <div
                  className={cn(
                    "h-full transition-all",
                    passwordStrength === "weak" && "w-1/3 bg-destructive",
                    passwordStrength === "medium" && "w-2/3 bg-warning",
                    passwordStrength === "strong" && "w-full bg-primary"
                  )}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Password strength: {passwordStrength}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );

  const renderStep2 = () => (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Setup your workspace
        </h1>
        <p className="text-muted-foreground">
          Tell us about your organization
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="company">
            Company Name <span className="text-destructive">*</span>
          </Label>
          <Input 
            id="company" 
            placeholder="Acme Inc." 
            className="h-12"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input 
            id="website" 
            placeholder="https://yourcompany.com" 
            className="h-12"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="team-size">Team Size</Label>
          <select
            id="team-size"
            className="w-full h-12 px-4 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            value={formData.teamSize}
            onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
          >
            <option>1-10 employees</option>
            <option>11-50 employees</option>
            <option>51-200 employees</option>
            <option>200+ employees</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input 
            id="phone" 
            placeholder="+1234567890" 
            className="h-12"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
      </div>
    </>
  );

  const renderStep3 = () => (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Connect WhatsApp
        </h1>
        <p className="text-muted-foreground">
          Link your WhatsApp Business account
        </p>
      </div>

      <div className="space-y-6">
        <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📱</span>
          </div>
          <h3 className="font-semibold text-foreground mb-2">
            Scan QR Code to Connect
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Open WhatsApp on your phone and scan the QR code
          </p>
          <div className="w-48 h-48 bg-muted rounded-lg mx-auto flex items-center justify-center">
            <span className="text-muted-foreground text-sm">QR Code</span>
          </div>
        </div>

        <Button 
          variant="outline" 
          className="w-full h-12"
          onClick={handleCompleteSetup}
          disabled={isLoading}
        >
          Skip for now
        </Button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-lg bg-card rounded-2xl shadow-lg p-10">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mx-auto mb-4">
            <Mail className="h-7 w-7 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-foreground">ChatBot AI</span>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-2 mb-6">
          {steps.map((step) => (
            <div
              key={step.id}
              className={cn(
                "flex-1 h-1 rounded-full transition-all",
                step.id <= currentStep ? "bg-primary" : "bg-muted"
              )}
            />
          ))}
        </div>

        {/* Step Indicator */}
        <div className="flex justify-between text-xs text-muted-foreground mb-8">
          {steps.map((step) => (
            <span
              key={step.id}
              className={cn(
                "font-medium",
                step.id === currentStep && "text-primary"
              )}
            >
              {step.name}
            </span>
          ))}
        </div>

        {/* Step Content */}
        <form onSubmit={(e) => e.preventDefault()}>
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}

          {/* Actions */}
          <div className="flex gap-3 mt-8">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-12"
                onClick={() => setCurrentStep(currentStep - 1)}
                disabled={isLoading}
              >
                Back
              </Button>
            )}
            {currentStep < 3 ? (
              <Button
                type="button"
                className="flex-[2] h-12"
                onClick={handleContinue}
              >
                Continue
              </Button>
            ) : (
              <Button 
                type="button"
                className="flex-[2] h-12"
                onClick={handleCompleteSetup}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Complete Setup"
                )}
              </Button>
            )}
          </div>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
