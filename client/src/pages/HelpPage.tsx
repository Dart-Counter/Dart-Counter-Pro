import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Shield, Database } from "lucide-react";
import GameRules from "@/components/help/GameRules";
import PlayerTips from "@/components/help/PlayerTips";
import AppGuide from "@/components/help/AppGuide";
import { useState } from "react";
import { TermsModal } from "@/components/modals/TermsModal";
import { PrivacyModal } from "@/components/modals/PrivacyModal";
import { DataPrivacyModal } from "@/components/modals/DataPrivacyModal";
import { FadeIn } from "@/lib/animations";

const HelpPage = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const openModal = (modalId: string) => {
    setActiveModal(modalId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <FadeIn>
      <Card className="bg-panel border-2 border-primary mb-6">
        <CardContent className="p-4">
          <h2 className="font-['Orbitron'] text-primary text-xl mb-4">Help & Information</h2>
          
          <GameRules />
          <PlayerTips />
          <AppGuide />
        </CardContent>
      </Card>
      
      <Card className="bg-panel border-2 border-primary">
        <CardContent className="p-4">
          <h2 className="font-['Orbitron'] text-primary text-xl mb-4">Legal Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="bg-panel hover:bg-primary hover:text-primary-foreground transition p-4 rounded-lg border border-primary text-left h-auto flex flex-col items-start"
              onClick={() => openModal('tos')}
            >
              <h3 className="font-['Orbitron'] mb-1 flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                Terms of Service
              </h3>
              <p className="text-muted-foreground text-sm">Rules and guidelines for using DartCounter Pro</p>
            </Button>
            
            <Button
              variant="outline"
              className="bg-panel hover:bg-primary hover:text-primary-foreground transition p-4 rounded-lg border border-primary text-left h-auto flex flex-col items-start"
              onClick={() => openModal('privacy')}
            >
              <h3 className="font-['Orbitron'] mb-1 flex items-center">
                <Shield className="mr-2 h-4 w-4" />
                Privacy Policy
              </h3>
              <p className="text-muted-foreground text-sm">How we handle and protect your data</p>
            </Button>
            
            <Button
              variant="outline"
              className="bg-panel hover:bg-primary hover:text-primary-foreground transition p-4 rounded-lg border border-primary text-left h-auto flex flex-col items-start"
              onClick={() => openModal('dataPrivacy')}
            >
              <h3 className="font-['Orbitron'] mb-1 flex items-center">
                <Database className="mr-2 h-4 w-4" />
                Data Privacy
              </h3>
              <p className="text-muted-foreground text-sm">Additional information about data usage</p>
            </Button>
          </div>
          
          <div className="mt-6 text-center text-muted-foreground">
            <p>Support: web.dart.counter@gmail.com</p>
            <p className="mt-2">Version 1.0.0 &copy; 2023 DartCounter Pro</p>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <TermsModal isOpen={activeModal === 'tos'} onClose={closeModal} />
      <PrivacyModal isOpen={activeModal === 'privacy'} onClose={closeModal} />
      <DataPrivacyModal isOpen={activeModal === 'dataPrivacy'} onClose={closeModal} />
    </FadeIn>
  );
};

export default HelpPage;
