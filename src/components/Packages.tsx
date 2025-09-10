import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, MapPin, Users } from "lucide-react";

const packages = [
  {
    id: 1,
    name: "Essential Pilgrimage",
    price: "299",
    duration: "3 Days",
    capacity: "8 People",
    description: "Perfect for first-time pilgrims with essential transport to holy sites.",
    features: [
      "Makkah to Madinah Transport",
      "Grand Mosque Visits",
      "Prophet's Mosque Access",
      "English Speaking Guide",
      "Air-conditioned Vehicles"
    ],
    popular: false
  },
  {
    id: 2,
    name: "Complete Hajj Journey",
    price: "599",
    duration: "7 Days", 
    capacity: "12 People",
    description: "Comprehensive package covering all Hajj sites with premium comfort.",
    features: [
      "All Sacred Sites Transport",
      "Mina Valley Accommodation",
      "Arafat Day Special Service",
      "Jamarat Bridge Access",
      "24/7 Support Service",
      "Premium Vehicles"
    ],
    popular: true
  },
  {
    id: 3,
    name: "Umrah Express",
    price: "199",
    duration: "2 Days",
    capacity: "6 People",
    description: "Quick and efficient transport for Umrah pilgrims.",
    features: [
      "Makkah City Transport",
      "Grand Mosque Priority",
      "Zamzam Water Access",
      "Safa Marwah Route",
      "Flexible Timing"
    ],
    popular: false
  },
  {
    id: 4,
    name: "Luxury Pilgrimage",
    price: "899", 
    duration: "10 Days",
    capacity: "4 People",
    description: "Premium experience with luxury vehicles and exclusive services.",
    features: [
      "Luxury Vehicle Fleet",
      "Private Tour Guide",
      "All Historical Sites",
      "VIP Mosque Access",
      "Personal Assistant",
      "Photography Service"
    ],
    popular: false
  }
];

const Packages = () => {
  return (
    <section id="packages" className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900">
            Pilgrimage <span className="text-gold">Packages</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose from our carefully crafted packages designed to enhance your spiritual journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packages.map((pkg, index) => (
            <Card 
              key={pkg.id}
              className={`relative group hover:shadow-elegant transition-all duration-300 animate-fade-in-up border-0 shadow-soft ${
                pkg.popular ? 'ring-2 ring-gold scale-105' : ''
              }`}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              {pkg.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gold text-white px-4 py-1">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-neutral-900 mb-2">
                  {pkg.name}
                </CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gold">${pkg.price}</span>
                  <span className="text-muted-foreground"> /person</span>
                </div>
                
                <div className="flex justify-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {pkg.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {pkg.capacity}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                  {pkg.description}
                </p>
                
                <div className="space-y-3 mb-6">
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start text-sm">
                      <CheckCircle className="w-4 h-4 text-gold mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className={`w-full ${
                    pkg.popular 
                      ? 'bg-gold hover:bg-gold-dark text-white' 
                      : 'border-gold text-gold hover:bg-gold hover:text-white'
                  }`}
                  variant={pkg.popular ? "default" : "outline"}
                  onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Book Package
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;