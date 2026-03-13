import { Button } from "@mantine/core";
import classes from "./FilterButton.module.css";

interface Props {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export default function FilterButton({ label, active, onClick }: Props) {
  return (
    <Button
      className={`${classes.button} ${active ? classes.active : ""}`}
      radius="md"
      size="sm"
      onClick={onClick}
    >
      {label}
    </Button>
  );
}