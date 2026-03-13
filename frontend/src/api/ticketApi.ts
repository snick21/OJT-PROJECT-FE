import type { Ticket, Status } from '../types/ticket';
import { getToken } from './authApi';

export async function fetchTickets(): Promise<Ticket[]> {
  const res = await fetch('/api/tickets/', {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  const data = await res.json();
  return data.map((t: any) => ({
    id: t.ticket_id,
    type_of_issue: t.type_of_issue,
    status: t.status as Status,
    date: t.date,
    priority: t.priority,
    type: t.type,
  }));
}

export async function updateTicketStatus(id: string, status: Status): Promise<void> {
  await fetch(`/api/tickets/${id}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ status }),
  });
}

export async function submitTicket(data: {
  type_of_issue: string;
  priority: string;
  type: string;
  description: string;
}): Promise<boolean> {
  const res = await fetch('/api/tickets/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ ...data, status: 'todo' }),
  });
  return res.ok;
}