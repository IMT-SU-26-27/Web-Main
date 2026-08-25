import React from "react";
import CompetitionForm from "@/components/competition/CompetitionForm";
import { getCompetitionById } from "@/lib/service/competition";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Competition - SA Dashboard",
  description: "Edit student union competition details.",
};

export default async function EditCompetitionPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = params.id;
  const competition = await getCompetitionById(id);

  if (!competition) {
    notFound();
  }

  return (
    <div className="w-full h-full flex-1 flex flex-col p-4 sm:p-6 md:p-8 select-none">
      <CompetitionForm mode="edit" data={competition} />
    </div>
  );
}
