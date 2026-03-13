import { Button } from "@mantine/core";

interface Props {
  label: string;
  onClick?: () => void;
}

export default function PrimaryButton({ label, onClick }: Props) {
  return (
    <>
      <Button
        radius="md"
        size="sm"
        className="primary-btn"
        onClick={onClick}
      >
        {label}
      </Button>

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
    </>
  );
}