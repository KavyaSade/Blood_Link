import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, MapPin } from "lucide-react";
import { toast } from "sonner";

const EmergencyRequest = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patientName: "",
    bloodGroup: "",
    unitsRequired: "",
    location: "",
    contactPhone: "",
    urgency: "high",
    additionalInfo: "",
  });

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.patientName || !formData.bloodGroup || !formData.unitsRequired || !formData.location || !formData.contactPhone) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Simulate request submission
    toast.success("Emergency request submitted! Notifying nearby blood banks and donors...", {
      description: "You will be contacted as soon as we find a match.",
    });

    // Navigate to dashboard after 2 seconds
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
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
              <AlertCircle className="h-5 w-5" />
              <span className="font-medium">Emergency Blood Request</span>
            </div>
            <h1 className="text-4xl font-bold mb-3">Request Blood Urgently</h1>
            <p className="text-muted-foreground">
              Fill in the details below. We'll immediately notify nearby blood banks and donors.
            </p>
          </div>

          {/* Form */}
          <Card className="p-8 shadow-medium">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="patientName">Patient Name *</Label>
                <Input
                  id="patientName"
                  placeholder="Enter patient name"
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                  required
                />
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
                      <SelectValue placeholder="Select blood group" />
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
                  <Label htmlFor="unitsRequired">Units Required *</Label>
                  <Input
                    id="unitsRequired"
                    type="number"
                    min="1"
                    placeholder="e.g., 2"
                    value={formData.unitsRequired}
                    onChange={(e) => setFormData({ ...formData, unitsRequired: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location / Hospital Address *</Label>
                <div className="relative">
                  <Input
                    id="location"
                    placeholder="Enter hospital or location address"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="pl-10"
                    required
                  />
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPhone">Contact Phone Number *</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="urgency">Urgency Level</Label>
                <Select
                  value={formData.urgency}
                  onValueChange={(value) => setFormData({ ...formData, urgency: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical">Critical (Minutes)</SelectItem>
                    <SelectItem value="high">High (Hours)</SelectItem>
                    <SelectItem value="medium">Medium (Today)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalInfo">Additional Information</Label>
                <Textarea
                  id="additionalInfo"
                  placeholder="Any additional details that might help..."
                  value={formData.additionalInfo}
                  onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="bg-muted p-4 rounded-lg space-y-2">
                <h4 className="font-semibold text-sm">What happens next?</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Nearby blood banks will be notified immediately</li>
                  <li>• Registered donors with matching blood type will receive alerts</li>
                  <li>• You'll be contacted as soon as a match is found</li>
                  <li>• Average response time: &lt;10 minutes</li>
                </ul>
              </div>

              <Button type="submit" variant="emergency" size="lg" className="w-full">
                <AlertCircle className="h-5 w-5" />
                Submit Emergency Request
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmergencyRequest;
