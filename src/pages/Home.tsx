// src/pages/Home.tsx
import Navigation from "@/components/Navigation";
import WhatsAppButton from "../components/WhatsappAppButton";
import Hero from "../components/Hero";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Star, Quote } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Added useNavigate
import makkahImage from "@/assets/destinations/Umrah-Pakistan.webp";
import madinahMunawaraImage from "@/assets/destinations/madinah-al-munawara.jpg";
import valleyJinImage from "@/assets/destinations/jin.webp";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/select";

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
  "Prince Mohammed bin Abdulaziz Airport",
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
  "Jabal Thawr",
];

const featuredDestinations = [
  {
    id: 1,
    name: "Holy Makkah",
    description:
      "The sacred city of Islam, home to the Holy Kaaba and the Grand Mosque, where each prayer equals 100,000 rewards.",
    image: makkahImage,
  },
  {
    id: 2,
    name: "Madinah Al-Munawwarah",
    description:
      "The radiant city of the Prophet Muhammad (PBUH), known for its peace, spirituality, and historical mosques.",
    image: madinahMunawaraImage,
  },
  {
    id: 3,
    name: "Wadiy-e-Jinn",
    description:
      "A mysterious valley near Medina, famous for its natural illusion where vehicles seem to move on their own.",
    image: valleyJinImage,
  },
];

// Updated Featured Packages
const featuredPackages = [
  {
    id: 1,
    name: "Umrah Express",
    price: "900 SAR",
    description:
      "Seamless transfers: Jeddah Airport → Makkah Hotel → Madinah Hotel → Madinah Airport.",
    popular: false,
  },
  {
    id: 2,
    name: "Umrah Premium",
    price: "1,500 SAR",
    description:
      "Full-circle journey: Jeddah Airport → Makkah → Madinah → Makkah → Jeddah Airport.",
    popular: true,
  },
];

const testimonials = [
  {
    id: 1,
    name: "Ahmed Al-Rashid",
    location: "Riyadh, Saudi Arabia",
    rating: 5,
    text:
      "Exceptional service throughout our Hajj journey. The drivers were knowledgeable and respectful of our pilgrimage needs.",
    date: "2024-01-15",
  },
  {
    id: 2,
    name: "Fatima Hassan",
    location: "Jeddah, Saudi Arabia",
    rating: 5,
    text:
      "Professional and reliable transport service. Made our spiritual journey comfortable and stress-free.",
    date: "2024-02-03",
  },
  {
    id: 3,
    name: "Mohammad Ibrahim",
    location: "Dammam, Saudi Arabia",
    rating: 5,
    text:
      "Highly recommend Sacred Journey for pilgrimage transport. Punctual, clean vehicles, and excellent customer service.",
    date: "2024-01-28",
  },
];

const Home = () => {
  const navigate = useNavigate(); // ✅ Initialize navigate

  const handleQuickBookingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const from = formData.get("from") as string;
    const to = formData.get("to") as string;

    if (from && to) {
      navigate(`/select-cab?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`);
    }
  };

  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />

      {/* Quick Cab Booking */}
      <section className="py-16 px-6 bg-background border-b">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900">
              Quick <span className="text-gold">Cab Booking</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Book your pilgrimage transportation instantly
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-elegant p-8 border border-neutral-100">
            <form onSubmit={handleQuickBookingSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Starting Point
                  </label>
                  <Select name="from" required>
                    <SelectTrigger className="h-12 border-neutral-200 focus:border-gold focus:ring-gold">
                      <SelectValue placeholder="Select pickup location" />
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
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Destination
                  </label>
                  <Select name="to" required>
                    <SelectTrigger className="h-12 border-neutral-200 focus:border-gold focus:ring-gold">
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      {destinations.map((destination) => (
                        <SelectItem key={destination} value={destination}>
                          {destination}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  type="submit"
                  size="lg"
                  className="bg-gold hover:bg-gold-dark text-white px-12 py-3 text-lg font-semibold"
                >
                  Find Cabs
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 px-6 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900">
              Featured <span className="text-gold">Destinations</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Discover the most sacred places for your pilgrimage journey
            </p>
            <Link to="/destinations">
              <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-white">
                View All Destinations
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDestinations.map((destination, index) => (
              <Card
                key={destination.id}
                className="group hover:shadow-elegant transition-all duration-300 animate-fade-in-up border-0 shadow-soft"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">
                    {destination.name}
                  </h3>
                </div>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">{destination.description}</p>
                  <Link to="/booking">
                    <Button variant="outline" className="w-full border-gold text-gold hover:bg-gold hover:text-white">
                      Book Transport
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900">
              Popular <span className="text-gold">Packages</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Carefully crafted packages for your spiritual journey
            </p>
            <Link to="/packages">
              <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-white">
                View All Packages
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {featuredPackages.map((pkg, index) => (
              <Card
                key={pkg.id}
                className={`relative group hover:shadow-elegant transition-all duration-300 animate-fade-in-up border-0 shadow-soft ${
                  pkg.popular ? "ring-2 ring-gold scale-105" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {pkg.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gold text-white px-4 py-1">
                    Most Popular
                  </Badge>
                )}
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">{pkg.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gold">{pkg.price}</span>
                  </div>
                  <p className="text-muted-foreground mb-6">{pkg.description}</p>
                  <div>
                    <Link to="/booking">
                      <Button
                        className={`w-full ${
                          pkg.popular
                            ? "bg-gold hover:bg-gold-dark text-white"
                            : "border-gold text-gold hover:bg-gold hover:text-white"
                        }`}
                        variant={pkg.popular ? "default" : "outline"}
                      >
                        Book Package
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews & Testimonials */}
      <section className="py-20 px-6 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900">
              Pilgrim <span className="text-gold">Reviews</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Hear from fellow pilgrims who trusted us with their sacred journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {testimonials.map((testimonial, index) => (
              <Card
                key={testimonial.id}
                className="group hover:shadow-elegant transition-all duration-300 animate-fade-in-up border-0 shadow-soft"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Quote className="w-8 h-8 text-gold mr-3" />
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.text}"</p>
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-neutral-900">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    <p className="text-xs text-muted-foreground mt-1">{testimonial.date}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/review">
              <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-white">
                Share Your Experience
              </Button>
            </Link>
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
              <Link to="/contact" className="hover:text-gold transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </main>
  );
};

export default Home;