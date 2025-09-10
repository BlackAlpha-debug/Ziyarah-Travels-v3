import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, MapPin, Package, Phone, User } from "lucide-react";

const Booking = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    package: "",
    startDate: "",
    endDate: "",
    passengers: "1",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Booking submitted:", formData);
    alert("Booking request submitted! We will contact you soon.");
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="booking" className="py-20 px-6 bg-neutral-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900">
            Book Your <span className="text-gold">Sacred Journey</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start your pilgrimage with us. Fill out the form below and we'll create a personalized journey for you.
          </p>
        </div>

        <Card className="shadow-elegant border-0 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-neutral-900">Booking Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                    className="border-border focus:ring-gold focus:border-gold"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    required
                    className="border-border focus:ring-gold focus:border-gold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                  className="border-border focus:ring-gold focus:border-gold"
                />
              </div>

              {/* Journey Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    Destination *
                  </Label>
                  <Select value={formData.destination} onValueChange={(value) => handleChange('destination', value)}>
                    <SelectTrigger className="border-border focus:ring-gold focus:border-gold">
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="makkah">Holy Makkah</SelectItem>
                      <SelectItem value="madinah">Madinah Al-Munawwarah</SelectItem>
                      <SelectItem value="arafat">Mount Arafat</SelectItem>
                      <SelectItem value="mina">Mina Valley</SelectItem>
                      <SelectItem value="multiple">Multiple Destinations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center">
                    <Package className="w-4 h-4 mr-2" />
                    Package Type *
                  </Label>
                  <Select value={formData.package} onValueChange={(value) => handleChange('package', value)}>
                    <SelectTrigger className="border-border focus:ring-gold focus:border-gold">
                      <SelectValue placeholder="Select package" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="essential">Essential Pilgrimage </SelectItem>
                      <SelectItem value="complete">Complete Hajj Journey </SelectItem>
                      <SelectItem value="umrah">Umrah Express </SelectItem>
                      <SelectItem value="luxury">Luxury Pilgrimage </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="startDate" className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Start Date *
                  </Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleChange('startDate', e.target.value)}
                    required
                    className="border-border focus:ring-gold focus:border-gold"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleChange('endDate', e.target.value)}
                    className="border-border focus:ring-gold focus:border-gold"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Number of Passengers</Label>
                  <Select value={formData.passengers} onValueChange={(value) => handleChange('passengers', value)}>
                    <SelectTrigger className="border-border focus:ring-gold focus:border-gold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1,2,3,4,5,6,7,8,9,10].map(num => (
                        <SelectItem key={num} value={num.toString()}>{num} {num === 1 ? 'Person' : 'People'}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Special Requirements or Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  placeholder="Any special requirements, accessibility needs, or additional information..."
                  className="border-border focus:ring-gold focus:border-gold min-h-[100px]"
                />
              </div>

              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full bg-gold hover:bg-gold-dark text-white py-3 text-lg shadow-elegant"
                >
                  Submit Booking Request
                </Button>
                <p className="text-sm text-muted-foreground text-center mt-3">
                  Our team will contact you within 24 hours to confirm your booking details.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Booking;