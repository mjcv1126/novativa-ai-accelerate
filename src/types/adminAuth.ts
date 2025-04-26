
export interface AdminAuthState {
  user: any;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface AdminAuthContextType extends AdminAuthState {
  login: (email: string, password: string) => Promise<{ error: any }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  verifyResetCode: (email: string, code: string) => Promise<{ error: any }>;
  updatePassword: (email: string, code: string, newPassword: string) => Promise<{ error: any }>;
  checkSession: () => Promise<void>;
}
