import { useState } from "react";
import {
  Container,
  Text,
  Title,
  Group,
  Paper,
  Select,
  Divider,
  Box,
  Badge,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import PrimaryButton from "../components/buttons/PrimaryButton";
import SecondaryButton from "../components/buttons/SecondaryButton";
import type { Ticket } from "../types/ticket";

interface Props {
  ticket: Ticket;
  onBack: () => void;
}

const ASSIGNEES = [
  { value: "nicholas", label: "Nicholas Alley Samia" },
  { value: "gabriel",  label: "Gabriel Pecson" },
  { value: "john",     label: "John Deren Cantero" },
  { value: "maria",    label: "Maria Santos" },
];

const STATUS_OPTIONS = [
  { value: "todo",     label: "To Do" },
  { value: "progress", label: "In Progress" },
  { value: "hold",     label: "On Hold" },
  { value: "done",     label: "Done" },
];

// Mock extra details — replace with API data per ticket when ready
const mockDetails = {
  title: "Unable to Connect to Office Network",
  problem: "User is unable to connect to the office network. Internet access is unavailable, preventing access to internal systems, shared drives, and company applications.",
  anything_we_should_know: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget elit urna. Ut id ex ut eros tempus mollis vel et urna. Nullam vulputate vestibulum orci, ac aliquet dolor fringilla eget.",
  requestor: "Gabriel Pecson",
  type_of_requestor: "JIRA",
  raw_sla: "04:00:00",
  paused_time: "00:30:00",
  normalized_sla: "03:30:00",
};

export default function ViewTicket({ ticket, onBack }: Props) {
  const [assignee, setAssignee] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(ticket.status);

  return (
    <Container size="xl" py="lg">

      {/* BREADCRUMB */}
      <Group mb="lg">
        <Text fw={700} c="convergeTeal.9" style={{ cursor: "pointer" }} onClick={onBack}>
          GHIDORA
        </Text>
        <IconChevronRight size={16} color="#424242" />
        <Text fw={500} c="#424242" style={{ cursor: "pointer" }} onClick={onBack}>
          Dashboard
        </Text>
        <IconChevronRight size={16} color="#424242" />
        <Text fw={600} c="#424242">View Ticket</Text>
      </Group>

      {/* PAGE TITLE */}
      <Group justify="space-between" mb="lg">
        <Title order={2}>View Ticket</Title>
      </Group>

      {/* TICKET NUMBER BANNER */}
      <Paper withBorder radius="md" p="md" mb="lg" style={{ background: "#f8fafa" }}>
        <Group justify="space-between">
          <Text fw={700} size="lg" c="convergeTeal.5" style={{ letterSpacing: 0.5 }}>
            TICKET NO. {ticket.id}
          </Text>
          <Group gap="xs">
            <Badge color={ticket.priority === "urgent" ? "red" : "gray"} variant="light">
              {ticket.priority}
            </Badge>
            <Badge color="convergeTeal" variant="light">
              {ticket.type}
            </Badge>
          </Group>
        </Group>
      </Paper>

      {/* MAIN CONTENT */}
      <Paper withBorder radius="md" p="xl" style={{ background: "#f5f5f5" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2px 1fr", gap: "0 32px" }}>

          {/* LEFT — ticket info */}
          <Box>
            <Box mb="lg">
              <Text size="xs" fw={700} c="dimmed" tt="uppercase" mb={4}>Ticket Title</Text>
              <Group gap="xs" align="flex-start">
                <Text size="xs" fw={700} c="dimmed">:</Text>
                <Text size="sm">{mockDetails.title}</Text>
              </Group>
            </Box>

            <Box mb="lg">
              <Text size="xs" fw={700} c="dimmed" tt="uppercase" mb={4}>Incident Type</Text>
              <Group gap="xs">
                <Text size="xs" fw={700} c="dimmed">:</Text>
                <Text size="sm">{ticket.type_of_issue}</Text>
              </Group>
            </Box>

            <Box mb="lg">
              <Group gap="xs" mb={6}>
                <Text size="xs" fw={700} c="dimmed" tt="uppercase">Problem/Concern</Text>
                <Text size="xs" fw={700} c="dimmed">:</Text>
              </Group>
              <Text size="sm" c="#333">{mockDetails.problem}</Text>
            </Box>

            <Box>
              <Group gap="xs" mb={6}>
                <Text size="xs" fw={700} c="dimmed" tt="uppercase">Anything We Should Know</Text>
                <Text size="xs" fw={700} c="dimmed">:</Text>
              </Group>
              <Text size="sm" c="#333">{mockDetails.anything_we_should_know}</Text>
            </Box>
          </Box>

          {/* VERTICAL DIVIDER */}
          <Divider orientation="vertical" color="convergeTeal.5" size="sm" />

          {/* RIGHT — details & SLA */}
          <Box>

            {/* STATUS + ARCHIVE */}
            <Group mb="xl">
              <Select
                placeholder="Status"
                data={STATUS_OPTIONS}
                value={status}
                onChange={setStatus}
                w={140}
                styles={(theme) => ({
                  input: {
                    borderColor: theme.colors.convergeTeal[5],
                    borderWidth: "1.5px",
                  },
                })}
              />
              <PrimaryButton label="Archive" onClick={() => {}} />
            </Group>

            {/* DETAILS */}
            <Text fw={700} size="md" mb="md">DETAILS</Text>

            <Group justify="space-between" align="center" mb="md">
              <Text size="xs" fw={700} c="dimmed" tt="uppercase">Assignee</Text>
              <Select
                placeholder="Select assignee"
                data={ASSIGNEES}
                value={assignee}
                onChange={setAssignee}
                w={260}
                clearable
                styles={(theme) => ({
                  input: {
                    borderColor: assignee ? theme.colors.convergeTeal[5] : theme.colors.gray[4],
                    borderWidth: "1.5px",
                    transition: "border-color 0.2s ease",
                  },
                })}
              />
            </Group>

            <Group mb="md" gap="xs">
              <Text size="xs" fw={700} c="dimmed" tt="uppercase" w={180}>Requestor</Text>
              <Text size="xs" fw={700} c="dimmed">:</Text>
              <Text size="sm">{mockDetails.requestor}</Text>
            </Group>

            <Group mb="xl" gap="xs">
              <Text size="xs" fw={700} c="dimmed" tt="uppercase" w={180}>Type of Requestor</Text>
              <Text size="xs" fw={700} c="dimmed">:</Text>
              <Text size="sm">{mockDetails.type_of_requestor}</Text>
            </Group>

            {/* SLA TRACKING */}
            <Text fw={700} size="md" mb="md">SLA TRACKING</Text>

            <Group mb="md" gap="xs">
              <Text size="xs" fw={700} c="dimmed" tt="uppercase" w={180}>Raw SLA</Text>
              <Text size="xs" fw={700} c="dimmed">:</Text>
              <Text size="sm">{mockDetails.raw_sla}</Text>
            </Group>

            <Group mb="md" gap="xs">
              <Text size="xs" fw={700} c="dimmed" tt="uppercase" w={180}>Paused Time</Text>
              <Text size="xs" fw={700} c="dimmed">:</Text>
              <Text size="sm">{mockDetails.paused_time}</Text>
            </Group>

            <Group gap="xs">
              <Text size="xs" fw={700} c="dimmed" tt="uppercase" w={180}>Normalized SLA</Text>
              <Text size="xs" fw={700} c="dimmed">:</Text>
              <Text size="sm">{mockDetails.normalized_sla}</Text>
            </Group>

          </Box>
        </div>
      </Paper>

      {/* BACK BUTTON */}
      <Group mt="lg">
        <SecondaryButton label="Back to Dashboard" onClick={onBack} />
      </Group>

    </Container>
  );
}