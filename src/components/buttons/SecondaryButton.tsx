import { Button } from "@mantine/core";

interface Props {
  label: string;
}

export default function SecondaryButton({ label }: Props) {
  return (
    <Button
      radius="md"
      size="sm"
      className="secondary-btn"
    >
      {label}

      <style>
        {`
        .secondary-btn {
          background: white;
          color: #038F8D;
          border: 1px solid #038F8D;
          transition: all 0.2s ease;
        }

        .secondary-btn:hover {
          background: #E6F4F4;
          color: #038F8D;
        }
        `}
      </style>
    </Button>
  );
}