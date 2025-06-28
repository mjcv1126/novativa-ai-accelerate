
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

// Formato estándar para fechas en el sistema
export const DATE_FORMATS = {
  display: 'dd/MM/yyyy',
  displayWithTime: 'dd/MM/yyyy HH:mm',
  displayLong: 'dd MMMM yyyy',
  input: 'yyyy-MM-dd',
  time: 'HH:mm'
} as const;

export const formatDate = (date: string | Date, formatType: keyof typeof DATE_FORMATS = 'display'): string => {
  if (!date) return '';
  
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return format(parsedDate, DATE_FORMATS[formatType], { locale: es });
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

export const formatActivityDate = (activity: any): string => {
  // Priorizar fecha de vencimiento o fecha programada sobre fecha de creación
  if (activity.due_date) {
    return formatDate(activity.due_date, 'display');
  }
  
  if (activity.scheduled_date) {
    return formatDate(activity.scheduled_date, 'display');
  }
  
  // Como último recurso, usar fecha de creación
  return formatDate(activity.created_at, 'display');
};

export const formatActivityDateTime = (activity: any): string => {
  if (activity.scheduled_date && activity.scheduled_time) {
    const dateTime = `${activity.scheduled_date}T${activity.scheduled_time}`;
    return formatDate(dateTime, 'displayWithTime');
  }
  
  if (activity.due_date) {
    return formatDate(activity.due_date, 'displayWithTime');
  }
  
  return formatDate(activity.created_at, 'displayWithTime');
};

export const isActivityOverdue = (activity: any): boolean => {
  const now = new Date();
  
  if (activity.due_date) {
    return new Date(activity.due_date) < now && !activity.is_completed;
  }
  
  if (activity.scheduled_date) {
    const scheduledDateTime = new Date(`${activity.scheduled_date}T${activity.scheduled_time || '23:59'}`);
    return scheduledDateTime < now && !activity.is_completed;
  }
  
  return false;
};

export const isActivityDueSoon = (activity: any): boolean => {
  const now = new Date();
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  
  if (activity.due_date) {
    const dueDate = new Date(activity.due_date);
    return dueDate >= now && dueDate <= tomorrow && !activity.is_completed;
  }
  
  if (activity.scheduled_date) {
    const scheduledDateTime = new Date(`${activity.scheduled_date}T${activity.scheduled_time || '23:59'}`);
    return scheduledDateTime >= now && scheduledDateTime <= tomorrow && !activity.is_completed;
  }
  
  return false;
};
