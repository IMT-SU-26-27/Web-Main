"use client";

import { useState } from "react";
import Board from "@/components/board/Board";
import BoardArrow from "@/components/board/BoardArrow";
import { CompetitionCard } from "@/components/competition/CompetitionCard";
import { Competition } from "@/types/service/competition";

type CompetitionsBoardProps = {
  competitions: Competition[];
};

const ITEMS_PER_PAGE = 3;

export default function CompetitionsBoard({
  competitions,
}: CompetitionsBoardProps) {
  const totalPages = Math.max(1, Math.ceil(competitions.length / ITEMS_PER_PAGE));
  const [page, setPage] = useState(0);

  const start = page * ITEMS_PER_PAGE;
  const visible = competitions.slice(start, start + ITEMS_PER_PAGE);

  const handlePrev = () =>
    setPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  const handleNext = () =>
    setPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));

  return (
    <Board
      ribbon="QUEST BOARD"
      title="Competitions"
      subtitle="Challenge yourself through competitions!"
      leftArrow={
        <BoardArrow
          direction="left"
          onClick={handlePrev}
          label="Previous competitions"
        />
      }
      rightArrow={
        <BoardArrow
          direction="right"
          onClick={handleNext}
          label="Next competitions"
        />
      }
      seeMore={
        <button type="button" className="board__see-more">
          see more !
        </button>
      }
    >
      {competitions.length === 0 ? (
        <p className="font-pixelify text-[#543737] text-lg">
          No competitions yet.
        </p>
      ) : (
        <div className="flex flex-wrap justify-center items-stretch gap-4">
          {visible.map((competition, index) => (
            <CompetitionCard
              key={competition.id}
              competition={competition}
              index={start + index}
            />
          ))}
        </div>
      )}
    </Board>
  );
}
