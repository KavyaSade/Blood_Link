import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, Heart } from "lucide-react";
import { toast } from "sonner";

const DonorRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    bloodGroup: "",
    location: "",
    age: "",
    smsConsent: false,
    callConsent: false,
    pushConsent: false,
  });

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.phone || !formData.bloodGroup || !formData.location) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!formData.smsConsent && !formData.callConsent && !formData.pushConsent) {
      toast.error("Please select at least one notification method");
      return;
    }

    toast.success("Registration successful!", {
      description: "You're now part of our lifesaving community. We'll notify you when your blood type is needed nearby.",
    });

    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full mb-4">
              <Users className="h-5 w-5" />
              <span className="font-medium">Donor Registration</span>
            </div>
            <h1 className="text-4xl font-bold mb-3">Become a Lifesaver</h1>
            <p className="text-muted-foreground">
              Join thousands of donors ready to help in emergencies. Get notified when you can save a life.
            </p>
          </div>

          {/* Form */}
          <Card className="p-8 shadow-medium">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bloodGroup">Blood Group *</Label>
                  <Select
                    value={formData.bloodGroup}
                    onValueChange={(value) => setFormData({ ...formData, bloodGroup: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your blood group" />
                    </SelectTrigger>
                    <SelectContent>
                      {bloodGroups.map((group) => (
                        <SelectItem key={group} value={group}>
                          {group}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    min="18"
                    max="65"
                    placeholder="18-65"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Your Location / City *</Label>
                <Input
                  id="location"
                  placeholder="Enter your city or area"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-4">
                <Label>Notification Preferences * (Select at least one)</Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="smsConsent"
                      checked={formData.smsConsent}
                      onCheckedChange={(checked) => 
                        setFormData({ ...formData, smsConsent: checked as boolean })
                      }
                    />
                    <Label htmlFor="smsConsent" className="font-normal cursor-pointer">
                      Notify me via SMS when blood is needed nearby
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="callConsent"
                      checked={formData.callConsent}
                      onCheckedChange={(checked) => 
                        setFormData({ ...formData, callConsent: checked as boolean })
                      }
                    />
                    <Label htmlFor="callConsent" className="font-normal cursor-pointer">
                      I'm okay with emergency phone calls
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="pushConsent"
                      checked={formData.pushConsent}
                      onCheckedChange={(checked) => 
                        setFormData({ ...formData, pushConsent: checked as boolean })
                      }
                    />
                    <Label htmlFor="pushConsent" className="font-normal cursor-pointer">
                      Send push notifications
                    </Label>
                  </div>
                </div>
              </div>

              <div className="bg-success/10 border border-success/20 p-4 rounded-lg space-y-2">
                <div className="flex items-center gap-2 text-success">
                  <Heart className="h-5 w-5" />
                  <h4 className="font-semibold text-sm">Why register?</h4>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Be notified only when your blood type is needed nearby</li>
                  <li>• Complete anonymity until you choose to respond</li>
                  <li>• One donation can save up to 3 lives</li>
                  <li>• Join a community of verified lifesavers</li>
                </ul>
              </div>

              <Button type="submit" variant="secondary" size="lg" className="w-full">
                <Users className="h-5 w-5" />
                Register as Donor
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DonorRegister;
