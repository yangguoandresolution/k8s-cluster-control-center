
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Clusters from "./pages/Clusters";
import Resources from "./pages/Resources";
import Deployments from "./pages/Deployments";
import Services from "./pages/Services";
import Storage from "./pages/Storage";
import Nodes from "./pages/Nodes";
import Terminal from "./pages/Terminal";
import Security from "./pages/Security";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import React from "react";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/clusters" element={<Clusters />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/deployments" element={<Deployments />} />
            <Route path="/services" element={<Services />} />
            <Route path="/storage" element={<Storage />} />
            <Route path="/nodes" element={<Nodes />} />
            <Route path="/terminal" element={<Terminal />} />
            <Route path="/security" element={<Security />} />
            <Route path="/settings" element={<Settings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
