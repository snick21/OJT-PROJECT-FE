import { Button } from "@mantine/core";

interface Props {
  label: string;
  onClick?: () => void;
}

export default function SecondaryButton({ label, onClick }: Props) {
  return (
    <>
      <Button
        radius="md"
        size="sm"
        className="secondary-btn"
        onClick={onClick}   
      >
        {label}
      </Button>

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
    </>
  );
}