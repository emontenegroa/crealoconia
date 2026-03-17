import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MetaTracker } from "@/components/MetaTracker";
import Index from "./pages/Index";
import ResultadosPrueba from "./pages/ResultadosPrueba";
import Landing1 from "./pages/Landing1";
import Landing2 from "./pages/Landing2";
import Landing3 from "./pages/Landing3";
import NotFound from "./pages/NotFound";
import AdminRoute from "./pages/AdminRoute";
import Video from "./pages/Video";
import Privacidad from "./pages/Privacidad";
import Clientes from "./pages/Clientes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <MetaTracker />
        <Routes>
          <Route path="/" element={<Landing1 />} />
          <Route path="/quiz" element={<Landing2 />} />
          <Route path="/gracias" element={<Landing3 />} />
          <Route path="/video" element={<Video />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/privacidad" element={<Privacidad />} />
          <Route path="/index" element={<Index />} />
          <Route path="/resultados" element={<ResultadosPrueba />} />
          <Route path="/admin" element={<AdminRoute />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
