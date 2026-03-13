import { useState } from "react";
import { Grid } from "@mantine/core";

import { DndContext } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";

import KanbanColumn from "./KanbanColumn";
import type { Ticket, Status } from "../../types/ticket";

interface Props {
  tickets: Ticket[];
  visibleStatuses: Status[];
}

const COLUMN_META: { id: Status; title: string }[] = [
  { id: "todo",     title: "To do"       },
  { id: "progress", title: "In progress" },
  { id: "hold",     title: "On hold"     },
  { id: "done",     title: "Done"        }
];

export default function KanbanBoard({ tickets: initial, visibleStatuses }: Props) {

  const [tickets, setTickets] = useState(initial);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    const newStatus = over.id as Status;
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === active.id ? { ...ticket, status: newStatus } : ticket
      )
    );
  }

  const columns = {
    todo:     tickets.filter((t) => t.status === "todo"),
    progress: tickets.filter((t) => t.status === "progress"),
    hold:     tickets.filter((t) => t.status === "hold"),
    done:     tickets.filter((t) => t.status === "done")
  };

  const visibleColumns = COLUMN_META.filter((col) => visibleStatuses.includes(col.id));

  const count = visibleColumns.length;
  const colSpan = count === 1 ? 12 : count === 2 ? 6 : count === 3 ? 4 : 3;

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Grid align="stretch">
        {visibleColumns.map((col) => (
          <Grid.Col key={col.id} span={{ base: 12, sm: 6, lg: colSpan }}>
            <KanbanColumn id={col.id} title={col.title} tickets={columns[col.id]} />
          </Grid.Col>
        ))}
      </Grid>
    </DndContext>
  );
}