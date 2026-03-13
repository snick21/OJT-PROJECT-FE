import { useState } from "react";
import { Grid } from "@mantine/core";

import { DndContext } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";

import KanbanColumn from "./KanbanColumn";
import type { Ticket, Status } from "../../types/ticket";

interface Props {
  tickets: Ticket[];
}

export default function KanbanBoard({ tickets: initial }: Props) {

  const [tickets, setTickets] = useState(initial);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const newStatus = over.id as Status;

    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === active.id
          ? { ...ticket, status: newStatus }
          : ticket
      )
    );
  }

  const columns = {
    todo: tickets.filter((t) => t.status === "todo"),
    progress: tickets.filter((t) => t.status === "progress"),
    hold: tickets.filter((t) => t.status === "hold"),
    done: tickets.filter((t) => t.status === "done")
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>

      <Grid align="stretch">

        <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
          <KanbanColumn id="todo" title="To do" tickets={columns.todo} />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
          <KanbanColumn id="progress" title="In progress" tickets={columns.progress} />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
          <KanbanColumn id="hold" title="On hold" tickets={columns.hold} />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
          <KanbanColumn id="done" title="Done" tickets={columns.done} />
        </Grid.Col>

      </Grid>

    </DndContext>
  );
}