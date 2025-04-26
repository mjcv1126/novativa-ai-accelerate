
import React from 'react';

const ContactMeetingCalendar = () => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Agenda una Reunión</h2>
      <div className="tidycal-embed" data-path="novativa/demo-gratis"></div>
    </div>
  );
};

export default ContactMeetingCalendar;
