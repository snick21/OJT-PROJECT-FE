import { useState } from "react";
import {
  Container,
  Text,
  Title,
  Group,
  Paper,
  Avatar,
  TextInput,
  Checkbox,
  ActionIcon,
  Menu,
  Center,
  Stack,
} from "@mantine/core";
import {
  IconChevronRight,
  IconSearch,
  IconFilter,
  IconDots,
  IconEye,
  IconRestore,
  IconTrashX,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../components/buttons/PrimaryButton";
import SecondaryButton from "../components/buttons/SecondaryButton";

interface ArchivedTicket {
  id: string;
  ticket_number: string;
  type: string;
  category: string;
  archived_by: { username: string };
  date: string;
}

const mockTickets: ArchivedTicket[] = [
  { id: "1",  ticket_number: "CICT 0015", type: "Internal", category: "IT Support",                        archived_by: { username: "JD" }, date: "1 mo ago"  },
  { id: "2",  ticket_number: "CICT 0015", type: "Internal", category: "Billing and Payment Concerns",      archived_by: { username: "MK" }, date: "1 mo ago"  },
  { id: "3",  ticket_number: "CICT 0015", type: "Internal", category: "Account Management Requests",       archived_by: { username: "SA" }, date: "1 mo ago"  },
  { id: "4",  ticket_number: "CICT 0015", type: "Internal", category: "Account Management Requests",       archived_by: { username: "RL" }, date: "1 mo ago"  },
  { id: "5",  ticket_number: "CICT 0015", type: "Internal", category: "Installation and Activation Concerns", archived_by: { username: "AP" }, date: "2 mos ago" },
  { id: "6",  ticket_number: "CICT 0015", type: "Internal", category: "IT Support",                        archived_by: { username: "BT" }, date: "1 mo ago"  },
  { id: "7",  ticket_number: "CICT 0015", type: "Internal", category: "Billing and Payment Concerns",      archived_by: { username: "CL" }, date: "1 mo ago"  },
  { id: "8",  ticket_number: "CICT 0015", type: "Internal", category: "IT Support",                        archived_by: { username: "DM" }, date: "2 mos ago" },
  { id: "9",  ticket_number: "CICT 0015", type: "Internal", category: "Installation and Activation Concerns", archived_by: { username: "EK" }, date: "1 mo ago"  },
  { id: "10", ticket_number: "CICT 0015", type: "Internal", category: "IT Support",                        archived_by: { username: "FN" }, date: "1 mo ago"  },
];

export default function Archive() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<ArchivedTicket[]>(mockTickets);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered = tickets.filter(
    (t) =>
      t.ticket_number.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase()) ||
      t.type.toLowerCase().includes(search.toLowerCase())
  );

  const allSelected = filtered.length > 0 && selected.length === filtered.length;

  function toggleAll() {
    setSelected(allSelected ? [] : filtered.map((t) => t.id));
  }

  function toggleOne(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  function handleDelete() {
    setTickets((prev) => prev.filter((t) => !selected.includes(t.id)));
    setSelected([]);
  }

  function handleRestore() {
    setTickets((prev) => prev.filter((t) => !selected.includes(t.id)));
    setSelected([]);
  }

  return (
    <Container size="xl" py="lg">

      {/* BREADCRUMB */}
      <Group mb="lg">
        <Text fw={700} c="convergeTeal.9" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          GHIDORA
        </Text>
        <IconChevronRight size={16} color="#424242" />
        <Text fw={500} c="#424242" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          Dashboard
        </Text>
        <IconChevronRight size={16} color="#424242" />
        <Text fw={600} c="#424242">Show Archive</Text>
      </Group>

      {/* PAGE TITLE */}
      <Group justify="space-between" mb="lg">
        <Title order={2}>Archives</Title>
      </Group>

      {/* TOOLBAR */}
      <Group justify="space-between" mb="md">
        <Group>
          <TextInput
            leftSection={<IconSearch size={16} />}
            placeholder="Search ticket...."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            w={220}
          />
          <Group gap={6} style={{ cursor: "pointer" }}>
            <IconFilter size={16} color="#424242" />
            <Text size="sm" c="#424242">Filters</Text>
          </Group>
        </Group>

        <Group>
          {selected.length > 0 && (
            <>
              <Text size="sm" fw={600} c="convergeTeal.5">
                {selected.length} selected
              </Text>
              <SecondaryButton label="Delete" onClick={handleDelete} />
              <PrimaryButton label="Restore" onClick={handleRestore} />
            </>
          )}
        </Group>
      </Group>

      {/* TABLE */}
      <Paper withBorder radius="md" style={{ overflow: "hidden" }}>

        {/* HEADER */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "40px 1fr 1fr 1fr 1fr 1fr 80px",
          padding: "12px 16px",
          borderBottom: "1px solid #e9ecef",
          background: "#E6F4F4",
          alignItems: "center",
        }}>
          <Checkbox checked={allSelected} onChange={toggleAll} color="convergeTeal" />
          {["Ticket Number", "Type", "Category", "Archived by", "Date", "Action"].map((col) => (
            <Text
              key={col}
              fw={700}
              size="sm"
              c="convergeTeal.9"
              style={{ textAlign: col === "Archived by" || col === "Date" ? "center" : "left" }}
            >
              {col}
            </Text>
          ))}
        </div>

        {/* ROWS */}
        <Stack gap={0}>
          {filtered.length === 0 ? (
            <Center py="xl">
              <Text c="dimmed">No archived tickets found.</Text>
            </Center>
          ) : (
            filtered.map((ticket, i) => (
              <div
                key={ticket.id}
                onMouseEnter={() => setHoveredId(ticket.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  display: "grid",
                  gridTemplateColumns: "40px 1fr 1fr 1fr 1fr 1fr 80px",
                  padding: "14px 16px",
                  borderBottom: i < filtered.length - 1 ? "1px solid #f1f3f5" : "none",
                  background: selected.includes(ticket.id) || hoveredId === ticket.id ? "#f0fafa" : "#fff",
                  alignItems: "center",
                  cursor: "pointer",
                  transition: "background 0.15s ease",
                }}
              >
                <Checkbox
                  checked={selected.includes(ticket.id)}
                  onChange={() => toggleOne(ticket.id)}
                  color="convergeTeal"
                />
                <Text size="sm">{ticket.ticket_number}</Text>
                <Text size="sm">{ticket.type}</Text>
                <Text size="sm">{ticket.category}</Text>

                {/* ARCHIVED BY — centered */}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Avatar
                    radius="xl"
                    size="sm"
                    style={{ background: "#E6F4F4", color: "#038F8D", fontSize: 11, fontWeight: 600 }}
                  >
                    {ticket.archived_by.username}
                  </Avatar>
                </div>

                {/* DATE — centered */}
                <Text size="sm" c="dimmed" style={{ textAlign: "center" }}>
                  {ticket.date}
                </Text>

                {/* ACTION MENU */}
                <Menu shadow="md" width={160} position="bottom-end">
                  <Menu.Target>
                    <ActionIcon variant="subtle" color="gray">
                      <IconDots size={16} />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item leftSection={<IconEye size={14} />}>View</Menu.Item>
                    <Menu.Item leftSection={<IconRestore size={14} />} color="teal">Restore</Menu.Item>
                    <Menu.Item leftSection={<IconTrashX size={14} />} color="red">Delete</Menu.Item>
                  </Menu.Dropdown>
                </Menu>

              </div>
            ))
          )}
        </Stack>
      </Paper>

    </Container>
  );
}