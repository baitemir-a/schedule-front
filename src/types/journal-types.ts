export interface IJournal {
  uuid: string;
  date: string;
  user_id: string;
  arrival_time: string | null;
  departure_time: string | null;
  total_time: string | null;
  status: "ONTIME" | "LATE" | string;
  note: string | null;
  createdAt: string;
  updatedAt: string;
}