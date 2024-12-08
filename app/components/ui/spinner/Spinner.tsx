import ClipLoader from "react-spinners/ClipLoader";

export default function Spinner({
  color,
  size,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <ClipLoader
      color={color || "#fff"}
      loading={true}
      size={size || 30}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}
