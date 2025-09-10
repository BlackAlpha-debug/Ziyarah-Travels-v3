import Navigation from "../components/Navigation";
import WhatsAppButton from "../components/WhatsappAppButton";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Calendar } from "../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { CalendarIcon, CheckCircle, Phone, MessageCircle } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

// Pickup locations
const pickupLocations = [
  "Jeddah Airport",
  "Madinah Airport",
  "Makkah Hotels",
  "Madinah Hotels",
  "Jeddah Hotels",
  "Al-Haram Area",
  "Prophet's Mosque Area",
  "Aziziyah District",
  "Al-Hijra District",
  "Ajyad District",
  "Al-Misfalah District",
  "Al-Jamiah District",
  "King Abdulaziz International Airport",
  "Prince Mohammed bin Abdulaziz Airport"
];

// Simplified destinations
const destinations = [
  "Holy Makkah",
  "Al-Ghars Well",
  "Madinah Al-Munawwarah",
  "Quba Mosque",
  "Mount Uhud",
  "Masjid al-Qiblatayn",
  "Mina Valley",
  "Be'er Shifa",
  "Valley Jin",
  "Jabal Thawr"
];

// Car models
const carModels = [
  "H1 Starex",
  "Toyota Camry",
  "GMC 2020",
  "GMC 2025",
  "Hyundai Sonata"
];

// Packages with "None" option
const packages = [
  { name: "None", value: "none" },
  { name: "Umrah Premium", value: "essential" },
  { name: "Complete Hajj Journey", value: "hajj" },
  { name: "Umrah Express", value: "umrah" },
  { name: "Luxury Pilgrimage", value: "luxury" },
  { name: "Madina City Ziyarat", value: "historical" },
  { name: "Family Pilgrimage Package", value: "family" }
];

