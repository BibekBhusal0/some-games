import Board2048 from "@/2048/board";
import ScoreCard from "@/games/score";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <ScoreCard />
      <Board2048 />
    </DefaultLayout>
  );
}
