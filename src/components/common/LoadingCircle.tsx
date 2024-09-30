type LoadingCicleType = "lg" | "md" | "sm" | "xs";
export default function LoadingCircle({
  size = "lg",
}: {
  size?: LoadingCicleType;
}) {
  return (
    <>
      <span className={`loading loading-spinner loading-${size}`}></span>
    </>
  );
}
