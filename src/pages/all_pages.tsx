import Menu from "./menu";
import Game2048 from "./game2048";
import Puzzle from "./sliding_puzzle";

export const pages_link: Record<string, string> = {
  "2848": "/2048",
  "Sliding Puzzle": "/sliding_puzze",
};

export const pages: Record<string, JSX.Element> = {
  "/": <Menu />,
  "/2048": <Game2048 />,
  "/sliding_puzze": <Puzzle />,
};
