export type UserRole = 'FARMER' | 'GOVT_AGENT' | 'COOP_AGENT' | 'ADMIN';

export interface UserDto {
  id: string;
  name: string;
  email: string;
  phone?: string;
  cni?: string;
  role: UserRole;
}
