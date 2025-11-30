export type CreateAccountT = {
  agency_name: string;
  admin_firstname: string;
  admin_lastname: string;
  email: string;
  phone: string;
  password: string;
  cpassword: string;
  photo: string;
  state: string;
  city: string;
  zip: string;
  street: string;
  address_Line2: string;
  services: string[];
  numberof_clients: string;
};

export interface MultiSelectOption {
  value: string;
  label: string;
}
