import { auth } from './auth';

export type Session = typeof auth.$Infer.Session;
export type ActiveOrganization = typeof auth.$Infer.ActiveOrganization;
export type Organization = typeof auth.$Infer.Organization;
