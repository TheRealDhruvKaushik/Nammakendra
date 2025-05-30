import React from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import NotificationBar from "@/components/layout/notification-bar";
import Home from "@/pages/home";
import NammaSahayak from "@/pages/namma-sahayak";
import NammaSarkara from "@/pages/namma-sarkara";
import NammaVidhana from "@/pages/namma-vidhana";
import Contact from "@/pages/contact";
import About from "@/pages/about";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsOfService from "@/pages/terms-of-service";
import Accessibility from "@/pages/accessibility";
import { LanguageProvider } from "@/context/language-context";

function Router() {
  return (
    <div className="app-container">
      <Header />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/namma-sahayak" component={NammaSahayak} />
        <Route path="/namma-sarkara" component={NammaSarkara} />
        <Route path="/namma-vidhana" component={NammaVidhana} />
        <Route path="/contact" component={Contact} />
        <Route path="/about" component={About} />
        <Route path="/privacy" component={PrivacyPolicy} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms" component={TermsOfService} />
        <Route path="/terms-of-service" component={TermsOfService} />
        <Route path="/accessibility" component={Accessibility} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
      <NotificationBar />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <Router />
        <Toaster />
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;