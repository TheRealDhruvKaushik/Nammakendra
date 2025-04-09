import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Home from "@/pages/home";
import NammaSahayak from "@/pages/namma-sahayak";
import NammaVidhana from "@/pages/namma-vidhana";
import Contact from "@/pages/contact";
import About from "@/pages/about";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsOfService from "@/pages/terms-of-service";
import Accessibility from "@/pages/accessibility";
import Breadcrumb from "@/components/layout/breadcrumb";
import { useAccessibility } from "@/context/accessibility-context";

function Router() {
  const { fontSize } = useAccessibility();
  
  return (
    <div style={{ fontSize: `${fontSize}px` }}>
      <Header />
      <Breadcrumb />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/namma-sahayak" component={NammaSahayak} />
        <Route path="/namma-vidhana" component={NammaVidhana} />
        <Route path="/contact" component={Contact} />
        <Route path="/about" component={About} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms-of-service" component={TermsOfService} />
        <Route path="/accessibility" component={Accessibility} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
