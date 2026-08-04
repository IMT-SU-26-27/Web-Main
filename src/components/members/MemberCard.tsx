import Image from "next/image";
import "@/styles/members.css";
import type { MemberCardProps } from "@/types/members";

export const MEMBER_CARD_COLORS = [
  "#ff5259", 
  "#07a54a", 
  "#ffb20c", 
  "#ec6da4", 
  "#8e60a5", 
  "#00ba9c", 
] as const;

export default function MemberCard({
  id,
  name,
  role,
  colorIndex,
  imagesrc,
}: MemberCardProps) {
  const color = MEMBER_CARD_COLORS[colorIndex % MEMBER_CARD_COLORS.length];

  return (
    <div
      id={id}
      className="member-card"
      style={{ "--card-color": color } as React.CSSProperties}
    >
      <div className="member-card__photo">
        {imagesrc && (
          <Image
            src={imagesrc}
            alt={`${name} — ${role}`}
            width={300}
            height={330}
            className="member-card__image"
          />
        )}
        <span className="member-card__dot member-card__dot--tl" />
        <span className="member-card__dot member-card__dot--tr" />
        <span className="member-card__dot member-card__dot--bl" />
        <span className="member-card__dot member-card__dot--br" />
      </div>

      <p className="member-card__role">{role}</p>
      <p className="member-card__name">{name}</p>
    </div>
  );
}
