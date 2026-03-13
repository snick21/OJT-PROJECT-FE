import { Group, UnstyledButton, Text, Badge } from "@mantine/core";
import type { Status } from "../../types/ticket";

interface FilterOption {
  value: Status;
  label: string;
  color: string;
  activeColor: string;
  activeBg: string;
}

const FILTER_OPTIONS: FilterOption[] = [
  {
    value: "todo",
    label: "To do",
    color: "#888",
    activeColor: "#C0392B",
    activeBg: "#F3D6D6"
  },
  {
    value: "progress",
    label: "In progress",
    color: "#888",
    activeColor: "#6C3FC5",
    activeBg: "#DCD3F3"
  },
  {
    value: "hold",
    label: "On hold",
    color: "#888",
    activeColor: "#C07A1A",
    activeBg: "#F1D9B8"
  },
  {
    value: "done",
    label: "Done",
    color: "#888",
    activeColor: "#1E7E3E",
    activeBg: "#CFEAD5"
  }
];

interface Props {
  selected: Status[];
  onChange: (selected: Status[]) => void;
  ticketCounts: Record<Status, number>;
}

export default function StatusFilter({ selected, onChange, ticketCounts }: Props) {

  function toggle(value: Status) {
    if (selected.includes(value)) {
      if (selected.length === 1) return;
      onChange(selected.filter((s) => s !== value));
    } else {
      onChange([...selected, value]);
    }
  }

  return (
    <Group gap="xs" mb="lg">
      {FILTER_OPTIONS.map((option) => {
        const isActive = selected.includes(option.value);
        return (
          <UnstyledButton
            key={option.value}
            onClick={() => toggle(option.value)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              borderRadius: 999,
              border: isActive
                ? `1.5px solid ${option.activeColor}`
                : "1.5px solid #D0D0D0",
              background: isActive ? option.activeBg : "#FFFFFF",
              color: isActive ? option.activeColor : option.color,
              fontWeight: isActive ? 600 : 400,
              fontSize: 13,
              cursor: "pointer",
              transition: "all 140ms ease",
              userSelect: "none"
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: isActive ? option.activeColor : "#CCCCCC",
                flexShrink: 0,
                transition: "background 140ms ease"
              }}
            />
            <Text size="sm" fw={isActive ? 600 : 400} style={{ color: "inherit" }}>
              {option.label}
            </Text>
            <Badge
              size="xs"
              radius="sm"
              style={{
                background: isActive ? option.activeColor : "#EBEBEB",
                color: isActive ? "#fff" : "#888",
                fontWeight: 600,
                minWidth: 20,
                transition: "all 140ms ease"
              }}
            >
              {ticketCounts[option.value]}
            </Badge>
          </UnstyledButton>
        );
      })}
    </Group>
  );
}