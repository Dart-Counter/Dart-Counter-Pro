import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import MobileNav from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import GamePage from "@/pages/GamePage";
import PlayersPage from "@/pages/PlayersPage";
import StatsPage from "@/pages/StatsPage";
import HelpPage from "@/pages/HelpPage";
import { SettingsModal } from "@/components/modals/SettingsModal";
import { TermsModal } from "@/components/modals/TermsModal";
import { PrivacyModal } from "@/components/modals/PrivacyModal";
import { DataPrivacyModal } from "@/components/modals/DataPrivacyModal";

function Router() {
  return (
    <Switch>
      <Route path="/" component={GamePage} />
      <Route path="/players" component={PlayersPage} />
      <Route path="/stats" component={StatsPage} />
      <Route path="/help" component={HelpPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  useEffect(() => {
    // Add font classes to the body
    document.body.classList.add("bg-background");
    document.body.classList.add("text-foreground");
    document.body.classList.add("font-inter");
  }, []);

  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen);
  };

  const openModal = (modalId: string) => {
    setActiveModal(modalId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <Header 
          onToggleMobileNav={toggleMobileNav}
          onOpenSettings={() => openModal('settings')}
        />
        
        <MobileNav 
          isOpen={mobileNavOpen} 
          onClose={() => setMobileNavOpen(false)} 
          onOpenTos={() => openModal('tos')}
          onOpenPrivacy={() => openModal('privacy')}
          onOpenDataPrivacy={() => openModal('dataPrivacy')}
        />
        
        <main className="flex-grow p-4 md:p-6 overflow-x-hidden">
          <Router />
        </main>
        
        <Footer />

        {/* Modals */}
        <SettingsModal 
          isOpen={activeModal === 'settings'} 
          onClose={closeModal} 
        />
        
        <TermsModal 
          isOpen={activeModal === 'tos'} 
          onClose={closeModal} 
        />
        
        <PrivacyModal 
          isOpen={activeModal === 'privacy'} 
          onClose={closeModal} 
        />
        
        <DataPrivacyModal 
          isOpen={activeModal === 'dataPrivacy'} 
          onClose={closeModal} 
        />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
