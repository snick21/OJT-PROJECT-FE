import { useState } from "react";
import { Container, Group, TextInput, Text } from "@mantine/core";
import { IconSearch, IconChevronRight } from "@tabler/icons-react";

import KanbanBoard from "../components/kanban/KanbanBoard";
import FilterButton from "../components/buttons/FilterButton";
import PrimaryButton from "../components/buttons/PrimaryButton";

import { tickets } from "../data/tickets";
import type { Status } from "../types/ticket";

const ALL_STATUSES: Status[] = ["todo", "progress", "hold", "done"];

const FILTER_OPTIONS: { value: Status; label: string }[] = [
  { value: "todo",     label: "To do"       },
  { value: "progress", label: "In progress" },
  { value: "hold",     label: "On hold"     },
  { value: "done",     label: "Done"        }
];

export default function Dashboard() {

  const [selected, setSelected] = useState<Status[]>(ALL_STATUSES);

  const allActive = selected.length === ALL_STATUSES.length;

  function toggleAll() {
    setSelected(ALL_STATUSES);
  }

  function toggle(value: Status) {
    if (allActive) {
      setSelected([value]);
      return;
    }

    if (selected.includes(value)) {
      if (selected.length === 1) return;
      setSelected(selected.filter((s) => s !== value));
    } else {
      const next = [...selected, value];
      setSelected(next.length === ALL_STATUSES.length ? ALL_STATUSES : next);
    }
  }

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

          <FilterButton label="All Tickets" active={allActive} onClick={toggleAll} />

          {FILTER_OPTIONS.map((option) => (
            <FilterButton
              key={option.value}
              label={option.label}
              active={!allActive && selected.includes(option.value)}
              onClick={() => toggle(option.value)}
            />
          ))}

        </Group>

        <PrimaryButton label="Show Archive" />

      </Group>

      <KanbanBoard tickets={tickets} visibleStatuses={selected} />

    </Container>
  );
}