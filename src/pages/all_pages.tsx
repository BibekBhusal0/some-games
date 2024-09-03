import Menu from "./menu";
import Page2048 from "./game2048";
import Puzzle from "./sliding_puzzle";
import PageMemoryCard from "./memory_card";

export const pages_link: Record<string, string> = {
  "2848": "/2048",
  "Sliding Puzzle": "/sliding_puzze",
  "Memory Card": "/memory_card",
};

export const pages: Record<string, JSX.Element> = {
  "/": <Menu />,
  "/2048": <Page2048 />,
  "/sliding_puzze": <Puzzle />,
  "/memory_card": <PageMemoryCard />,
};
