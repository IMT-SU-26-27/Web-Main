import "@/styles/members.css";

type DivisionHeaderProps = {
  name: string;
  description: string;
};

export default function DivisionHeader({
  name,
  description,
}: DivisionHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="division-pill">
        <span className="division-pill__dot" />
        {name}
        <span className="division-pill__dot" />
      </div>
      <p className="division-description">{description}</p>
    </div>
  );
}
