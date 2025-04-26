
import React from 'react';
import ConfirmationHeader from '@/components/schedule/ConfirmationHeader';
import MarlonIASection from '@/components/schedule/MarlonIASection';
import PhoneForm from '@/components/schedule/PhoneForm';
import { MessageCircle, Check } from 'lucide-react';

const ScheduleConfirmation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-sky-50">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <ConfirmationHeader />
        <MarlonIASection />
        <div className="max-w-md mx-auto bg-white bg-opacity-80 backdrop-blur-lg rounded-xl shadow-lg p-8 border border-purple-100">
          <PhoneForm />
        </div>
      </div>
    </div>
  );
};

export default ScheduleConfirmation;
