import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import Detect from "./pages/Detect";
import Chat from "./pages/Chat";
import Market from "./pages/Market";
import Weather from "./pages/Weather";
import Analytics from "./pages/Analytics";
import Community from "./pages/Community";
import Register from "./pages/Register";
import ProfileSetup from "./pages/ProfileSetup";
import Trends from "./pages/Trends";
import Practices from "./pages/Practices";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />

          {/* Authenticated app layout */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/detect" element={<Detect />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/trends" element={<Trends />} />
            <Route path="/market" element={<Market />} />
            <Route path="/practices" element={<Practices />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/community" element={<Community />} />
            <Route path="/profile" element={<ProfileSetup />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
