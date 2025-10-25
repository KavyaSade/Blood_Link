import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { AlertCircle, Users, Building2, Activity, Droplet } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-block">
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              Emergency Blood Donation Platform
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Save Lives with{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Instant Blood Access
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect blood banks and willing donors with those in urgent need. 
            Automated matching, real-time notifications, and life-saving connections.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/emergency">
              <Button variant="emergency" size="lg" className="gap-2">
                <AlertCircle className="h-5 w-5" />
                Post Emergency Request
              </Button>
            </Link>
            <Link to="/donor-register">
              <Button variant="outline" size="lg">
                Register as Donor
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 space-y-4 shadow-medium hover:shadow-urgent transition-shadow">
            <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Blood Bank Network</h3>
            <p className="text-muted-foreground">
              Registered blood banks receive instant alerts and can respond immediately to emergencies.
            </p>
          </Card>

          <Card className="p-6 space-y-4 shadow-medium hover:shadow-urgent transition-shadow">
            <div className="bg-secondary/10 w-12 h-12 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold">Donor Community</h3>
            <p className="text-muted-foreground">
              Thousands of verified donors ready to help. Get notified when your blood type is needed nearby.
            </p>
          </Card>

          <Card className="p-6 space-y-4 shadow-medium hover:shadow-urgent transition-shadow">
            <div className="bg-success/10 w-12 h-12 rounded-lg flex items-center justify-center">
              <Activity className="h-6 w-6 text-success" />
            </div>
            <h3 className="text-xl font-semibold">Real-time Matching</h3>
            <p className="text-muted-foreground">
              Smart geo-location based matching connects requests with nearest available resources instantly.
            </p>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <div className="text-center space-y-3">
            <div className="bg-gradient-hero w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto shadow-urgent">
              1
            </div>
            <h4 className="font-semibold">Post Request</h4>
            <p className="text-sm text-muted-foreground">
              Submit blood type, units needed, and location
            </p>
          </div>
          
          <div className="text-center space-y-3">
            <div className="bg-secondary w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto">
              2
            </div>
            <h4 className="font-semibold">Auto-Match</h4>
            <p className="text-sm text-muted-foreground">
              System alerts nearby blood banks first
            </p>
          </div>
          
          <div className="text-center space-y-3">
            <div className="bg-secondary w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto">
              3
            </div>
            <h4 className="font-semibold">Notify Donors</h4>
            <p className="text-sm text-muted-foreground">
              If needed, alert willing donors via SMS/push
            </p>
          </div>
          
          <div className="text-center space-y-3">
            <div className="bg-success w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto">
              4
            </div>
            <h4 className="font-semibold">Connect & Save</h4>
            <p className="text-sm text-muted-foreground">
              Direct contact between donor and requestor
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10K+</div>
              <div className="text-muted-foreground">Active Donors</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Blood Banks</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">2,500+</div>
              <div className="text-muted-foreground">Lives Saved</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">&lt;10 min</div>
              <div className="text-muted-foreground">Avg Response Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-4xl font-bold">Ready to Make a Difference?</h2>
          <p className="text-xl text-muted-foreground">
            Join our community of lifesavers. Whether you need blood urgently or want to donate, 
            we're here to connect you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/donor-register">
              <Button size="lg" variant="secondary">
                <Users className="h-5 w-5" />
                Become a Donor
              </Button>
            </Link>
            <Link to="/bloodbank-register">
              <Button size="lg" variant="outline">
                <Building2 className="h-5 w-5" />
                Register Blood Bank
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-card">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Droplet className="h-5 w-5 text-primary" />
              <span className="font-semibold">BloodLink</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground">About</a>
              <a href="#" className="hover:text-foreground">Privacy</a>
              <a href="#" className="hover:text-foreground">Terms</a>
              <a href="#" className="hover:text-foreground">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
