import { Card, Text, Badge, Group, Avatar } from "@mantine/core";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

import type { Ticket } from "../../types/ticket";

interface Props {
  ticket: Ticket;
}

export default function TicketCard({ ticket }: Props) {

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: ticket.id
  });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    cursor: isDragging ? "grabbing" : "grab",
    opacity: isDragging ? 0.6 : 1,
    transition: "all 0.2s ease"
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="ticket-card"
    >

      <Card radius="md" withBorder shadow={isDragging ? "md" : "xs"}>

        <Text fw={600} c="black">{ticket.id}</Text>

        <Text size="sm" fw={500} c="#424242" mt="xs">
          Network / Connectivity Issues
        </Text>

        <Group mt="xs">
          <Badge color="blue" variant="light">Internal</Badge>
          <Badge color="red" variant="light">Urgent</Badge>
        </Group>

        <Group mt="sm">
          <Avatar
            size="sm"
            radius="xl"
            style={{
              background: "#E9ECEF",
              color: "#000000"
            }}
          >
          </Avatar>

          <Text size="sm" fw={500} c="#424242">
            Subscriber
          </Text>
        </Group>

        <Text size="xs" mt="sm" fw={500} c="#424242">
          DATE: March 9, 2026 — 2:35 PM
        </Text>

      </Card>

      <style>
        {`
        .ticket-card {
          transition: all 0.2s ease;
        }

        .ticket-card:hover {
          transform: translateY(-2px);
        }

        .ticket-card:hover .mantine-Card-root {
          border-color: #038F8D;
          box-shadow: 0 6px 14px rgba(0,0,0,0.08);
        }
        `}
      </style>

    </div>
  );
}