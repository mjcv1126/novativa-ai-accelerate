
import React from 'react';
import { FakeStudent } from '@/hooks/useEnrollmentNotifications';
import { CheckCircle, X } from 'lucide-react';

interface EnrollmentNotificationProps {
  student: FakeStudent | null;
  isVisible: boolean;
  onClose: () => void;
}

const EnrollmentNotification: React.FC<EnrollmentNotificationProps> = ({
  student,
  isVisible,
  onClose
}) => {
  if (!student || !isVisible) return null;

  return (
    <div className={`fixed bottom-4 left-4 z-50 transform transition-all duration-500 ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-[-120%] opacity-0'
    }`}>
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg shadow-lg max-w-sm border border-green-400">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-200" />
            <span className="font-semibold text-sm">¡Nuevo estudiante!</span>
          </div>
          <button 
            onClick={onClose}
            className="text-green-200 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex items-center space-x-3">
          <img 
            src={student.image} 
            alt={student.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-green-300"
          />
          <div>
            <p className="font-medium text-sm">{student.name}</p>
            <p className="text-xs text-green-100">📍 {student.country}</p>
            <p className="text-xs text-green-200 mt-1">
              Se acaba de inscribir al curso
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentNotification;
