import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, Clock, MapPin, Phone, User, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

// Mock data for active requests
const mockRequests = [
  {
    id: 1,
    patientName: "John Doe",
    bloodGroup: "O-",
    unitsRequired: 2,
    urgency: "critical",
    location: "City General Hospital, 123 Main St",
    contactPhone: "+1 (555) 123-4567",
    timePosted: "5 minutes ago",
    status: "open",
    distance: "1.2 km away",
  },
  {
    id: 2,
    patientName: "Jane Smith",
    bloodGroup: "A+",
    unitsRequired: 3,
    urgency: "high",
    location: "St. Mary's Medical Center, 456 Oak Ave",
    contactPhone: "+1 (555) 234-5678",
    timePosted: "15 minutes ago",
    status: "open",
    distance: "3.5 km away",
  },
  {
    id: 3,
    patientName: "Mike Johnson",
    bloodGroup: "B+",
    unitsRequired: 1,
    urgency: "medium",
    location: "Riverside Clinic, 789 River Rd",
    contactPhone: "+1 (555) 345-6789",
    timePosted: "1 hour ago",
    status: "assigned",
    distance: "5.8 km away",
  },
];

const Dashboard = () => {
  const handleRespond = (requestId: number, patientName: string) => {
    toast.success("Response sent!", {
      description: `Your contact information has been shared with ${patientName}'s family.`,
    });
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "bg-emergency text-emergency-foreground";
      case "high":
        return "bg-primary text-primary-foreground";
      case "medium":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <AlertCircle className="h-4 w-4" />;
      case "assigned":
        return <CheckCircle className="h-4 w-4" />;
      case "closed":
        return <XCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Active Blood Requests</h1>
          <p className="text-muted-foreground">
            Real-time emergency blood requests in your area. Respond quickly to save lives.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 space-y-2">
            <div className="text-sm text-muted-foreground">Active Requests</div>
            <div className="text-3xl font-bold text-primary">
              {mockRequests.filter(r => r.status === "open").length}
            </div>
          </Card>
          <Card className="p-4 space-y-2">
            <div className="text-sm text-muted-foreground">Critical</div>
            <div className="text-3xl font-bold text-emergency">
              {mockRequests.filter(r => r.urgency === "critical").length}
            </div>
          </Card>
          <Card className="p-4 space-y-2">
            <div className="text-sm text-muted-foreground">Assigned</div>
            <div className="text-3xl font-bold text-success">
              {mockRequests.filter(r => r.status === "assigned").length}
            </div>
          </Card>
          <Card className="p-4 space-y-2">
            <div className="text-sm text-muted-foreground">Avg Response Time</div>
            <div className="text-3xl font-bold">8 min</div>
          </Card>
        </div>

        {/* Request Cards */}
        <div className="space-y-4">
          {mockRequests.map((request) => (
            <Card key={request.id} className="p-6 shadow-medium hover:shadow-urgent transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1 space-y-3">
                  {/* Header */}
                  <div className="flex items-start gap-3 flex-wrap">
                    <Badge className={`${getUrgencyColor(request.urgency)} font-semibold`}>
                      {request.urgency.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      {getStatusIcon(request.status)}
                      {request.status}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {request.timePosted}
                    </div>
                  </div>

                  {/* Patient Info */}
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <span className="font-semibold text-lg">{request.patientName}</span>
                  </div>

                  {/* Blood Details */}
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="bg-primary text-primary-foreground font-bold px-3 py-1 rounded">
                        {request.bloodGroup}
                      </div>
                      <span className="text-muted-foreground">
                        {request.unitsRequired} {request.unitsRequired === 1 ? 'unit' : 'units'} needed
                      </span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div>
                      <div>{request.location}</div>
                      <div className="text-primary font-medium">{request.distance}</div>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a href={`tel:${request.contactPhone}`} className="text-primary hover:underline">
                      {request.contactPhone}
                    </a>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 lg:w-48">
                  {request.status === "open" ? (
                    <>
                      <Button
                        variant="emergency"
                        onClick={() => handleRespond(request.id, request.patientName)}
                      >
                        I Can Help
                      </Button>
                      <Button variant="outline" asChild>
                        <a href={`tel:${request.contactPhone}`}>
                          <Phone className="h-4 w-4" />
                          Call Now
                        </a>
                      </Button>
                    </>
                  ) : (
                    <div className="text-center p-4 bg-success/10 text-success rounded-lg">
                      <CheckCircle className="h-6 w-6 mx-auto mb-2" />
                      <div className="text-sm font-medium">Donor Found</div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State (if no requests) */}
        {mockRequests.length === 0 && (
          <Card className="p-12 text-center">
            <div className="max-w-md mx-auto space-y-4">
              <div className="bg-muted rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
              <h3 className="text-xl font-semibold">No Active Requests</h3>
              <p className="text-muted-foreground">
                Great news! There are currently no emergency blood requests in your area.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
