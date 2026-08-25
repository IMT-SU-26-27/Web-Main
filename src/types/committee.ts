export interface Member {
  id: string;
  name: string;
  role: string;
  division: string;
  gender: "BOY" | "GIRL";
  imagesrc: string;
}

export interface DivisionGroup {
  name: string;
  members: Member[];
}

export interface MemberCardProps {
  member: Member;
  index: number;
  className?: string;
}

export type PresidentCardProps = {
  id: string;
  name: string;
  role: string;
  division: string;
  gender: "BOY" | "GIRL";
  imagesrc?: string;
};

export type ImageConfig = {
  src: string;
  className?: string;
};

export type RoleConfig = {
  decorations: ImageConfig[];
  color: string;
};

export interface DivisionMarkerProps {
  division: string;
  count: number;
}
