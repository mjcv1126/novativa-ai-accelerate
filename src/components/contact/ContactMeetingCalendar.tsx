
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const ContactMeetingCalendar = () => {
  const { language } = useLanguage();
  
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">
        {language === 'es' ? 'Agenda una Reunión' : 'Schedule a Meeting'}
      </h2>
      <div className="tidycal-embed" data-path="novativa/demo-gratis"></div>
    </div>
  );
};

export default ContactMeetingCalendar;
