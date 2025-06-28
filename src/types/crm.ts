
export interface CrmStage {
  id: string;
  name: string;
  description?: string;
  color: string;
  position: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email?: string;
  company?: string;
  country_code: string;
  country_name: string;
  stage_id?: string;
  notes?: string;
  service_of_interest?: string;
  last_contact_date?: string;
  created_at: string;
  updated_at?: string;
}

export interface ContactActivity {
  id: string;
  contact_id: string;
  activity_type: 'call' | 'email' | 'meeting' | 'note' | 'reminder' | 'status_change';
  title: string;
  description?: string;
  due_date?: string;
  completed_at?: string;
  is_completed: boolean;
  status: 'pending' | 'completed' | 'cancelled';
  scheduled_date?: string;
  scheduled_time?: string;
  created_at: string;
  updated_at: string;
}

export interface LeadAssignment {
  id: string;
  contact_id: string;
  assigned_user_email: string;
  assigned_by_email: string;
  assigned_at: string;
  notes?: string;
}

export interface ContactWithStage extends Contact {
  stage?: CrmStage;
  activities?: ContactActivity[];
  assignment?: LeadAssignment;
}

export type ViewMode = 'list' | 'kanban';

export interface CrmFilters {
  search: string;
  stage_id?: string;
  country?: string;
  service_of_interest?: string;
  date_range?: {
    from?: string;
    to?: string;
  };
}

export interface ActivityFilters {
  timeframe: 'today' | 'tomorrow' | 'this_week' | 'next_week' | 'future';
  activity_type?: string;
  status?: 'pending' | 'completed' | 'cancelled';
}
