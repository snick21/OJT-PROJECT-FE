import { useEffect, useState } from "react";
import { Container, Group, TextInput, Text, Loader, Center } from "@mantine/core";
import { IconSearch, IconChevronRight } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

import SecondaryButton from "../components/buttons/SecondaryButton";
import KanbanBoard from "../components/kanban/KanbanBoard";
import FilterButton from "../components/buttons/FilterButton";
import PrimaryButton from "../components/buttons/PrimaryButton";
import { fetchTickets } from "../api/ticketApi";
import type { Ticket } from "../types/ticket";

export default function Dashboard() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTickets()
      .then(setTickets)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container size="xl" py="lg">

      <Group mb="lg">
        <Text fw={700} c="#013736">GHIDORA</Text>
        <IconChevronRight size={16} color="#424242" />
        <Text fw={600} c="#424242">Dashboard</Text>
      </Group>

      <Group justify="space-between" mb="lg">
        <Group>
          <TextInput
            leftSection={<IconSearch size={16} />}
            placeholder="Search ticket..."
            w={220}
          />
          <FilterButton label="All Tickets" active />
          <FilterButton label="To do" />
          <FilterButton label="In progress" />
          <FilterButton label="On hold" />
          <FilterButton label="Done" />
        </Group>

        <Group gap="xs">
          <SecondaryButton
            label="Submit Ticket"
            onClick={() => navigate("/submit-ticket")}
          />
          <PrimaryButton
            label="Show Archive"
            onClick={() => navigate("/archive")}
          />
        </Group>
      </Group>

      {loading
        ? <Center h={300}><Loader color="#013736" /></Center>
        : <KanbanBoard tickets={tickets} />
      }

    </Container>
  );
}