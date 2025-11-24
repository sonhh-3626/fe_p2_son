interface BackdropProps {
  onClick: () => void;
}

export default function Backdrop({ onClick }: BackdropProps) {
  return (
    <div
      className="fixed inset-0 z-40"
      onClick={onClick}
    />
  );
}
