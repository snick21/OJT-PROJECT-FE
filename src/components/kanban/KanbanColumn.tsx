import { Paper, Title, Stack, Badge, Group, Card } from "@mantine/core";
import { useDroppable } from "@dnd-kit/core";

import TicketCard from "../cards/TicketCard";
import type { Ticket } from "../../types/ticket";

interface Props {
  id: string;
  title: string;
  tickets: Ticket[];
}

const headerColors = {
  todo: "#F3D6D6",
  progress: "#DCD3F3",
  hold: "#F1D9B8",
  done: "#CFEAD5"
};

export default function KanbanColumn({ id, title, tickets }: Props) {

  const { setNodeRef } = useDroppable({ id });

  return (
    <Paper
      ref={setNodeRef}
      p="md"
      radius="lg"
      style={{
        background: "#F5F6F7",
        border: "1px solid #E0E0E0",
        minHeight: 500,
        height: "100%"
      }}
    >

      {/* HEADER CARD */}
      <Card
        radius="md"
        shadow="xs"
        mb="md"
        withBorder
        style={{
          background: headerColors[id as keyof typeof headerColors]
        }}
      >

        <Group justify="space-between">

          <Title order={5}>{title}</Title>

          <Badge
            radius="sm"
            style={{
              background: "#E9ECEF",
              color: "#000000",
              fontWeight: 500
            }}
          >
            {tickets.length} {tickets.length > 1 ? "tickets" : "ticket"}
          </Badge>

        </Group>

      </Card>

      {/* TICKETS */}
      <Stack>
        {tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </Stack>

    </Paper>
  );
}