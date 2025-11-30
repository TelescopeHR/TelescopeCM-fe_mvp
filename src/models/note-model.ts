export interface INoteResponse {
  id: string;
  type: string;
  title: string;
  user: User;
  description: string;
  created_at: string;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
}
