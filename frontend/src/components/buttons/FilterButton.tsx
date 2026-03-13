import { Button } from "@mantine/core";
import classes from "./FilterButton.module.css";

interface Props {
  label: string;
  active?: boolean;
}

export default function FilterButton({ label, active }: Props) {
  return (
    <Button
      className={`${classes.button} ${active ? classes.active : ""}`}
      radius="md"
      size="sm"
    >
      {label}
      <style>
        {`
          .button {
            background: white;
            color: #038F8D;
            border: 1px solid #038F8D;
            transition: all 0.2s ease;
          }

          .button:hover {
            background: #E6F4F4;
            color: #038F8D;
          }

          .active {
            background: #038F8D;
            color: white;
            border: 1px solid #038F8D;
          }

          .active:hover {
            background: #027574;
            color: white;
          }
        `}
      </style>
    </Button>
  );
}