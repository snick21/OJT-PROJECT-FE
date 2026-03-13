export type Status = "todo" | "progress" | "hold" | "done";

export interface Ticket {
  id: string;
  category: string;
  status: Status;
  date: string;
  priority: "urgent" | "normal";
  type: "internal" | "external";
}