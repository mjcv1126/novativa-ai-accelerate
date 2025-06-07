
export interface UploadedFile {
  id: string;
  name: string;
  description: string;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  created_at: string;
}

export interface FileFormData {
  name: string;
  description: string;
  file: File | null;
}
