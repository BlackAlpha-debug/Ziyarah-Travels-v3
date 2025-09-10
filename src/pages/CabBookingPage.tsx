import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import WhatsAppButton from "@/components/WhatsappAppButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, MapPin, Phone, DollarSign } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// ✅ Define routes with exact pricing per vehicle model
const routes = [
  {
    name: "Jeddah Airport to Makkah Hotel",
    prices: {
      "Sonata": 250,
      "Camry": 250,
      "H1 Hyundai": 300,
      "Hyundai Staria": 350,
      "GMC": 400,
      "Hiace": 400
    }
  },
  {
    name: "Jeddah Airport to Jeddah Hotel",
    prices: {
      "Sonata": 200,
      "Camry": 200,
      "H1 Hyundai": 250,
      "Hyundai Staria": 270,
      "GMC": 250,
      "Hiace": 300
    }
  },
  {
    name: "Makkah Hotel to Madina Hotel",
    prices: {
      "Sonata": 500,
      "Camry": 500,
      "H1 Hyundai": 600,
      "Hyundai Staria": 650,
      "GMC": 800,
      "Hiace": 700
    }
  },
  {
    name: "Jeddah Airport to Madina Hotel",
    prices: {
      "Sonata": 550,
      "Camry": 550,
      "H1 Hyundai": 700,
      "Hyundai Staria": 750,
      "GMC": 1000,
      "Hiace": 800
    }
  },
  {
    name: "Madina Airport to Madina Hotel",
    prices: {
      "Sonata": 150,
      "Camry": 150,
      "H1 Hyundai": 200,
      "Hyundai Staria": 220,
      "GMC": 250,
      "Hiace": 300
    }
  },
  {
    name: "Madina Hotel to Madina Airport",
    prices: {
      "Sonata": 100,
      "Camry": 100,
      "H1 Hyundai": 150,
      "Hyundai Staria": 170,
      "GMC": 200,
      "Hiace": 250
    }
  },
  {
    name: "Makkah Ziyarat",
    prices: {
      "Sonata": 200,
      "Camry": 200,
      "H1 Hyundai": 250,
      "Hyundai Staria": 280,
      "GMC": 300,
      "Hiace": 350
    }
  },
  {
    name: "Madina Ziyarat",
    prices: {
      "Sonata": 150,
      "Camry": 150,
      "H1 Hyundai": 200,
      "Hyundai Staria": 230,
      "GMC": 300,
      "Hiace": 300
    }
  },
  {
    name: "Jeddah to Taif and Return",
    prices: {
      "Sonata": 1000,
      "Camry": 1000,
      "H1 Hyundai": 1000,
      "Hyundai Staria": 1200,
      "GMC": 1500,
      "Hiace": 1500
    }
  },
  {
    name: "Makkah to Taif and Return",
    prices: {
      "Sonata": 400,
      "Camry": 400,
      "H1 Hyundai": 500,
      "Hyundai Staria": 600,
      "GMC": 700,
      "Hiace": 700
    }
  },
  {
    name: "Madina Hotel to Makkah Hotel",
    prices: {
      "Sonata": 500,
      "Camry": 500,
      "H1 Hyundai": 600,
      "Hyundai Staria": 700,
      "GMC": 800,
      "Hiace": 700
    }
  },
  {
    name: "Makkah Hotel to Jeddah Airport",
    prices: {
      "Sonata": 200,
      "Camry": 200,
      "H1 Hyundai": 300,
      "Hyundai Staria": 350,
      "GMC": 400,
      "Hiace": 400
    }
  }
];

// ✅ Helper: Normalize cab name to match keys in price table
const normalizeCabName = (cabName: string): string => {
  const mapping: Record<string, string> = {
    "Camry": "Camry",
    "Sonata": "Sonata",
    "H1": "H1 Hyundai",
    "Hiace": "Hiace",
    "GMC Yukon 2020": "GMC",
    "GMC Yukon 2025": "GMC",
    "Hyundai Staria": "Hyundai Staria",
    "Staria": "Hyundai Staria",
    "H1 Hyundai": "H1 Hyundai"
  };

  for (const [key, value] of Object.entries(mapping)) {
    if (cabName.includes(key)) {
      return value;
    }
  }

  // Fallback: try exact match or return first sedan
  const validKeys = ["Sonata", "Camry", "H1 Hyundai", "Hyundai Staria", "GMC", "Hiace"];
  if (validKeys.includes(cabName)) {
    return cabName;
  }

  return "Camry"; // default fallback
};

const CabBookingPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const selectedCab = searchParams.get('cab') || '';
  const cabCategory = searchParams.get('category') || ''; // ✅ Keep category, remove price part

  // Normalize cab name to match pricing table keys
  const normalizedCab = normalizeCabName(selectedCab);

  const [formData, setFormData] = useState({
    tripType: '',
    phoneNumber: '',
    preferredDate: null as Date | null,
    packageType: 'none',
    vehiclePreference: selectedCab,
    selectedRoute: ''
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getRoutePrice = (routeName: string) => {
    const route = routes.find(r => r.name === routeName);
    if (!route) return 0;
    return route.prices[normalizedCab as keyof typeof route.prices] || 0;
  };

  const isPackageSelected = formData.packageType !== 'none';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.phoneNumber || !formData.preferredDate) {
      alert('Please fill in all required fields');
      return;
    }

    if (!isPackageSelected && (!formData.tripType || !formData.selectedRoute)) {
      alert('Please select trip type and route');
      return;
    }

    const finalPrice = isPackageSelected ? 0 : getRoutePrice(formData.selectedRoute);

    alert(`Booking confirmed for ${selectedCab}${isPackageSelected ? ` with package: ${formData.packageType}` : ` on route: ${formData.selectedRoute} for ${finalPrice} SAR`}. We will contact you shortly.`);
    navigate('/');
  };

  return (
    <main className="min-h-screen bg-neutral-50">
      <Navigation />
      
      {/* Header */}
      <section className="pt-32 pb-12 px-6 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Book Your <span className="text-gold">Cab</span>
          </h1>
          <p className="text-xl text-neutral-200 mb-6">
            Complete your booking details for {selectedCab}
          </p>
          {/* ✅ Show category ONLY — remove "From X SAR/hr" */}
          {cabCategory && (
            <div className="inline-flex items-center px-4 py-2 bg-gold/20 rounded-full">
              <span className="text-gold font-semibold">{cabCategory} Category</span>
            </div>
          )}
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-elegant border-0">
            <CardHeader>
              <CardTitle className="text-2xl text-neutral-900 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-gold" />
                Booking Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Trip Type */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold text-neutral-700">
                    Trip Type <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup 
                    value={formData.tripType} 
                    onValueChange={(value) => handleInputChange('tripType', value)}
                    className="flex gap-6"
                    disabled={isPackageSelected}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="one-way" id="one-way" />
                      <Label htmlFor="one-way" className="font-medium">One Way</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="two-way" id="two-way" />
                      <Label htmlFor="two-way" className="font-medium">Round Trip</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Route Selection */}
                <div className="space-y-2">
                  <Label className="text-base font-semibold text-neutral-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gold" />
                    Select Route <span className="text-red-500">*</span>
                  </Label>
                  <Select 
                    value={formData.selectedRoute} 
                    onValueChange={(value) => handleInputChange('selectedRoute', value)}
                    disabled={isPackageSelected}
                  >
                    <SelectTrigger className="h-12 border-neutral-200 focus:border-gold focus:ring-gold">
                      <SelectValue placeholder="Choose your route" />
                    </SelectTrigger>
                    <SelectContent>
                      {routes.map((route, idx) => (
                        <SelectItem key={idx} value={route.name}>
                          {route.name}
                          {/* ✅ Price NOT shown beside name — only after selection below */}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formData.selectedRoute && !isPackageSelected && (
                    <div className="flex items-center gap-2 mt-2 p-3 bg-green-50 rounded-lg">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-green-800 font-medium">
                        Price for {selectedCab}: <span className="text-gold">{getRoutePrice(formData.selectedRoute)} SAR</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-base font-semibold text-neutral-700 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gold" />
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+966 5X XXX XXXX"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    className="h-12 border-neutral-200 focus:border-gold focus:ring-gold"
                  />
                </div>

                {/* Preferred Date */}
                <div className="space-y-2">
                  <Label className="text-base font-semibold text-neutral-700 flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-gold" />
                    Preferred Date <span className="text-red-500">*</span>
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "h-12 w-full justify-start text-left font-normal border-neutral-200 focus:border-gold focus:ring-gold",
                          !formData.preferredDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-gold" />
                        {formData.preferredDate ? format(formData.preferredDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.preferredDate}
                        onSelect={(date) => handleInputChange('preferredDate', date)}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Package Type */}
                <div className="space-y-2">
                  <Label className="text-base font-semibold text-neutral-700">Package Type</Label>
                  <Select 
                    value={formData.packageType} 
                    onValueChange={(value) => handleInputChange('packageType', value)}
                  >
                    <SelectTrigger className="h-12 border-neutral-200 focus:border-gold focus:ring-gold">
                      <SelectValue placeholder="Choose package" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Package</SelectItem>
                      <SelectItem value="essential">Essential Pilgrimage</SelectItem>
                      <SelectItem value="complete">Complete Hajj Journey</SelectItem>
                      <SelectItem value="premium">Premium Experience</SelectItem>
                    </SelectContent>
                  </Select>
                  {isPackageSelected && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Route and trip type are disabled when package is selected.
                    </p>
                  )}
                </div>

                {/* Vehicle Preference (Readonly) */}
                <div className="space-y-2">
                  <Label className="text-base font-semibold text-neutral-700">Vehicle</Label>
                  <Input
                    value={formData.vehiclePreference}
                    onChange={(e) => handleInputChange('vehiclePreference', e.target.value)}
                    placeholder="Vehicle preference"
                    className="h-12 border-neutral-200 focus:border-gold focus:ring-gold"
                    disabled
                  />
                  <p className="text-sm text-muted-foreground">
                    Selected: {selectedCab} → Matched as: {normalizedCab}
                  </p>
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t">
                  <Button 
                    type="submit"
                    size="lg"
                    className="w-full bg-gold hover:bg-gold-dark text-white text-lg font-semibold h-14"
                  >
                    Submit Booking Request
                  </Button>
                  <p className="text-sm text-muted-foreground text-center mt-3">
                    You will receive a confirmation call within 30 minutes
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <WhatsAppButton />
    </main>
  );
};

export default CabBookingPage;