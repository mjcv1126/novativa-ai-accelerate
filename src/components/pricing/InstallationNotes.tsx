
import React from 'react';

type InstallationNotesProps = {
  billingCycle: 'monthly' | 'annual';
};

export const InstallationNotes: React.FC<InstallationNotesProps> = ({ billingCycle }) => {
  return (
    <div className="mt-4 p-4 bg-gray-50 text-sm text-gray-600 space-y-2 rounded-b-lg border-t">
      {billingCycle === 'annual' && (
        <p className="text-green-700 font-semibold">
          • ¡Instalación GRATIS por pago anual! (Ahorro de $100 USD)
        </p>
      )}
      <p>• La integración tiene un costo de instalación único de $100 USD.</p>
      <p>• Los precios no incluyen costos de API de OpenAI u otras plataformas en caso de ser requeridas.</p>
    </div>
  );
};
