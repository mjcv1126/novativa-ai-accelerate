
import React from 'react';
import { Check } from 'lucide-react';

const SuccessMessage = () => {
  return (
    <div className="text-center py-8">
      <div className="inline-block mb-4 rounded-full p-3 bg-green-100">
        <Check className="h-8 w-8 text-green-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2">¡Tu regalo va en camino! 🎁</h3>
      <p className="text-gray-600">
        Hemos recibido tu información correctamente. Pronto recibirás el descuento especial por WhatsApp.
      </p>
    </div>
  );
};

export default SuccessMessage;
