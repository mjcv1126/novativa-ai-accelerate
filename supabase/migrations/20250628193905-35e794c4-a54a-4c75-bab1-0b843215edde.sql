
-- Crear tabla para trackear bookings de TidyCal ya procesados
CREATE TABLE public.tidycal_processed_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tidycal_booking_id INTEGER NOT NULL UNIQUE,
  contact_id UUID REFERENCES public.contacts(id),
  processed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  booking_starts_at TIMESTAMP WITH TIME ZONE NOT NULL,
  booking_ends_at TIMESTAMP WITH TIME ZONE NOT NULL,
  contact_email TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  sync_status TEXT DEFAULT 'success', -- 'success', 'error', 'pending'
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Crear tabla para logs de sincronización
CREATE TABLE public.tidycal_sync_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sync_started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  sync_completed_at TIMESTAMP WITH TIME ZONE,
  bookings_found INTEGER DEFAULT 0,
  bookings_processed INTEGER DEFAULT 0,
  bookings_skipped INTEGER DEFAULT 0,
  bookings_failed INTEGER DEFAULT 0,
  status TEXT DEFAULT 'running', -- 'running', 'completed', 'failed'
  error_message TEXT,
  last_booking_date TIMESTAMP WITH TIME ZONE
);

-- Índices para optimizar las consultas
CREATE INDEX idx_tidycal_processed_bookings_tidycal_id ON public.tidycal_processed_bookings(tidycal_booking_id);
CREATE INDEX idx_tidycal_processed_bookings_processed_at ON public.tidycal_processed_bookings(processed_at);
CREATE INDEX idx_tidycal_sync_logs_started_at ON public.tidycal_sync_logs(sync_started_at);

-- Habilitar extensiones necesarias para cron jobs
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;
