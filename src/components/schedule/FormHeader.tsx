
import React from 'react';
import { Phone } from 'lucide-react';

const FormHeader = () => {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="h-10 w-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
        <Phone className="h-5 w-5 text-white" />
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-800">
          ¿No recibiste el descuento? 🎁
        </h3>
        <p className="text-sm text-gray-600">
          Ingresa tus datos aquí
        </p>
      </div>
    </div>
  );
};

export default FormHeader;
