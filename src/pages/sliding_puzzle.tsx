import Board from "@/2048/board";
import ScoreCard from "@/games/score";

function SlidingPuzzle() {
  return (
    <div className="flex flex-col gap-5">
      <ScoreCard />
      <Board
        board={[
          [2, 2, 2],
          [2, 2, 2],
          [2, 2, 2],
        ]}
      />
    </div>
  );
}

export default SlidingPuzzle;
