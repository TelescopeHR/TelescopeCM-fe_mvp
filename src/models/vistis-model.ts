export interface IVistsResponse {
  id: any;
  date: string;
  time_in: string;
  time_out: string;
  verified_in: any;
  verified_out: any;
  reason: any;
  pay_rate: string;
  type: string;
  employee: Employee;
  client: Client;
  status: string;
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

export interface IVisitPayload {
  date: string;
  schedule_id: string;
  visit_type: string;
  verified_in: string;
  verified_out: string;
  reason: string;
  reasoninput: string;
}
