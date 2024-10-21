interface FeatureCardProps {
  src: string;
  className?: string;
}
export default function FeatureCard({
  src,
  className,
  ...rest
}: FeatureCardProps) {
  return (
    <div
      className={`p-3 md:p-5 lg:p-7 w-fit h-fit rounded-full border-[#004aad] border-4 border-solid bg-[#6abfd4] ${className}`}
      {...rest}
    >
      <img
        src={src}
        alt="feature"
        className="object-center size-20 md:size-24 lg:size-28 object-contain aspect-square rounded-full mix-blend-multiply"
      />
    </div>
  );
}
