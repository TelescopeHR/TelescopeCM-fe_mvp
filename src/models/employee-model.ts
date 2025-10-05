export interface IEmployeesStatResp {
  total: number;
  active_full: number;
  active_part: number;
  inactive: number;
  terminated: number;
  terminated_not_eligible: number;
}

export type IEmployeeTableRespArr = IEmployeeTableResp[];

export interface IEmployeeTableResp {
  id: number;
  photo?: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  employee_id: string;
  phone: string;
  gender: string;
  birth_date: string;
  employee_status: string;
  created_at: string;
  social_security?: string;
  company?: string;
  address?: Address;
  email: string;
  phone_numbers?: PhoneNumber[];
  background?: Background;
}

export interface Address {
  address: string;
  city: string;
  state: string;
  zip: string;
}

export interface PhoneNumber {
  type: string;
  phone_number: string;
}

export interface Background {
  hire_date: string;
  application_date: string;
  orientation_date: string;
  signed_job_description_date: string;
  signed_policy_procedure_date: string;
  evaluated_assigned_date: string;
  last_evaluation_date: string;
  termination_date: string;
  number_of_references: number;
}
