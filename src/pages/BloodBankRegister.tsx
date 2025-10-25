import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Plus, Minus } from "lucide-react";
import { toast } from "sonner";

const BloodBankRegister = () => {
  const navigate = useNavigate();
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  
  const [formData, setFormData] = useState({
    bankName: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    workingHours: "",
    license: "",
    inventory: bloodGroups.reduce((acc, group) => ({ ...acc, [group]: 0 }), {} as Record<string, number>),
  });

  const updateInventory = (bloodGroup: string, change: number) => {
    setFormData({
      ...formData,
      inventory: {
        ...formData.inventory,
        [bloodGroup]: Math.max(0, (formData.inventory[bloodGroup] || 0) + change),
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.bankName || !formData.contactPerson || !formData.phone || !formData.address) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success("Blood Bank registered successfully!", {
      description: "You'll now receive emergency alerts when blood is needed in your area.",
    });

    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-4">
              <Building2 className="h-5 w-5" />
              <span className="font-medium">Blood Bank Registration</span>
            </div>
            <h1 className="text-4xl font-bold mb-3">Register Your Blood Bank</h1>
            <p className="text-muted-foreground">
              Connect with those in need. Receive instant emergency alerts and help save lives.
            </p>
          </div>

          {/* Form */}
          <Card className="p-8 shadow-medium">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="bankName">Blood Bank Name *</Label>
                <Input
                  id="bankName"
                  placeholder="Enter blood bank name"
                  value={formData.bankName}
                  onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Contact Person *</Label>
                  <Input
                    id="contactPerson"
                    placeholder="Name of contact person"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    required
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

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="contact@bloodbank.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Full Address *</Label>
                <Textarea
                  id="address"
                  placeholder="Enter complete address with city and postal code"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="workingHours">Working Hours</Label>
                  <Input
                    id="workingHours"
                    placeholder="e.g., 24/7 or 9 AM - 6 PM"
                    value={formData.workingHours}
                    onChange={(e) => setFormData({ ...formData, workingHours: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="license">License Number</Label>
                  <Input
                    id="license"
                    placeholder="Blood bank license number"
                    value={formData.license}
                    onChange={(e) => setFormData({ ...formData, license: e.target.value })}
                  />
                </div>
              </div>

              {/* Blood Inventory */}
              <div className="space-y-4">
                <Label>Current Blood Inventory (Units)</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {bloodGroups.map((group) => (
                    <Card key={group} className="p-4 space-y-3">
                      <div className="text-center font-semibold text-lg text-primary">
                        {group}
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          type="button"
                          size="icon"
                          variant="outline"
                          onClick={() => updateInventory(group, -1)}
                          className="h-8 w-8"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <div className="w-12 text-center font-semibold">
                          {formData.inventory[group]}
                        </div>
                        <Button
                          type="button"
                          size="icon"
                          variant="outline"
                          onClick={() => updateInventory(group, 1)}
                          className="h-8 w-8"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  You can update inventory levels anytime from your dashboard
                </p>
              </div>

              <div className="bg-secondary/10 border border-secondary/20 p-4 rounded-lg space-y-2">
                <h4 className="font-semibold text-sm">Benefits of Registration</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Receive instant emergency blood requests in your area</li>
                  <li>• Automated matching based on your inventory</li>
                  <li>• Direct connection with those in urgent need</li>
                  <li>• Real-time inventory management dashboard</li>
                </ul>
              </div>

              <Button type="submit" variant="secondary" size="lg" className="w-full">
                <Building2 className="h-5 w-5" />
                Register Blood Bank
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BloodBankRegister;
