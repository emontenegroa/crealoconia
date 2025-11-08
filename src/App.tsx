
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ResultadosPrueba from "./pages/ResultadosPrueba";
import Landing1 from "./pages/Landing1";
import Landing2 from "./pages/Landing2";
import Landing3 from "./pages/Landing3";
import NotFound from "./pages/NotFound";
import AdminRoute from "./pages/AdminRoute";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/resultados" element={<ResultadosPrueba />} />
          <Route path="/landing1" element={<Landing1 />} />
          <Route path="/landing2" element={<Landing2 />} />
          <Route path="/landing3" element={<Landing3 />} />
          <Route path="/admin" element={<AdminRoute />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
