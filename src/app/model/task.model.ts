export interface Task {
  id?: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  due_Date?: Date;
  created_At: Date;
  updated_At: Date;
}
