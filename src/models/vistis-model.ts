export interface IVistsResponse {
  id: string;
  date: string;
  time_in: string;
  time_out: string;
  verified_in: string;
  verified_out: string;
  reason: Reason;
  pay_rate: string;
  type: string;
  employee: Employee;
  client: Client;
  schedule: Schedule;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Reason {
  id: number;
  uuid: string;
  code: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: any;
}

export interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  profile_picture: string;
}

export interface Client {
  id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  profile_picture: any;
}

export interface Schedule {
  id: string;
  schedule_id: string;
}

export interface IVisitPayload {
  date: string;
  schedule_id: string;
  visit_type: string;
  verified_in: string;
  verified_out: string;
  reason: string;
  reasoninput: string;
}
