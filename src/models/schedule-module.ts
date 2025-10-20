export type IScheduleResponseList = IScheduleResponse[];

export interface IScheduleResponse {
  id: string;
  type: Type;
  start_date: string;
  end_date: string;
  rate: number;
  hours: number;
  status: string;
  created_at: string;
  updated_at: string;
  weekly_schedule: WeeklySchedule[];
  client: Client;
}

export interface Type {
  id: number;
  name: string;
}

export interface WeeklySchedule {
  id: number;
  day_of_the_week: string;
  time_in: string;
  time_out: string;
}

export interface Client {
  id: string;
  first_name: string;
  last_name: string;
  middle_name: any;
}
