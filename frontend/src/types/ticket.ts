export type Status = "todo" | "progress" | "hold" | "done";

export interface Ticket {
  id: string;
  type_of_issue: string;
  status: Status;
  date: string;
  priority: "urgent" | "normal";
  type: "internal" | "external";
}