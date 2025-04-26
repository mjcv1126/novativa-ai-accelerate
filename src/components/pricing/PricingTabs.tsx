
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AgentsIATabContent } from './AgentsIATabContent';
import { WebAgentTabContent } from './WebAgentTabContent';
import { OtherServicesTabContent } from './OtherServicesTabContent';

const PricingTabs = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  
  return (
    <section className="py-16 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-12">
          <Tabs defaultValue="agentes-ia" className="w-full max-w-4xl">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="agentes-ia">Agentes IA + NovaChannel</TabsTrigger>
                <TabsTrigger value="agente-web">Agente IA Web</TabsTrigger>
                <TabsTrigger value="otros">Otros Servicios</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="agentes-ia">
              <AgentsIATabContent 
                billingCycle={billingCycle} 
                setBillingCycle={setBillingCycle} 
              />
            </TabsContent>
            
            <TabsContent value="agente-web">
              <WebAgentTabContent />
            </TabsContent>
            
            <TabsContent value="otros">
              <OtherServicesTabContent />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default PricingTabs;
