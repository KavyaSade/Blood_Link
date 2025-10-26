import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  Clock,
  MapPin,
  Phone,
  User,
  CheckCircle,
  XCircle,
  Users,
  Trash2,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  bloodType: string | null;
  userType: 'DONOR' | 'BLOOD_BANK' | 'ADMIN';
  createdAt: string;
}

// Mock data for active requests
const mockRequests = [];

const Dashboard = () => {
  console.log('Dashboard component rendered');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Use relative path so Vite dev proxy (or production same-origin) handles routing
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      console.log('Fetched users:', data);
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users. Please make sure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();

    // Poll for updates every 5 seconds
    const interval = setInterval(fetchUsers, 5000);
    return () => clearInterval(interval);
  }, []);

  const createTestUser = async () => {
    try {
      const payload = {
        email: `test+${Date.now()}@example.com`,
        name: 'Test Donor',
        phone: '+10000000000',
        address: 'Test City',
        bloodType: 'O+',
        userType: 'DONOR',
      } as const;

      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || 'Failed to create test user');
      }

      const created = await res.json();
      console.log('Created test user:', created);
      toast.success('Test user created');
      // Refresh list
      fetchUsers();
    } catch (err: any) {
      console.error('Error creating test user:', err);
      toast.error(err?.message || 'Failed to create test user');
    }
  };
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
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage users and blood requests in one place
          </p>
        </div>

        {/* User Management Section */}
        <div className="mb-8">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Registered Users</h2>
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <Badge variant="outline">
                    Total Users: {users.length}
                  </Badge>
                  <Badge variant="outline">
                    Donors: {users.filter(u => u.userType === 'DONOR').length}
                  </Badge>
                  <Badge variant="outline">
                    Blood Banks: {users.filter(u => u.userType === 'BLOOD_BANK').length}
                  </Badge>
                </div>

                <Button variant="ghost" size="sm" onClick={createTestUser}>
                  Add test user
                </Button>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-8">Loading users...</div>
            ) : users.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No users registered yet
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  {/* Table Header, Body */}
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Blood Type</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge>
                            {user.userType}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.bloodType || 'N/A'}</TableCell>
                        <TableCell>{user.phone || 'N/A'}</TableCell>
                        <TableCell>
                          {new Date(user.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="destructive"
                                size="sm"
                                className="h-7 px-3"
                                title="Delete user"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete User</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete {user.name}? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={async () => {
                                    try {
                                      const res = await fetch(`/api/users/${user.id}`, {
                                        method: 'DELETE',
                                      });
                                      
                                      if (!res.ok) {
                                        const err = await res.json().catch(() => ({}));
                                        throw new Error(err?.error || 'Failed to delete user');
                                      }

                                      toast.success(`Deleted ${user.name}`);
                                      fetchUsers(); // Refresh list
                                    } catch (err: any) {
                                      console.error('Error deleting user:', err);
                                      toast.error(err?.message || 'Failed to delete user');
                                    }
                                  }}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </Card>
        </div>

        {/* Blood Requests Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Active Blood Requests</h2>
          <p className="text-muted-foreground mb-6">
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
