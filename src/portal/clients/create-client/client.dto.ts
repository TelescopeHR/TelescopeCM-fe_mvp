export interface ClientDTO {
  first_name: string;
  last_name: string;
  middle_name: string;
  email: string;
  gender: string;
  date_of_birth: string;
  social_security: string;
  email_address: string;
  phone: string;
  address: string;
  country: string;
  state: string;
  zipcode: string;
  profile_picture: string;
  admitted_at: string;
  primary_condition: string;
  classification: string;
  priority_level: string;
  allergies: string;
  is_able_to_respond: boolean;
  underlying_ailment: string;
  addition_information: string;
  documents: Document[];
  emergency_contacts: EmergencyContact[];
  care_goals: string;
  mobility_level: string;
  cognitive_status: string;
  care_additional_information: string;
  medications: Medication[];
  tasks: string[];
}

export interface Document {
  name: string;
  url: string;
}

export interface EmergencyContact {
  first_name: string;
  last_name: string;
  relationship: string;
  email_address: string;
  phone_number: string;
}

export interface Medication {
  name: string;
  type: string;
  dosage: string;
  prescription: string;
  time_frequency: string;
}
