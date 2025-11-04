export type RequestType = 'banner' | 'post' | 'video' | 'otro';
export type PriorityLevel = 'alta' | 'media' | 'baja';
export type TicketStatus = 'nuevo' | 'en_revision' | 'en_progreso' | 'esperando_informacion' | 'completado' | 'cancelado';

export interface Ticket {
  id: string;
  ticket_number: string;
  user_id: string | null;
  company_name: string;
  applicant_name: string;
  applicant_role: string;
  applicant_email: string;
  applicant_phone: string;
  request_type: RequestType;
  request_type_other: string | null;
  content_objective: string;
  dimensions: string | null;
  delivery_format: string | null;
  final_use: string | null;
  delivery_date: string | null;
  concept_description: string;
  reference_url: string | null;
  reference_feedback: string;
  reference_images: any;
  attached_files: any;
  priority_level: PriorityLevel;
  status: TicketStatus;
  confirmed_final_info: boolean;
  understands_changes: boolean;
  assigned_to: string | null;
  notes: string | null;
  internal_notes: string | null;
  estimated_completion_date: string | null;
  actual_completion_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface TicketHistory {
  id: string;
  ticket_id: string;
  user_id: string | null;
  action: string;
  field_changed: string | null;
  old_value: string | null;
  new_value: string | null;
  comment: string | null;
  created_at: string;
}
