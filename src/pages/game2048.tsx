import Board2048 from "@/2048/board";
import ScoreCard from "@/games/score";

export default function Game2048() {
  return (
    <>
      <ScoreCard />
      <Board2048
        board={[
          [2, 4, 8, 16],
          [32, 64, 128, 256],
          [512, 1024, 2048, 4096],
          [8192, 16384, 32768, 65536],
        ]}
      />
    </>
  );
}
