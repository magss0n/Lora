export interface User {
    id: string;
    name: string;
    email: string;
    role: 'COOP_AGENT' | 'GOVT_AGENT';
    phone: string;
    cni: string;
    gender: 'MALE' | 'FEMALE' | 'OTHER';
}
