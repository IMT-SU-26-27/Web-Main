export type MemberCardProps = {
  id: string;
  name: string;
  role: string;
  colorIndex: number;
  imagesrc?: string;

  // commented out for now, as we dont require it in this 26-27 period design
  // gender: "BOY" | "GIRL";
};

export type Member = {
  id: string;
  name: string;
  role: string;
  imagesrc?: string;
};

export type Division = {
  name: string;
  description: string;
  members: Member[];
};
