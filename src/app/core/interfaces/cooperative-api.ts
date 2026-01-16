export interface CooperativeDto {
  registrationNumber: string;
  name: string;
  location: string;
  members?: string[];
}

export interface CreateCooperativeDto {
  registrationNumber: string;
  name: string;
  location: string;
}
