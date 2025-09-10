import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, MessageCircle, Phone, Clock } from "lucide-react";

const Contact = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: "Phone",
      value: "+966 12 345 6789",
      description: "24/7 Customer Support",
      action: "tel:+966123456789"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: "+966 55 123 4567",
      description: "Instant messaging support",
      action: "https://wa.me/966551234567"
    },
    {
      icon: Mail,
      title: "Email",
      value: "info@sacredjourney.sa",
      description: "Send us your inquiries",
      action: "mailto:info@sacredjourney.sa"
    },
    {
      icon: MapPin,
      title: "Office",
      value: "Makkah, Saudi Arabia",
      description: "Visit our main office",
      action: "#"
    }
  ];

  const officeHours = [
    { day: "Sunday - Thursday", hours: "8:00 AM - 8:00 PM" },
    { day: "Friday", hours: "2:00 PM - 8:00 PM" },
    { day: "Saturday", hours: "8:00 AM - 6:00 PM" },
    { day: "Emergency Support", hours: "24/7 Available" }
  ];

  return (
    <section id="contact" className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900">
            Contact <span className="text-gold">Us</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get in touch with our dedicated team for personalized assistance with your pilgrimage journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Methods */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {contactMethods.map((method, index) => (
              <Card 
                key={index}
                className="group hover:shadow-elegant transition-all duration-300 animate-fade-in-up border-0 shadow-soft cursor-pointer"
                style={{animationDelay: `${index * 0.1}s`}}
                onClick={() => {
                  if (method.action.startsWith('http')) {
                    window.open(method.action, '_blank');
                  } else if (method.action.startsWith('tel:') || method.action.startsWith('mailto:')) {
                    window.location.href = method.action;
                  }
                }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors">
                    <method.icon className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-neutral-900">{method.title}</h3>
                  <p className="text-lg font-medium text-gold mb-1">{method.value}</p>
                  <p className="text-muted-foreground text-sm">{method.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Office Hours */}
          <Card className="shadow-elegant border-0 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <CardHeader>
              <CardTitle className="flex items-center text-neutral-900">
                <Clock className="w-5 h-5 mr-2 text-gold" />
                Office Hours
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {officeHours.map((schedule, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-neutral-900">{schedule.day}</p>
                    <p className="text-gold text-sm">{schedule.hours}</p>
                  </div>
                </div>
              ))}
              
              <div className="pt-4 border-t border-border">
                <Button 
                  className="w-full bg-gold hover:bg-gold-dark text-white"
                  onClick={() => window.open('https://wa.me/966551234567', '_blank')}
                >
                  Emergency Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Location Map Placeholder */}
        <div className="mt-12 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <Card className="shadow-elegant border-0">
            <CardContent className="p-0">
              <div className="h-80 bg-gradient-to-r from-neutral-100 to-neutral-200 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="text-center z-10">
                  <MapPin className="w-12 h-12 text-gold mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">Our Location</h3>
                  <p className="text-muted-foreground">Al Haram District, Makkah 24231, Saudi Arabia</p>
                  <Button 
                    variant="outline" 
                    className="mt-4 border-gold text-gold hover:bg-gold hover:text-white"
                    onClick={() => window.open('https://maps.google.com/?q=Makkah,Saudi+Arabia', '_blank')}
                  >
                    View on Google Maps
                  </Button>
                </div>
                {/* Decorative Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="w-full h-full bg-gold transform rotate-12 scale-150"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;