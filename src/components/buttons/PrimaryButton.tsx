import { Button } from "@mantine/core";

interface Props {
  label: string;
}

export default function PrimaryButton({ label }: Props) {
  return (
    <Button
      radius="md"
      size="sm"
      className="primary-btn"
    >
      {label}

      <style>
        {`
        .primary-btn {
          background: #038F8D;
          color: white;
          border: 1px solid #038F8D;
          transition: all 0.2s ease;
        }

        .primary-btn:hover {
          background: #027574;
          border: 1px solid #027574;
          color: white;
        }
        `}
      </style>
    </Button>
  );
}