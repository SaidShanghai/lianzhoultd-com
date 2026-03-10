import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AboutPage from "./pages/AboutPage";
import PurposePage from "./pages/PurposePage";
import LeadershipPage from "./pages/LeadershipPage";
import CareersPage from "./pages/CareersPage";
import LogisticsPage from "./pages/LogisticsPage";
import SourcingPage from "./pages/SourcingPage";
import ESGPage from "./pages/ESGPage";
import NewsroomPage from "./pages/NewsroomPage";
import InvestorRelationsPage from "./pages/InvestorRelationsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/purpose" element={<PurposePage />} />
          <Route path="/leadership" element={<LeadershipPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/logistics" element={<LogisticsPage />} />
          <Route path="/sourcing" element={<SourcingPage />} />
          <Route path="/esg" element={<ESGPage />} />
          <Route path="/newsroom" element={<NewsroomPage />} />
          <Route path="/investor-relations" element={<InvestorRelationsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
