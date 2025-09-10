import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import makkahImage from "@/assets/hero-kaaba.jpg";
import madinahImage from "@/assets/madinah-mosque.jpg";
import arafatImage from "@/assets/arafat-mountain.jpg";
import minaImage from "@/assets/mina-tents.jpg";

const destinations = [
  {
    id: 1,
    name: "Holy Makkah",
    description: "The sacred city home to the Holy Kaaba and the Grand Mosque. Experience the spiritual heart of Islam.",
    image: makkahImage,
    highlights: ["Grand Mosque", "Holy Kaaba", "Zamzam Well", "Safa and Marwah"]
  },
  {
    id: 2,
    name: "Madinah Al-Munawwarah",
    description: "The illuminated city of the Prophet (PBUH). Visit the Prophet's Mosque and sacred historical sites.",
    image: madinahImage,
    highlights: ["Prophet's Mosque", "Quba Mosque", "Qiblatain Mosque", "Mount Uhud"]
  },
  {
    id: 3,
    name: "Mount Arafat",
    description: "The sacred mountain where pilgrims gather for the Day of Arafat during Hajj pilgrimage.",
    image: arafatImage,
    highlights: ["Jabal ar-Rahmah", "Namira Mosque", "Plain of Arafat", "Muzdalifah"]
  },
  {
    id: 4,
    name: "Mina Valley",
    description: "The tent city where pilgrims stay during Hajj, featuring modern facilities and sacred rituals.",
    image: minaImage,
    highlights: ["Tent City", "Jamarat Bridge", "Jamarat Pillars", "Modern Facilities"]
  }
];

const Destinations = () => {
  return (
    <section id="destinations" className="py-20 px-6 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900">
            Sacred <span className="text-gold">Destinations</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the holy sites and sacred places that form the heart of your pilgrimage journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {destinations.map((destination, index) => (
            <Card 
              key={destination.id} 
              className="group hover:shadow-elegant transition-all duration-300 animate-fade-in-up border-0 shadow-soft"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                  {destination.name}
                </h3>
              </div>
              
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {destination.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-neutral-900">Key Highlights:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {destination.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-gold rounded-full mr-2"></div>
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full border-gold text-gold hover:bg-gold hover:text-white"
                  onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Book Transport
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;