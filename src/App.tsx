// src/App.tsx
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

// Lazy load other pages to improve initial load time
import { lazy, Suspense } from "react";

const About = lazy(() => import("./pages/About"));
const DestinationsPage = lazy(() => import("./pages/DestinationsPage"));
const PackagesPage = lazy(() => import("./pages/PackagesPage"));
const BookingPage = lazy(() => import("./pages/BookingPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const CabPage = lazy(() => import("./pages/CabsPage")); // ✅ Existing
const CabBookingPage = lazy(() => import("./pages/CabBookingPage"));
const SelectCabPage = lazy(() => import("./pages/SelectCabPage"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/about"
            element={
              <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
                <About />
              </Suspense>
            }
          />
          <Route
            path="/destinations"
            element={
              <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
                <DestinationsPage />
              </Suspense>
            }
          />
          <Route
            path="/packages"
            element={
              <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
                <PackagesPage />
              </Suspense>
            }
          />
          <Route
            path="/booking"
            element={
              <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
                <BookingPage />
              </Suspense>
            }
          />
          <Route
            path="/contact"
            element={
              <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
                <ContactPage />
              </Suspense>
            }
          />
          {/* ✅ Route for Cabs Listing Page */}
          <Route
            path="/cabs"
            element={
              <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
                <CabPage />
              </Suspense>
            }
          />
          {/* ✅ NEW: Route for Selecting Cab after choosing route */}
          <Route
            path="/select-cab"
            element={
              <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading cab options...</div>}>
                <SelectCabPage />
              </Suspense>
            }
          />
          {/* ✅ Route for Final Booking Form */}
          <Route
            path="/cab-booking"
            element={
              <Suspense fallback={<div>Loading booking form...</div>}>
                <CabBookingPage />
              </Suspense>
            }
          />

          {/* ❗ Catch-all route — KEEP THIS LAST */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;