const BookingPage = () => {
  const [date, setDate] = useState<Date | undefined>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    package: "none",
    pickup: "",
    destination: "",
    tripType: "",
    carModel: "",
    specialRequests: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  // Handle form submission + auto-open WhatsApp with booking details
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Format date for message
    const formattedDate = date ? format(date, "PPP") : "Not selected";

    // Find package name
    const selectedPackage = packages.find(p => p.value === formData.package)?.name || "None";

    // Construct WhatsApp message
    const message = `
*NEW BOOKING REQUEST*

*Personal Info:*
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}

*Booking Details:*
Package: ${selectedPackage}
Preferred Date: ${formattedDate}
Pickup: ${formData.pickup || "Not selected"}
Destination: ${formData.destination || "N/A (Package Selected)"}
Trip Type: ${formData.tripType || "N/A (Package Selected)"}
Vehicle: ${formData.carModel || "Not specified"}

*Special Requests:*
${formData.specialRequests || "None"}

*Please contact the customer to confirm.*
    `.trim();

    // Encode for URL
    const encodedMessage = encodeURIComponent(message);

    // WhatsApp number (without + or spaces)
    const whatsappNumber = "92305754320"; // Pakistan number

    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");

    // Show confirmation UI
    setIsSubmitted(true);
  };

  // Determine if a package is selected (not "None")
  const isPackageSelected = formData.package !== "none" && formData.package !== "";

  // Confirmation screen
  if (isSubmitted) {
    return (
      <main className="min-h-screen">
        <Navigation />
        <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-in-up">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Booking <span className="text-gold">Confirmed</span>
              </h1>
              <p className="text-xl text-neutral-200 max-w-3xl mx-auto leading-relaxed mb-8">
                Thank you for choosing Sacred Journey Transport Services. We have received your booking request and will contact you shortly to confirm the details.
              </p>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">What's Next?</h3>
                <div className="space-y-4 text-neutral-200">
                  <p>✓ Our team will review your booking within 2 hours</p>
                  <p>✓ You'll receive a confirmation call or WhatsApp message</p>
                  <p>✓ Payment details and schedule will be shared</p>
                  <p>✓ Driver contact information will be provided 24 hours before</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/">
                    <Button 
                      className="bg-gold hover:bg-gold-dark text-white px-8 py-3 font-medium rounded-lg hover:scale-105 hover:shadow-lg hover:shadow-gold/30 transition-all duration-300"
                    >
                      Return Home
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button 
                      variant="outline" 
                      className="border-white !text-black !border-white hover:bg-white hover:!text-neutral-900 hover:scale-105 hover:shadow-lg hover:shadow-white/30 transition-all duration-300 font-medium px-8 py-3 rounded-lg"
                    >
                      Contact Us
                    </Button>
                  </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Book Your <span className="text-gold">Journey</span>
            </h1>
            <p className="text-xl text-neutral-200 max-w-4xl mx-auto leading-relaxed">
              Reserve your sacred transport with us and focus on what matters most - your spiritual journey
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 px-6 bg-neutral-50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-elegant opacity-0 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-neutral-900">
                    Booking Details
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Fill in your information and we'll contact you to confirm your booking
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          placeholder="Enter your first name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          placeholder="Enter your last name"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="50 123 4567"
                          required
                        />
                      </div>
                    </div>

                    {/* Package Type & Date */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Package Type</Label>
                        <Select
                          onValueChange={(value) => handleInputChange("package", value)}
                          value={formData.package}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select package" />
                          </SelectTrigger>
                          <SelectContent>
                            {packages.map((pkg) => (
                              <SelectItem key={pkg.value} value={pkg.value}>
                                {pkg.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Preferred Date *</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    {/* Pickup & Destination */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Pickup Location *</Label>
                        <Select
                          onValueChange={(value) => handleInputChange("pickup", value)}
                          value={formData.pickup}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select pickup" />
                          </SelectTrigger>
                          <SelectContent>
                            {pickupLocations.map((location) => (
                              <SelectItem key={location} value={location}>
                                {location}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Destination *</Label>
                        <Select
                          onValueChange={(value) => handleInputChange("destination", value)}
                          value={formData.destination}
                          required
                          disabled={isPackageSelected}
                        >
                          <SelectTrigger>
                            <SelectValue
                              placeholder={isPackageSelected ? "Included in package" : "Select destination"}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {destinations.map((dest) => (
                              <SelectItem key={dest} value={dest}>
                                {dest}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Trip Type & Vehicle */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Trip Type *</Label>
                        <Select
                          onValueChange={(value) => handleInputChange("tripType", value)}
                          value={formData.tripType}
                          disabled={isPackageSelected}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue
                              placeholder={isPackageSelected ? "Included in package" : "Select trip type"}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="one-way">One Way</SelectItem>
                            <SelectItem value="round-trip">Round Trip</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Vehicle Preference</Label>
                        <Select
                          onValueChange={(value) => handleInputChange("carModel", value)}
                          value={formData.carModel}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Choose vehicle" />
                          </SelectTrigger>
                          <SelectContent>
                            {carModels.map((model) => (
                              <SelectItem key={model} value={model}>
                                {model}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Special Requests */}
                    <div className="space-y-2">
                      <Label htmlFor="requests">Special Requests or Notes</Label>
                      <Textarea
                        id="requests"
                        value={formData.specialRequests}
                        onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                        placeholder="Any special requirements, accessibility needs, or additional information..."
                        rows={4}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gold hover:bg-gold-dark text-white py-3 text-lg font-semibold rounded-lg transition-colors"
                    >
                      Submit Booking Request
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Info */}
              <Card className="border-0 shadow-soft opacity-0 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">Need Immediate Assistance?</h3>
                  <div className="space-y-4">
                    {/* Call Us */}
                    <a
                      href="tel:+966501234567"
                      className="flex items-center space-x-3 hover:text-green-600 hover:underline transition-colors cursor-pointer"
                    >
                      <Phone className="w-5 h-5 text-gold" />
                      <div>
                        <p className="font-medium">Call Us</p>
                        <p className="text-sm text-muted-foreground">+966 50 123 4567</p>
                      </div>
                    </a>
                    {/* WhatsApp */}
                    <a
                      href={`https://wa.me/966501234567?text=${encodeURIComponent(
                        "Assalamu Alaikum, I'd like to inquire about your pilgrimage transport services."
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 hover:text-green-600 hover:underline transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-5 h-5 text-gold" />
                      <div>
                        <p className="font-medium">WhatsApp</p>
                        <p className="text-sm text-muted-foreground">+966 50 123 4567</p>
                      </div>
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Why Book With Us */}
              <Card className="border-0 shadow-soft opacity-0 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">Why Book With Us?</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-gold mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Licensed & Insured</p>
                        <p className="text-xs text-muted-foreground">Fully licensed transport service</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-gold mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Expert Local Drivers</p>
                        <p className="text-xs text-muted-foreground">Knowledgeable about all holy sites</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-gold mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">24/7 Support</p>
                        <p className="text-xs text-muted-foreground">Round-the-clock assistance</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-gold mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Modern Fleet</p>
                        <p className="text-xs text-muted-foreground">Clean, comfortable vehicles</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-2">Sacred Journey Transport Services</h3>
            <p className="text-neutral-300">Your trusted partner for pilgrimage transport in Saudi Arabia</p>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-sm text-neutral-400">
            <p>© 2024 Sacred Journey Transport Services. All rights reserved.</p>
            <div className="flex gap-4">
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Service</span>
              <span>•</span>
              <Link to="/contact" className="hover:text-gold transition-colors">Contact Us </Link>
            </div>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </main>
  );
};

export default BookingPage;