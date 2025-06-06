
import React from 'react';
import ConfirmationHeader from '@/components/schedule/ConfirmationHeader';
import MarlonIASection from '@/components/schedule/MarlonIASection';
import { useLanguage } from '@/contexts/LanguageContext';
import Footer from '@/components/layout/Footer';

const ScheduleConfirmation = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-sky-50">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <ConfirmationHeader />
        <MarlonIASection />
      </div>
      <Footer />
    </div>
  );
};

export default ScheduleConfirmation;
