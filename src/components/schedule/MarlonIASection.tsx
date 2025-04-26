
import React from 'react';

const MarlonIASection = () => {
  return (
    <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-xl shadow-lg p-8 mb-12 border border-blue-100">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
        <div className="h-6 w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
        ¿Para qué esperar? Conversa un poco con Marlon IA ahorita:
      </h2>
      <div id="marlon-ia-script" className="w-full min-h-[400px] rounded-lg">
        {/* Script will be inserted here from admin panel */}
      </div>
    </div>
  );
};

export default MarlonIASection;
