import React from 'react';
import ConfirmationHeader from '@/components/schedule/ConfirmationHeader';
import MarlonIASection from '@/components/schedule/MarlonIASection';
const ScheduleConfirmation = () => {
  return <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-sky-50">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <ConfirmationHeader />
        <MarlonIASection />
        
      </div>
    </div>;
};
export default ScheduleConfirmation;